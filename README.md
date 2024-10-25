# Real-Time Weather Application 🌤️

A modern weather dashboard that provides real-time weather updates for Indian metropolitan cities and custom locations, with configurable weather alerts.

## ✨ Key Features

- **Pre-configured Cities:** Automatic weather updates for Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad
- **Custom City Search:** Add and monitor any city of your choice
- **Comprehensive Weather Data:**
  - Current temperature (with unit conversion: °C/°F/K)
  - Feels like temperature
  - Wind speed
  - Humidity
  - Daily min/max temperature
  - 5-day forecast with weather icons
- **Smart Alerts System:**
  - Set custom temperature thresholds
  - Monitor specific weather conditions
  - Email notifications
  - 10-minute update frequency

## 🚀 Quick Start Guide

### Prerequisites

- Node.js
- PostgreSQL
- Docker (optional)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SvickyB/Real_Time_Weather_Application.git
   ```

2. **Set Up Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Set Up Backend**
   ```bash
   cd ../backend
   npm install
   ```

4. **Database Setup**
   - Create a PostgreSQL database:
     ```sql
     CREATE DATABASE weatherapp;
     ```
   - Tables will be created automatically on server start

5. **Configure Environment Variables**
   Create a `.env` file in the backend folder:
   ```env
   # Database
   DB_USER=your_username
   DB_HOST=your_host
   DB_NAME=your_db_name
   DB_PASSWORD=your_password
   DB_PORT=5432

   # API
   WEATHER_API_KEY=your_openweathermap_key

   # Server
   PORT=5000

   # Email
   EMAIL_USER=your_email
   EMAIL_PASS=your_app_password
   ```

6. **Start the Server**
   ```bash
   node server.js
   ```

## 💡 How to Use

1. **Access the Dashboard**
   - Open `http://localhost:3000` in your browser
   - View real-time weather data for metropolitan cities

2. **Search Cities**
   - Use the search bar to find any city
   - Click the search icon or press Enter

3. **Configure Alerts**
   - Navigate to Alert Management
   - Set up alerts with:
     - City name
     - Temperature thresholds
     - Weather conditions
     - Email address for notifications

4. **Manage Alerts**
   - View active alerts
   - Check triggered alerts
   - Delete unwanted alerts

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Additional Tools:**
  - Axios for API requests
  - Nodemailer for email alerts

## 📦 Dependencies

### Frontend
- React
- Tailwind CSS
- Axios

### Backend
- Express
- dotenv
- cors
- pg (PostgreSQL client)
- nodemailer

## 🎯 Design Choices

- **React:** Component-based architecture for maintainable UI
- **Tailwind CSS:** Rapid styling and customization
- **Express:** Efficient REST API handling
- **PostgreSQL:** Reliable data storage
- **Nodemailer:** Robust email notification system

## 🔄 Update Frequencies

- Metropolitan cities: Every 5 minutes
- Alert checks: Every 10 minutes
