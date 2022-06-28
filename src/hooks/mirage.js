// @ts-nocheck
import {
  Model, RestSerializer, Server
} from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,
    models: {
      user: Model,
      admin: Model,
      doctor: Model,
      degree: Model,
      hospital: Model,
      inventory: Model,
      inventoryType: Model,
      patient: Model,
      shift: Model,
      shiftDoctor: Model,
      appointment: Model,
      prescription: Model,
    },
    serializers: {
      application: RestSerializer,
    },

    seeds(server) {
      // User
      server.create("user", {
        id: 1,
        name: "Jean Heron",
        hospitalId: "Hospital General del ISSS",
        lastname: "Vicquemare",
        email: "jean.heron@gmail.com",
        password: "123456",
        updatedAt: "2022-05-14 19:26:29.000000",
        createdAt: "2022-05-14 19:27:01.000000",
        role: "Admin",
      });

      server.create("user", {
        id: 2,
        name: "Andres",
        hospitalId: "Hospital Policlínico Zacamil del ISSS",
        lastname: "Martinez",
        email: "jose.amurbina@gmail.com",
        password: "123456",
        updatedAt: "2022-05-14 19:26:29.000000",
        createdAt: "2022-05-14 19:27:01.000000",
        role: "Admin",
      });

      server.create("user", {
        id: 3,
        name: "Leonardo",
        hospitalId: "Hospital Médico Quirúrgico del ISSS",
        lastname: "Albiñana",
        email: "paperkoops@gmail.com",
        password: "123456",
        updatedAt: "2022-05-14 19:26:29.000000",
        createdAt: "2022-05-14 19:27:01.000000",
        role: "Normal",
      });

      // Doctor
      server.create("doctor", {
        id: 1,
        degreeId: "Odontologia",
        userId: "Andres Martinez",
        avatar:
          "https://cdn.donmai.us/sample/14/19/__jean_vicquemare_disco_elysium_drawn_by_cheetahman_1ddghfr78cswc__sample-1419cb0b21701488d09ec5f7473bf8c3.jpg",
      });

      // Paciente
      server.create("patient", {
        id: 1,
        isssNumber: 123456789,
        userId: "Leonardo Albiñana",
        duiNumber: 85467792,
        birthdate: "1999-11-12",
        details: "detalles",
        validThru: "2024-11-12",
      });

      // degree
      server.create("degree", {
        id: 1,
        degree: "Pediatria",
      });
      server.create("degree", {
        id: 2,
        degree: "Odontologia",
      });
      server.create("degree", {
        id: 3,
        degree: "Oncologia",
      });

      // Hospital
      server.create("hospital", {
        id: 1,
        name: "Hospital General del ISSS",
        address: "Alameda Juan Pablo II y, 25 Avenida Nte., San Salvador",
      });
      server.create("hospital", {
        id: 2,
        name: "Hospital Policlínico Zacamil del ISSS",
        address: "Calle Zacamil, Mejicanos",
      });
      server.create("hospital", {
        id: 3,
        name: "Hospital Médico Quirúrgico del ISSS",
        address: "PQ2V+PV8, Alameda Juan Pablo II, San Salvador",
      });
      // Inventory_type

      server.create("inventoryType", {
        id: 1,
        name: "Analgesico-solido",
        presentation: "500 ml",
      });

      server.create("inventoryType", {
        id: 2,
        name: "somnifero-jarabe",
        presentation: "350 ml",
      });
      server.create("inventoryType", {
        id: 3,
        name: "otro",
        presentation: "caja de 2 pares",
      });

      // Inventory

      server.create("inventory", {
        id: 1,
        product: "guantes de latex",
        typeInventoryId: "otro",
        stock: 5,
      });

      server.create("inventory", {
        id: 2,
        product: "Acetaminofen",
        typeInventoryId: "Analgesico-solido",
        stock: 15,
      });

      server.create("inventory", {
        id: 2,
        product: "Zolpidem",
        typeInventoryId: "somnifero-jarabe",
        stock: 7,
      });

      // Shift
      let currentDate = new Date();
      server.create("shift", {
        id: 1,
        checkInTime: currentDate.getHours() + ":" + currentDate.getMinutes(),
        checkOutTime: currentDate.getHours() + ":" + currentDate.getMinutes(),
        days: {
          Monday: true,
          Tuesday: true,
          Wednesday: true,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        },
      });

      server.create("shift", {
        id: 2,
        checkInTime: currentDate.getHours() + ":" + currentDate.getMinutes(),
        checkOutTime: currentDate.getHours() + ":" + currentDate.getMinutes(),
        days: {
          Monday: true,
          Tuesday: true,
          Wednesday: true,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        },
      });

      // ShiftDoctor
      server.create("shiftDoctor", {
        id: 1,
        shiftId: 1,
        doctorId: 1,
      });

      // Appointment
      server.create("appointment", {
        id: 1,
        patientId: "Leonardo Albiñana",
        doctorId: "Andres Martinez",
        date: "2022-05-14 07:26",
        details: "",
        status: 1,
      });

      server.create("appointment", {
        id: 2,
        patientId: "Leonardo Albiñana",
        doctorId: "Andres Martinez",
        date: "2022-05-30 07:26",
        details: "",
        status: 1,
      });

      //Prescription
      server.create("prescription", {
        id: 1,
        appointmentId: 1,
        productId: "Zolpidem",
        dosis: "2 cada 8 horas",
      });
    },

    routes() {
      this.namespace = "api";
      this.timing = 50;

      this.get("/users", (schema, request) => {
        return schema.users.all();
      });
      this.get("/admins", (schema, request) => {
        return schema.admins.all();
      });
      /////////////////////////////////////////////////////
      ///////////////////////DEGREE////////////////////////
      /////////////////////////////////////////////////////
      this.get("/degrees", (schema, request) => {
        return schema.degrees.all();
      });
      this.get("/degrees/:id", (schema, request) => {
        return schema.degrees.find(request.params.id);
      });
      this.patch("/degrees/:id", (schema, request) => {
        let updatedDegree = JSON.parse(request.requestBody);
        let oldDegree = schema.degrees.findBy({ id: updatedDegree.id });

        return oldDegree.update(updatedDegree);
      });
      this.post("/degrees", (schema, request) => {
        let newDegree = JSON.parse(request.requestBody);
        newDegree.id = null;
        //console.log("TODOS LOS DEGREE: ", schema.degrees.all());
        console.log("NEW DEGREE TO INSERT: ", newDegree);
        return schema.degrees.create(newDegree);
      });
      this.delete("/degrees/:id", (schema, request) => {
        return schema.degrees.findBy({ id: request.params.id }).destroy();
      });
      /////////////////////////////////////////////////////
      ///////////////////////HOSPITAL////////////////////////
      /////////////////////////////////////////////////////
      this.get("/hospitals", (schema, request) => {
        return schema.hospitals.all();
      });
      this.get("/hospitals/:id", (schema, request) => {
        return schema.hospitals.find(request.params.id);
      });
      this.patch("/hospitals/:id", (schema, request) => {
        let updatedHospital = JSON.parse(request.requestBody);
        let oldHospital = schema.hospitals.findBy({ id: updatedHospital.id });

        return oldHospital.update(updatedHospital);
      });
      this.post("/hospitals", (schema, request) => {
        let newHospital = JSON.parse(request.requestBody);
        newHospital.id = null;
        return schema.hospitals.create(newHospital);
      });
      this.delete("/hospitals/:id", (schema, request) => {
        return schema.hospitals.findBy({ id: request.params.id }).destroy();
      });
      /////////////////////////////////////////////////////
      ///////////////////Inventory_type////////////////////
      /////////////////////////////////////////////////////
      this.get("/inventory_types", (schema, request) => {
        return schema.inventoryTypes.all();
      });
      this.get("/inventory_types/:id", (schema, request) => {
        return schema.inventoryTypes.find(request.params.id);
      });
      this.delete("/inventory_types/:id", (schema, request) => {
        return schema.inventoryTypes
          .findBy({ id: request.params.id })
          .destroy();
      });
      this.patch("/inventory_types/:id", (schema, request) => {
        let updatedInventoryTypes = JSON.parse(request.requestBody);
        let oldInventoryTypes = schema.inventoryTypes.findBy({
          id: updatedInventoryTypes.id,
        });

        return oldInventoryTypes.update(updatedInventoryTypes);
      });
      this.post("/inventory_types", (schema, request) => {
        let newInventoryTypes = JSON.parse(request.requestBody);
        newInventoryTypes.id = null;
        return schema.inventoryTypes.create(newInventoryTypes);
      });
      //////////////////////////////////////////////////////
      ///////////////////Inventory/////////////////////////
      ////////////////////////////////////////////////////
      this.get("/products", (schema, request) => {
        console.log("si entro");
        return schema.inventories.all();
      });
      this.delete("/products/:id", (schema, request) => {
        return schema.inventories.findBy({ id: request.params.id }).destroy();
      });
      this.get("/products/:id", (schema, request) => {
        return schema.inventories.find(request.params.id);
      });
      this.patch("/products/:id", (schema, request) => {
        let updatedInventory = JSON.parse(request.requestBody);
        let oldInventory = schema.inventories.findBy({
          id: updatedInventory.id,
        });

        return oldInventory.update(updatedInventory);
      });
      this.post("/products", (schema, request) => {
        let newInventory = JSON.parse(request.requestBody);
        newInventory.id = null;
        return schema.inventories.create(newInventory);
      });
      //////////////////////////////////////////////////////
      //////////////////////Usuarios///////////////////////
      ////////////////////////////////////////////////////
      this.get("/users", (schema, request) => {
        return schema.users.all();
      });
      this.delete("/users/:id", (schema, request) => {
        return schema.users.findBy({ id: request.params.id }).destroy();
      });
      this.get("/users/:id", (schema, request) => {
        return schema.users.find(request.params.id);
      });
      this.patch("/users/:id", (schema, request) => {
        let updatedUser = JSON.parse(request.requestBody);
        let oldUser = schema.users.findBy({ id: updatedUser.id });

        return oldUser.update(updatedUser);
      });
      this.post("/users", (schema, request) => {
        let newUser = JSON.parse(request.requestBody);
        newUser.id = null;
        return schema.users.create(newUser);
      });
      //////////////////////////////////////////////////////
      ///////////////////////Doctors///////////////////////
      /////////////////////////////////////////////////////
      this.get("/doctors", (schema, request) => {
        return schema.doctors.all();
      });
      this.delete("/doctors/:id", (schema, request) => {
        return schema.doctors.findBy({ id: request.params.id }).destroy();
      });
      this.get("/doctors/:id", (schema, request) => {
        return schema.doctors.find(request.params.id);
      });
      this.post("/doctors", (schema, request) => {
        let newDoctor = JSON.parse(request.requestBody);
        newDoctor.id = null;
        return schema.doctors.create(newDoctor);
      });
      this.patch("/doctors/:id", (schema, request) => {
        let updatedDoctor = JSON.parse(request.requestBody);
        let oldDoctor = schema.doctors.findBy({ id: updatedDoctor.id });

        return oldDoctor.update(updatedDoctor);
      });
      //////////////////////////////////////////////////////
      //////////////////////Patient///////////////////////
      ////////////////////////////////////////////////////
      this.get("/patients", (schema, request) => {
        return schema.patients.all();
      });
      this.delete("/patients/:id", (schema, request) => {
        return schema.patients.findBy({ id: request.params.id }).destroy();
      });
      this.get("/patients/:id", (schema, request) => {
        return schema.patients.find(request.params.id);
      });
      this.post("/patients", (schema, request) => {
        let newPatient = JSON.parse(request.requestBody);
        newPatient.id = null;
        return schema.patients.create(newPatient);
      });
      this.patch("/patients/:id", (schema, request) => {
        let updatedPatient = JSON.parse(request.requestBody);
        let oldPatient = schema.patients.findBy({ id: updatedPatient.id });

        return oldPatient.update(updatedPatient);
      });
      //////////////////////////////////////////////////////
      ///////////////////////Shifts//////////////////
      /////////////////////////////////////////////////////
      this.get("/shifts", (schema, request) => {
        return schema.shifts.all();
      });
      this.delete("/shifts/:id", (schema, request) => {
        return schema.shifts.findBy({ id: request.params.id }).destroy();
      });
      this.get("/shifts/:id", (schema, request) => {
        return schema.shifts.find(request.params.id);
      });
      this.post("/shifts", (schema, request) => {
        let newShift = JSON.parse(request.requestBody);
        newShift.id = null;
        return schema.shifts.create(newShift);
      });
      this.patch("/shifts/:id", (schema, request) => {
        let updatedShift = JSON.parse(request.requestBody);
        let oldShift = schema.shifts.findBy({ id: updatedShift.id });

        return oldShift.update(updatedShift);
      });
      //////////////////////////////////////////////////////
      ///////////////////////Appointments//////////////////
      ////////////////////////////////////////////////////
      this.get("/appointments", (schema, request) => {
        return schema.appointments.all();
      });
      this.delete("/appointments/:id", (schema, request) => {
        return schema.appointments.findBy({ id: request.params.id }).destroy();
      });
      this.get("/appointments/:id", (schema, request) => {
        return schema.appointments.find(request.params.id);
      });
      this.post("/appointments", (schema, request) => {
        let newAppointment = JSON.parse(request.requestBody);
        newAppointment.id = null;
        return schema.appointments.create(newAppointment);
      });
      this.patch("/appointments/:id", (schema, request) => {
        let updatedAppointment = JSON.parse(request.requestBody);
        let oldAppointment = schema.appointments.findBy({
          id: updatedAppointment.id,
        });

        return oldAppointment.update(updatedAppointment);
      });

      /////////////////////////////////////////////////////
      ////////////////////// Shift Doctor /////////////////
      /////////////////////////////////////////////////////
      this.get("/shift_doctors", (schema, request) => {
        return schema.shiftDoctors.all();
      });
      this.delete("/shift_doctors/:id", (schema, request) => {
        return schema.shiftDoctors.findBy({ id: request.params.id }).destroy();
      });
      this.get("/shift_doctors/doctor/:id", (schema, request) => {
        return schema.shiftDoctors.findBy({ doctorId: request.params.id });
      });
      this.get("/shift_doctors/:id", (schema, request) => {
        return schema.shiftDoctors.find(request.params.id);
      });
      this.post("/shift_doctors", (schema, request) => {
        let newShiftDoctor = JSON.parse(request.requestBody);
        newShiftDoctor.id = null;
        return schema.shiftDoctors.create(newShiftDoctor);
      });
      this.patch("/shift_doctors/:id", (schema, request) => {
        let updatedShiftDoctor = JSON.parse(request.requestBody);
        let oldShiftDoctor = schema.shiftDoctors.findBy({
          id: updatedShiftDoctor.id,
        });

        return oldShiftDoctor.update(updatedShiftDoctor);
      });
      /////////////////////////////////////////////////////
      //////////////////// Prescriptions //////////////////
      /////////////////////////////////////////////////////
      this.get("/prescriptions", (schema, request) => {
        return schema.prescriptions.all();
      });
      this.delete("/prescriptions/:id", (schema, request) => {
        return schema.prescriptions.findBy({ id: request.params.id }).destroy();
      });
      this.get("/prescriptions/appointment/:id", (schema, request) => {
        return schema.prescriptions.where({ appointmentId: request.params.id });
      });
      this.post("/prescriptions", (schema, request) => {
        let newPrescription = JSON.parse(request.requestBody);
        newPrescription.id = null;
        return schema.prescriptions.create(newPrescription);
      });
    },
  });
  console.log("Mockapi running");
  return server;
}
