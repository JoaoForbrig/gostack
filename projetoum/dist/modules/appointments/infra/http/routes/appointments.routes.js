"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var AppointmentController_1 = __importDefault(require("../controllers/AppointmentController"));
var appointmentsRouter = express_1.Router();
var appointmentController = new AppointmentController_1.default();
// Rota: Recever a requisição, chamar outro arquivo, devolver uma resposta
appointmentsRouter.use(ensureAuthenticated_1.default);
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });
appointmentsRouter.post('/', appointmentController.create);
exports.default = appointmentsRouter;
