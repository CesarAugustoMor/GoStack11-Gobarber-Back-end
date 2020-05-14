import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { isEqual } from 'date-fns';

export default class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  /**
   * Procura se a data já está cadastrada.
   * @param date Data a ser procurada
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    if (!findAppointment) {
      return undefined;
    }

    return findAppointment;
  }

  /**
   * create
   */
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}