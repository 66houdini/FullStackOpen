import patients from "../../data/patients";
import {NewPatientEntry, PatientsEntry} from "../types"
import {v1 as uuid} from "uuid";
const getPatients = (): PatientsEntry[] => {
    return patients;
}

const addPatients = (entry:NewPatientEntry): PatientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    }
    patients.push(newPatientEntry);
    return newPatientEntry;
}
export default {
    getPatients,
    addPatients
}