# MongoDB Connection Setup Guide

## Environment Variables

Add the following to your `.env.local` file:

```env
MONGODB_URI=mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/my-app?authSource=admin
MONGODB_DB=my-app
```

## Usage Example

### In API Routes

```typescript
// src/app/api/users/route.ts
import { initializeModels } from '@/lib/models';

export async function POST(request: Request) {
  const { userModel } = await initializeModels();
  
  const userData = await request.json();
  const newUser = await userModel.create(userData);
  
  return Response.json(newUser);
}
```

### In Server Components

```typescript
// src/app/dashboard/page.tsx
import { initializeModels } from '@/lib/models';

export default async function DashboardPage() {
  const { therapistModel } = await initializeModels();
  const therapists = await therapistModel.findActive();
  
  return <div>{/* render therapists */}</div>;
}
```

## Collections Available

1. **UserModel** - User accounts and profiles
   - `create()`, `findById()`, `findByEmail()`, `findAll()`, `update()`, `delete()`

2. **TherapistModel** - Therapist profiles
   - `create()`, `findById()`, `findAll()`, `findBySpecialization()`, `findActive()`, `update()`, `delete()`

3. **EmployeeModel** - Employee records
   - `create()`, `findById()`, `findAll()`, `findByDepartment()`, `findByManager()`, `update()`, `delete()`

4. **AssessmentResultModel** - Assessment results
   - `create()`, `findById()`, `findByUserId()`, `findByTherapistId()`, `findByTestName()`, `update()`, `delete()`, `getAverageScoreByTestName()`
