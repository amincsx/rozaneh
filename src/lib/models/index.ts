import connectToDatabase from '../mongodb';
import { UserModel } from './User';
import { TherapistModel } from './Therapist';
import { EmployeeModel } from './Employee';
import { AssessmentResultModel } from './AssessmentResult';

let userModel: UserModel;
let therapistModel: TherapistModel;
let employeeModel: EmployeeModel;
let assessmentResultModel: AssessmentResultModel;

export async function initializeModels() {
    const { db } = await connectToDatabase();

    if (!db) throw new Error('Database not connected');

    userModel = new UserModel(db);
    therapistModel = new TherapistModel(db);
    employeeModel = new EmployeeModel(db);
    assessmentResultModel = new AssessmentResultModel(db);

    return {
        userModel,
        therapistModel,
        employeeModel,
        assessmentResultModel,
    };
}

export function getModels() {
    if (!userModel || !therapistModel || !employeeModel || !assessmentResultModel) {
        throw new Error('Models not initialized. Call initializeModels() first.');
    }

    return {
        userModel,
        therapistModel,
        employeeModel,
        assessmentResultModel,
    };
}
