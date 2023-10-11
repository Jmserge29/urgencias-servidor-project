import Assistence from "../Models/Assistance.js";
import Doctor from "../Models/Doctor.js";

export const createDoctors = async()=> {
    try {
        const count = await Doctor.estimatedDocumentCount();
        if(count > 0) return
        const defaultDoctorsData = [
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              password: '123456789',
              nombre: 'Doctor',
              apellido: 'Uno',
              especialidad: 'Cardiología',
              telefono: '1234567890',
              correo: 'doctor1@example.com',
              consultorio: 'Consultorio 1',
              horario: 'Lunes a Viernes 9:00 AM - 5:00 PM',
              identificacion: 123456,
              salario: 100000,
            },
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              password: '123456789',
              nombre: 'Doctor',
              apellido: 'Dos',
              especialidad: 'Pediatría',
              telefono: '9876543210',
              correo: 'doctor2@example.com',
              consultorio: 'Consultorio 2',
              horario: 'Lunes a Viernes 8:00 AM - 4:00 PM',
              identificacion: 789012,
              salario: 90000,
            },
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              password: '123456789',
              nombre: 'Doctor',
              apellido: 'Tres',
              especialidad: 'Dermatología',
              telefono: '5555555555',
              correo: 'doctor3@example.com',
              consultorio: 'Consultorio 3',
              horario: 'Lunes a Viernes 10:00 AM - 6:00 PM',
              identificacion: 456789,
              salario: 110000,
            },
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              password: '123456789',
              nombre: 'Doctor',
              apellido: 'Cuatro',
              especialidad: 'Ginecología',
              telefono: '1231231234',
              correo: 'doctor4@example.com',
              consultorio: 'Consultorio 4',
              horario: 'Lunes a Viernes 9:30 AM - 5:30 PM',
              identificacion: 789123,
              salario: 95000,
            },
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              password: '123456789',
              nombre: 'Doctor',
              apellido: 'Cinco',
              especialidad: 'Ortopedia',
              telefono: '5551234567',
              correo: 'doctor5@example.com',
              consultorio: 'Consultorio 5',
              horario: 'Lunes a Viernes 8:30 AM - 4:30 PM',
              identificacion: 567890,
              salario: 105000,
            },
        ];

        const doctorsList = await Promise.all([defaultDoctorsData.map(async(doctor, i) => {
            const passwordEncrypted = await Doctor.encryptPassword(doctor.password)
            doctor.password = passwordEncrypted
            new Doctor(doctor).save()
        })])

        console.log(doctorsList);
        console.log("Doctor's has been created success!");
    } catch (error) {
        console.log("An erro has ocurred in the server")
    }
}

export const createAssitance = async()=> {
  try {
      const count = await Assistence.estimatedDocumentCount();
      if(count > 0) return
      const defaultAssitanceData = [
          {
            correo: "assistance01@test.com",
            identificacion: "215612",
            password: "123456789",
            salario: 1200,
            nombre: "Steffany",
            turno: "Diurno",
          },
          {
            correo: "assistance02@test.com",
            identificacion: "158798",
            password: "123456789",
            salario: 1200,
            nombre: "Angela",
            turno: "Diurno",
          },
          {
            correo: "assistance03@test.com",
            identificacion: "998187",
            password: "123456789",
            salario: 1200,
            nombre: "Santiago",
            turno: "Nocturno",
          },
          {
            correo: "assistance04@test.com",
            identificacion: "878724",
            password: "123456789",
            salario: 1200,
            nombre: "Camila",
            turno: "Nocturno",
          },
      ];

      const assistanceList = await Promise.all([defaultAssitanceData.map(async(assistance, i) => {
          const passwordEncrypted = await Doctor.encryptPassword(assistance.password)
          assistance.password = passwordEncrypted
          new Assistence(assistance).save()
      })])

      console.log(assistanceList);
      console.log("Assistance's has been created success!");
  } catch (error) {
      console.log("An erro has ocurred in the server")
  }
}