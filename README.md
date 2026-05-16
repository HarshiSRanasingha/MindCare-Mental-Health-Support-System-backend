# ⚙️ MindCare - Mental Health Support System (Backend API)
## 📌 1. Project Overview
MindCare API is the robust, highly secure backend service that powers the MindCare Mental Health platform 🧠. It provides RESTful endpoints to manage user authentication 🔐, data persistence for self-help tools (like journals and mood trackers) 📊, and a secure routing system for connecting students with professional counselors 🤝.

## 🎯 2. Problem Description
Mental health platforms deal with highly sensitive, personally identifiable information (PII) and confidential medical data.

### 🚨 Security Risks: 
A traditional monolithic or loosely secured architecture risks catastrophic data breaches.
### 🚧 Access Segregation: 
Managing different user roles (Students seeking help vs. Counselors providing help) requires a strict access control system. A student must never see another student's data, and a counselor should only see requests assigned or relevant to them.
### 🔌 Decoupling Need: 
Tying the database logic directly to the frontend creates vulnerabilities. A decoupled API ensures that business logic is hidden and protected.

## 💡 3. Proposed Solution
The MindCare Backend is engineered as a decoupled RESTful API using Node.js and Express 🚀.

### 🗄️ Scalable Storage: 
It leverages MongoDB (NoSQL) for flexible document storage, which is ideal for varied, unstructured data like journal entries and mood logs.
### 🛡️ Ironclad Security:
All passwords are cryptographically hashed using bcryptjs. Endpoints are guarded by JSON Web Tokens (JWT) for stateless session management.
### 🛂 Role-Based Access Control (RBAC):
Custom middleware intercepts requests to ensure only users with the counselor role can access or modify the global request queue.

## ✨ 4. Core Features & Capabilities

### 🔐 4.1 Advanced Authentication & Authorization
📝 Secure Registration: 
Separate validation and registration logic flows for students and counselors.
🎟️ JWT Session Management: 
Stateless authentication ensuring the server does not need to store session IDs, improving horizontal scalability.
👮 Role-Based Access Control (RBAC): 
Custom middleware (roleMiddleware.js) ensures strict boundary enforcement between user types.

### 🔀 4.2 Request Routing Engine
⚙️ CRUD Operations: 
Full lifecycle management for support requests (Create, Read, Update, Delete).
🚦 Status Tracking:
Requests transition through states (e.g., Pending, In Progress, Resolved) managed exclusively via counselor-authorized endpoints.

### 🛡️ 4.3 Data Integrity & Security Measures

🔒 Password Hashing:
Utilization of bcryptjs with salt rounds to hash passwords before database insertion.
🙈 Environment Protection: 
Sensitive keys (Database URI, JWT Secrets) are strictly isolated using .dotenv.
🌐 CORS Configuration: 
Explicitly configured to accept cross-origin requests only from trusted frontend domains, preventing CSRF attacks.

## 🏗️ 5. Architecture & Database Design

### 💻 5.1 Tech Stack

🟢 Runtime Environment: Node.js (V8 Engine)
🚂 Web Framework: Express.js
🍃 Database: MongoDB (Local or Atlas Cloud)
🗺️ ODM (Object Data Modeling): Mongoose
🛠️ Security & Utils: bcryptjs, jsonwebtoken, cors, dotenv, nodemon (Dev)

### 🗃️ 5.2 Database Schema Overview (Data Models)

🧑‍🎓 User (Student):
name (String, required)
email (String, required, unique)
password (String, required, hashed)
role (String, default: 'student')

👨‍⚕️ Counselor:
name, email, password (Hashed)
specialization (String - e.g., 'Academic Anxiety', 'Depression')
role (String, default: 'counselor')

✉️ Request: Acts as the relational bridge.
studentId (ObjectId, ref: 'User')
title (String)
description (String)
status (Enum: 'Pending', 'In Progress', 'Resolved')
counselorAssigned (ObjectId, ref: 'Counselor', optional)

### 🏗️ 5.3 System Architecture Diagram
graph TD
    Client([💻 Frontend Client / Axios]) -->|HTTP Request| Express[🚂 Express.js Server / Entry Point]
    
    subgraph ⚙️ Backend API Service
        Express --> Router[🔀 API Router /routes]
        Router -->|If Protected| Auth[🛡️ Auth & Role Middleware]
        Auth -->|Validated| Ctrl[🎛️ Controllers /controllers]
        Router -->|If Public| Ctrl
        
        Ctrl -->|CRUD Ops| Models[🗺️ Mongoose Models /models]
    end
    
    Models <-->|Read/Write| DB[(🍃 MongoDB Atlas / Data Tier)]
    
## 🌐 6. Comprehensive API Documentation
Below is the detailed list of available REST endpoints. All requests expect and return application/json.

### 🔑 6.1 Authentication (/api/auth)
Method	Endpoint	Description	Access
POST	/register-user	Registers a new student account	🟢 Public
POST	/register-counselor	Registers a new counselor account	🟢 Public
POST	/login	Authenticates a user and returns a JWT	🟢 Public
(Note: Successful login returns a payload containing { _id, name, email, role, token })

### 📝 6.2 Support Requests (/api/requests)
Method	Endpoint	Description	Access
POST	/	Submits a new support request	🟡 Student
GET	/	Retrieves all active requests	🔴 Counselor
PUT	/:id	Updates request status	🔴 Counselor
DELETE	/:id	Removes a resolved/invalid request	🔴 Counselor

### 🚨 6.3 HTTP Error Code Reference
🟢 200 / 201: Success / Created successfully.
🟡 400: Bad Request (Missing required fields).
🔴 401: Unauthorized (Invalid or missing JWT token).
⛔ 403: Forbidden (User does not have the correct role/permissions).
🔍 404: Not Found.
💥 500: Internal Server Error.

## 📂 7. Complete Folder Structure
text
Backend/
+--- .env 🔐
+--- .gitignore 🙈
+--- config/ ⚙️
|   \--- db.js
+--- controllers/ 🎛️
|   +--- authController.js
|   +--- counselorController.js
|   +--- requestController.js
|   \--- userController.js
+--- index.js 🚀
+--- middleware/ 🛡️
|   +--- authMiddleware.js
|   \--- roleMiddleware.js
+--- models/ 🗺️
|   +--- counselorModel.js
|   +--- requestModel.js
|   \--- userModel.js
+--- package-lock.json 📦
+--- package.json 📦
+--- routes/ 🔀
|   +--- authRoutes.js
|   +--- counselorRoutes.js
|   +--- requestRoutes.js
|   \--- userRoutes.js
+--- screenshots/ 📸
|   +--- auth/
|   |   +--- login.png
|   |   +--- register-counselor.png
|   |   \--- register-user.png
|   +--- counselors/
|   |   \--- Get-counselors.png
|   +--- mongodb/
|   |   +--- counselors-data.png
|   |   +--- count-documents.png
|   |   +--- database-collection.png
|   |   +--- requests-data.png
|   |   \--- users-data.png
|   +--- requests/
|   |   +--- create-request.png
|   |   +--- delete-request.png
|   |   +--- Get-Requests.png
|   |   \--- update-request.png
|   \--- users/
|       \--- Get-users.png
\--- utils/ 🛠️
    \--- generateToken.js
    
## 🚀 8. Setup & Installation Instructions
📋 Prerequisites
🟢 Node.js (v16+)
🍃 MongoDB Instance (Local MongoDB Compass or Cloud MongoDB Atlas)

### 📥 8.1 Clone the repository
bash
git clone <your-backend-repo-url>
cd backend

### 📦 8.2 Install Dependencies
bash
npm install

### ⚙️ 8.3 Environment Variables Configuration
Create a .env file in the root directory. Configure the following variables:

env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mindcare?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_cryptographic_key_here
NODE_ENV=development

### ▶️ 8.4 Running the Server
To start the backend server with hot-reloading (via nodemon):

bash
npm start
Expected Terminal Output:

text
Server running on port 5000
MongoDB Connected successfully...

## ☁️ 9. Deployment Strategy (Proposed)
To deploy this API to production:
### 🌐 Hosting: 
Recommended to use platforms like Render, Railway, or Heroku.
### 🔐 Environment Variables: 
Ensure MONGO_URI and JWT_SECRET are securely injected into the hosting platform's environment settings. Do NOT commit the .env file.
### 🛡️ CORS Update: 
Update the cors middleware in index.js to strictly allow requests only from your production frontend URL (e.g., https://mindcare-app.vercel.app), dropping support for localhost:5173.

## 🧪 10. Testing Strategy
### 📬 API Testing (Postman): 
Postman was utilized extensively as the primary tool to manually test all RESTful endpoints, verify JWT token generation/validation, and ensure Role-Based Access Control (RBAC) correctly restricted access to specific routes.
### 🧪 Unit Tests (Proposed):
Use Jest to test utility functions (like generateToken.js).
### 🔗 Integration Tests (Proposed): 
Use Supertest alongside Mocha/Chai to simulate HTTP requests against endpoints (e.g., asserting that /api/auth/login returns a 401 when given a bad password).

## 🤝 11. Contributing

🍴 Fork the repository.
🌱 Create a feature branch (git checkout -b feature/NewEndpoint).
💾 Commit your changes (git commit -m 'Add new endpoint').
🚀 Push to the branch (git push origin feature/NewEndpoint).
📬 Open a Pull Request.

## 📦 12. Deliverables

### 💻 Source Code: 
Complete Node.js/Express backend repository.
### 📖 API Documentation:
Comprehensive list of endpoints detailed in this README.
### 🗺️ Database Schema: 
Mongoose models defining the data structure for Users, Counselors, and Requests.
### 📸 Postman/Testing Proofs: 
Screenshots of successful API responses and MongoDB data entries located in the screenshots/ directory.

## ⚠️ 13. Threats & Limitations

### ⏱️ Database Uptime: 
The system relies on a third-party MongoDB Atlas cluster. Network latency or cluster downtime will cause API failures.
### 🛡️ Security Threats:
While JWT and bcrypt are implemented, the API is vulnerable to DDoS attacks or aggressive rate-limiting issues if not deployed behind a secure proxy (like Cloudflare).
### 📈 Scalability:
Currently relies on a single Node.js thread. For massive user loads, it would require clustering or microservices.

## 🏁 14. Conclusion
The MindCare Backend provides a secure, decoupled, and efficient foundation for the mental health platform ⚙️. By strictly enforcing Role-Based Access Control and encrypting sensitive user data, it ensures that student privacy is maintained while enabling counselors to seamlessly manage their support queues. 🤝

## 👩‍💻 Developed By
Harshani Sandunika Ranasingha
💳 Student ID: 2022/ict/78

