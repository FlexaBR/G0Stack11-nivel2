import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    // Omit (omite) do Appointment o id, pois é criado estaticamente pelo uuid
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
