import Medicine from "../Models/Medicine.js";
import User from "../Models/User.js";
import Role from "../Models/Role.js";

export const createRoles = async() => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    // Creating roles the users
    const values = await Promise.all([
      new Role({ role: "user" }).save(),
      new Role({ role: "doctor" }).save(),
    ]);
    console.log(values);
    console.log("Roles created success!");
  } catch (error) {
    console.log(error);
  }
}

export const createUsers = async()=> {
    try {
        const count = await User.estimatedDocumentCount();
        if(count > 0) return
        const passwordEncrypted = await User.encryptPassword("123456789");


        const roleD = await Role.find({ role: { $in: "doctor" } });
        console.log("Role: ----> ",roleD)
        const defaultDoctorsData = [
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              identificacion: 123456,
              email: 'doctor1@example.com',
              password: passwordEncrypted,
              nombre: 'Doctor',
              apellido: 'Uno',
              edad: "32",
              telefono: '1234567890',
              especialidad: 'Cardiología',
              consultorio: 'Consultorio 1',
              horario: 'Lunes a Viernes 9:00 AM - 5:00 PM',
              salario: 100000,
              role:roleD[0]._id,
              emergencias_asignadas: [],
              pacientes: []
            },
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              identificacion: 789012,
              email: 'doctor2@example.com',
              password: passwordEncrypted,
              nombre: 'Doctor',
              apellido: 'Dos',
              edad: "32",
              especialidad: 'Pediatría',
              telefono: '9876543210',
              consultorio: 'Consultorio 2',
              horario: 'Lunes a Viernes 8:00 AM - 4:00 PM',
              salario: 90000,
              role:roleD[0]._id,
              emergencias_asignadas: [],
              pacientes: []
            },
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              identificacion: 456789,
              email: 'doctor3@example.com',
              password: passwordEncrypted,
              nombre: 'Doctor',
              apellido: 'Tres',
              edad: "32",
              especialidad: 'Dermatología',
              telefono: '5555555555',
              consultorio: 'Consultorio 3',
              horario: 'Lunes a Viernes 10:00 AM - 6:00 PM',
              salario: 110000,
              role:roleD[0]._id,
              emergencias_asignadas: [],
              pacientes: []
            },
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              identificacion: 789123,
              email: 'doctor4@example.com',
              password: passwordEncrypted,
              nombre: 'Doctor',
              apellido: 'Cuatro',
              edad: "32",
              especialidad: 'Ginecología',
              telefono: '1231231234',
              consultorio: 'Consultorio 4',
              horario: 'Lunes a Viernes 9:30 AM - 5:30 PM',
              salario: 95000,
              role:roleD[0]._id,
              emergencias_asignadas: [],
              pacientes: []
            },
            {
              picture: 'https://img.freepik.com/foto-gratis/doctor-sonriendo-estetoscopio_1154-36.jpg',
              identificacion: 567890,
              email: 'doctor5@example.com',
              password: passwordEncrypted,
              nombre: 'Doctor',
              apellido: 'Cinco',
              edad: "32",
              especialidad: 'Ortopedia',
              telefono: '5551234567',
              consultorio: 'Consultorio 5',
              horario: 'Lunes a Viernes 8:30 AM - 4:30 PM',
              salario: 105000,
              role:roleD[0]._id,
              emergencias_asignadas: [],
              pacientes: []
            },
        ];

        const doctorsList = await Promise.all([defaultDoctorsData.map(async(doctor, i) => {
            const passwordEncrypted = await User.encryptPassword(doctor.password)
            doctor.password = passwordEncrypted
            new User(doctor).save()
        })])

        console.log(doctorsList);
        console.log("Doctor's has been created success!");
    } catch (error) {
        console.log("An erro has ocurred in the server")
    }
}

export const createListMedicines = async () => {
  try {
    const medicines = [
      {
        "codigo": "123456",
        "nombre": "acetaminofen",
        "existencia": "10",
        "farmaceutica": "pharma1",
        "frecuencia": "6",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "234567",
        "nombre": "Naproxeno",
        "existencia": "20",
        "farmaceutica": "pharma2",
        "frecuencia": "8",
        "categoria": "Antiinflamatorios"
      },
      {
        "codigo": "345678",
        "nombre": "Ibuprofeno",
        "existencia": "15",
        "farmaceutica": "pharma3",
        "frecuencia": "6",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "456789",
        "nombre": "Aspirina",
        "existencia": "5",
        "farmaceutica": "pharma4",
        "frecuencia": "4",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "567890",
        "nombre": "Omeprazol",
        "existencia": "30",
        "farmaceutica": "pharma5",
        "frecuencia": "24",
        "categoria": "Antiácido"
      },
      {
        "codigo": "678901",
        "nombre": "Loratadina",
        "existencia": "8",
        "farmaceutica": "pharma6",
        "frecuencia": "24",
        "categoria": "Antihistamínicos"
      },
      {
        "codigo": "789012",
        "nombre": "Amoxicilina",
        "existencia": "12",
        "farmaceutica": "pharma7",
        "frecuencia": "8",
        "categoria": "Antibióticos"
      },
      {
        "codigo": "890123",
        "nombre": "Diazepam",
        "existencia": "3",
        "farmaceutica": "pharma8",
        "frecuencia": "12",
        "categoria": "Sedantes o ansiolíticos"
      },
      {
        "codigo": "901234",
        "nombre": "Lansoprazol",
        "existencia": "18",
        "farmaceutica": "pharma9",
        "frecuencia": "24",
        "categoria": "Antiácido"
      },
      {
        "codigo": "012345",
        "nombre": "Cetirizina",
        "existencia": "7",
        "farmaceutica": "pharma10",
        "frecuencia": "24",
        "categoria": "Antihistamínicos"
      },
      {
        "codigo": "111111",
        "nombre": "Paracetamol",
        "existencia": "25",
        "farmaceutica": "pharma11",
        "frecuencia": "6",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "222222",
        "nombre": "Diclofenaco",
        "existencia": "13",
        "farmaceutica": "pharma12",
        "frecuencia": "8",
        "categoria": "Antiinflamatorios"
      },
      {
        "codigo": "333333",
        "nombre": "Nimesulida",
        "existencia": "9",
        "farmaceutica": "pharma13",
        "frecuencia": "6",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "444444",
        "nombre": "Tramadol",
        "existencia": "4",
        "farmaceutica": "pharma14",
        "frecuencia": "4",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "555555",
        "nombre": "Pantoprazol",
        "existencia": "28",
        "farmaceutica": "pharma15",
        "frecuencia": "24",
        "categoria": "Antiácido"
      },
      {
        "codigo": "666666",
        "nombre": "Desloratadina",
        "existencia": "6",
        "farmaceutica": "pharma16",
        "frecuencia": "24",
        "categoria": "Antihistamínicos"
      },
      {
        "codigo": "777777",
        "nombre": "Azitromicina",
        "existencia": "11",
        "farmaceutica": "pharma17",
        "frecuencia": "8",
        "categoria": "Antibióticos"
      },
      {
        "codigo": "888888",
        "nombre": "Clonazepam",
        "existencia": "2",
        "farmaceutica": "pharma18",
        "frecuencia": "12",
        "categoria": "Sedantes o ansiolíticos"
      },
      {
        "codigo": "999999",
        "nombre": "Omeprazol",
        "existencia": "20",
        "farmaceutica": "pharma19",
        "frecuencia": "24",
        "categoria": "Antiácido"
      },
      {
        "codigo": "000000",
        "nombre": "Levocetirizina",
        "existencia": "9",
        "farmaceutica": "pharma20",
        "frecuencia": "24",
        "categoria": "Antihistamínicos"
      },
      {
        "codigo": "098765",
        "nombre": "Ketorolaco",
        "existencia": "15",
        "farmaceutica": "pharma21",
        "frecuencia": "6",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "987654",
        "nombre": "Indometacina",
        "existencia": "11",
        "farmaceutica": "pharma22",
        "frecuencia": "8",
        "categoria": "Antiinflamatorios"
      },
      {
        "codigo": "876543",
        "nombre": "Meloxicam",
        "existencia": "7",
        "farmaceutica": "pharma23",
        "frecuencia": "6",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "765432",
        "nombre": "Codeina",
        "existencia": "3",
        "farmaceutica": "pharma24",
        "frecuencia": "4",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "654321",
        "nombre": "Esomeprazol",
        "existencia": "25",
        "farmaceutica": "pharma25",
        "frecuencia": "24",
        "categoria": "Antiácido"
      },
      {
        "codigo": "543210",
        "nombre": "Fexofenadina",
        "existencia": "10",
        "farmaceutica": "pharma26",
        "frecuencia": "24",
        "categoria": "Antihistamínicos"
      },
      {
        "codigo": "432109",
        "nombre": "Cefalexina",
        "existencia": "14",
        "farmaceutica": "pharma27",
        "frecuencia": "8",
        "categoria": "Antibióticos"
      },
      {
        "codigo": "321098",
        "nombre": "Alprazolam",
        "existencia": "1",
        "farmaceutica": "pharma28",
        "frecuencia": "12",
        "categoria": "Sedantes o ansiolíticos"
      },
      {
        "codigo": "210987",
        "nombre": "Ranitidina",
        "existencia": "22",
        "farmaceutica": "pharma29",
        "frecuencia": "24",
        "categoria": "Antiácido"
      },
      {
        "codigo": "109876",
        "nombre": "Desloratadina",
        "existencia": "5",
        "farmaceutica": "pharma30",
        "frecuencia": "24",
        "categoria": "Antihistamínicos"
      },
      {
        "codigo": "098765",
        "nombre": "Ibuprofeno",
        "existencia": "17",
        "farmaceutica": "pharma31",
        "frecuencia": "6",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "987654",
        "nombre": "Ketoprofeno",
        "existencia": "14",
        "farmaceutica": "pharma32",
        "frecuencia": "8",
        "categoria": "Antiinflamatorios"
      },
      {
        "codigo": "876543",
        "nombre": "Naproxeno",
        "existencia": "11",
        "farmaceutica": "pharma33",
        "frecuencia": "6",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "765432",
        "nombre": "Tramadol",
        "existencia": "6",
        "farmaceutica": "pharma34",
        "frecuencia": "4",
        "categoria": "Analgesicos"
      },
      {
        "codigo": "654321",
        "nombre": "Pantoprazol",
        "existencia": "26",
        "farmaceutica": "pharma35",
        "frecuencia": "24",
        "categoria": "Antiácido"
      },
      {
        "codigo": "543210",
        "nombre": "Cetirizina",
        "existencia": "9",
        "farmaceutica": "pharma36",
        "frecuencia": "24",
        "categoria": "Antihistamínicos"
      },
      {
        "codigo": "432109",
        "nombre": "Ciprofloxacina",
        "existencia": "13",
        "farmaceutica": "pharma37",
        "frecuencia": "8",
        "categoria": "Antibióticos"
      },
      {
        "codigo": "321098",
        "nombre": "Diazepam",
        "existencia": "2",
        "farmaceutica": "pharma38",
        "frecuencia": "12",
        "categoria": "Sedantes o ansiolíticos"
      },
      {
        "codigo": "210987",
        "nombre": "Omeprazol",
        "existencia": "24",
        "farmaceutica": "pharma39",
        "frecuencia": "24",
        "categoria": "Antiácido"
      },
      {
        "codigo": "109876",
        "nombre": "Levocetirizina",
        "existencia": "8",
        "farmaceutica": "pharma40",
        "frecuencia": "24",
        "categoria": "Antihistamínicos"
      }
    ]
    console.log(medicines.length)

    const count = await Medicine.estimatedDocumentCount()
    if(count>0) return

    const listMedicines = await Promise.all(    
      medicines.map(async(data) => {
      await new Medicine({codigo: data.codigo,
        nombre: data.nombre,
        existencia: data.existencia,
        farmaceutica: data.farmaceutica,
        frecuencia: data.frecuencia,
        categoria: data.categoria,}).save()
    }))

    console.log("The medicines has been created successly!")
    console.log(listMedicines)
  } catch (error) {
    console.log("An error has been creating the medicines")
  }
}