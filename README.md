# 🚗⚡ EV Charging Analytics System

A full-stack web application that analyzes Electric Vehicle (EV) charging data, provides insights, and helps users understand EV adoption trends.

---

## 📌 Project Overview

The **EV Charging Analytics System** is designed to:

* Monitor EV charging station data
* Analyze usage patterns
* Provide visual insights through dashboards
* Support data-driven decisions for EV infrastructure

---

## 🛠 Tech Stack

### Frontend

* React.js
* HTML, CSS, JavaScript

### Backend

* Spring Boot (Java)
* REST APIs

### Database

* MySQL

---

## 📂 Project Structure

```
ev-project/
├── frontend/        # React application
├── backend/         # Spring Boot backend
├── database/        # MySQL dump file
│   └── ev_project.sql
└── README.md
```

---

## 🚀 Features

* 📊 Interactive dashboards & analytics
* 🔌 EV charging station data visualization
* 📈 Growth and trend analysis
* 🔔 Alert/notification system
* 🌍 Region-wise insights (maps & charts)
* 🔐 User authentication (if implemented)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/venkatinti/ev-project.git
cd ev-project
```

---

### 2️⃣ Database Setup (MySQL)

1. Open MySQL
2. Create database:

```sql
CREATE DATABASE ev_project;
```

3. Import SQL file:

```
database/ev_project.sql
```

---

### 3️⃣ Backend Setup (Spring Boot)

1. Open backend folder in STS / IntelliJ
2. Update DB credentials in:

```
application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3307/ev_project
spring.datasource.username=root
spring.datasource.password=your_password
```

3. Run application:

```
Run as Spring Boot App
```

---

### 4️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

👉 App will run on:

```
http://localhost:3000
```

---

## 🔗 API Integration

* Backend provides REST APIs
* Frontend consumes APIs for dynamic data
* Optional: External APIs (like EV station APIs)

---

## 🔮 Future Enhancements

* 🌐 Deploy on cloud (AWS / Vercel / Render)
* 📱 Mobile responsiveness improvements
* 🤖 AI-based predictions for EV demand
* 🔐 Advanced authentication & roles
* 📡 Real-time data integration

---

## 👨‍💻 Author

**Venkat Inti**

* GitHub: https://github.com/venkatinti

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🛠 Contribute

---

## 📜 License

This project is for educational purposes.
