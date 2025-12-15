# MongoDB Docker Setup for Rozaneh

## Start MongoDB with Docker Compose

```bash
# Navigate to project directory
cd c:\Users\amin azizi\Desktop\webs\webproject\Rozaneh

# Start MongoDB and Mongo Express
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Access Mongo Express UI

- **URL:** http://localhost:8081
- **Username:** admin
- **Password:** admin

## MongoDB Databases

### app1
- Reserved for other application data

### app2 (Rozaneh)
- **users** - User accounts and profiles
- **therapists** - Therapist information
- **employees** - Employee records
- **assessments_results** - Assessment test results

## Connection Strings

### Local Development
```
mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@localhost:27017/app2?authSource=admin
```

### Remote Production
```
mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/app2?authSource=admin
```

## Database Status

To check what's in app2 from CLI:

```bash
# Connect to MongoDB
mongo -u root -p iapqIvsm1GACa6OPHFnqQhWl --authenticationDatabase admin localhost:27017/app2

# List collections
show collections

# Check users collection
db.users.find()

# Check therapists collection
db.therapists.find()

# Check employees collection
db.employees.find()

# Check assessments results
db.assessments_results.find()
```

## Initialize Databases

The `mongo-init.js` script automatically:
1. Creates the `app2` database
2. Creates all 4 collections with validation schemas
3. Sets up indexes for performance
4. Initializes both `app1` and `app2` databases

To manually re-initialize, delete the `mongodb_data` volume and restart:
```bash
docker-compose down -v
docker-compose up -d
```
