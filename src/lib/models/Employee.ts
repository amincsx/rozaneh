/* eslint-disable @typescript-eslint/no-explicit-any */
import { Db, ObjectId } from 'mongodb';

export interface IEmployee {
    _id?: ObjectId;
    employee_id: string;
    name: string;
    email: string;
    phone?: string;
    position: string;
    department: string;
    hire_date: Date;
    salary: number;
    manager_id?: string;
    status: 'active' | 'inactive' | 'on_leave';
    address?: string;
    emergency_contact?: Record<string, string>;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export class EmployeeModel {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async create(employeeData: Omit<IEmployee, '_id' | 'created_at' | 'updated_at'>): Promise<IEmployee> {
        const employee: IEmployee = {
            ...employeeData,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const result = await this.db.collection('employees').insertOne(employee as any);
        return { ...employee, _id: result.insertedId };
    }

    async findById(employeeId: string): Promise<IEmployee | null> {
        const result = await this.db.collection('employees').findOne({ employee_id: employeeId });
        return result as any as IEmployee | null;
    }

    async findAll(filter: Record<string, unknown> = {}): Promise<IEmployee[]> {
        const results = await this.db.collection('employees').find(filter).toArray();
        return results as any as IEmployee[];
    }

    async findByDepartment(department: string): Promise<IEmployee[]> {
        const results = await this.db.collection('employees').find({
            department,
            is_active: true,
        }).toArray();
        return results as any as IEmployee[];
    }

    async findByManager(managerId: string): Promise<IEmployee[]> {
        const results = await this.db.collection('employees').find({
            manager_id: managerId,
            is_active: true,
        }).toArray();
        return results as any as IEmployee[];
    }

    async update(employeeId: string, updateData: Partial<IEmployee>): Promise<any> {
        return await this.db.collection('employees').updateOne(
            { employee_id: employeeId },
            { $set: { ...updateData, updated_at: new Date() } }
        );
    }

    async delete(employeeId: string): Promise<any> {
        return await this.db.collection('employees').deleteOne({ employee_id: employeeId });
    }
}
