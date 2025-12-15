import { initializeModels } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { employeeModel } = await initializeModels();

        const employeeData = await request.json();

        // Create a new employee record
        const newEmployee = await employeeModel.create({
            employee_id: `emp_${Date.now()}`,
            name: employeeData.name || 'Test Employee',
            email: employeeData.email || `emp_${Date.now()}@example.com`,
            phone: employeeData.phone || '09123456789',
            position: employeeData.position || 'Therapist',
            department: employeeData.department || 'Clinical',
            hire_date: employeeData.hire_date || new Date(),
            salary: employeeData.salary || 5000000,
            status: employeeData.status || 'active',
            is_active: true,
        });

        return NextResponse.json({
            success: true,
            message: 'Employee added to MongoDB app2.employees',
            data: newEmployee,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { employeeModel } = await initializeModels();

        const department = request.nextUrl.searchParams.get('department');

        let employees;
        if (department) {
            employees = await employeeModel.findByDepartment(department);
        } else {
            employees = await employeeModel.findAll({ is_active: true });
        }

        return NextResponse.json({
            success: true,
            message: 'Retrieved employees from MongoDB app2.employees',
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
