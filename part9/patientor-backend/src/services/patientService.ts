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

const getPatient = (id :string): PatientsEntry => {
    const patient = patients.find(p => p.id === id)
    if(patient){
        return {...patient, entries:[]};
    }else{
        throw new Error("Patient not found");
    }
}

export default {
    getPatients,
    addPatients,
    getPatient
}