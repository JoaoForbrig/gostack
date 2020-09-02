
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'

import User from './User';

/**
 * Umpara um (OneToOne)
 * Um para muitos (OneToMany) <-- vamos usar mais esse
 * muitos para muitos(muitos usuaarios participam de muitos servicos) (ManyToMany)
 */

interface AppointmentConstructor {
  provider: string;
  date: Date;
}

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

 @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id'})
  provider: User;

 @Column('timestamp with time zone')
  date: Date;

@CreateDateColumn()
  created_at: Date;

@UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
