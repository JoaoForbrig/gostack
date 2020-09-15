import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/**
 * [x]Recebimento das informaçoes
 * [x]tratativa de erros/excessões
 * [x]acesso ao repositorio
 */

interface Request {
  // eslint-disable-next-line camelcase
  provider_id: string;
  date: Date;
}
/**
 * Denependency Inversion(SOLID)
 *
 */
class CreateAppointmentService {
  // eslint-disable-next-line camelcase
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
