# Real-Time Weather Application

## Overview
This is a real-time weather application that provides users with weather data for six major metropolitan cities, along with user-specified locations. The application fetches weather data at regular intervals and supports alert configurations based on user-defined criteria.

## Features
- Automatically fetches weather data for six metropolitan cities: Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.
- Users can search for additional cities and view their weather data.
- Weather information includes:
  - Wind speed
  - Feels like temperature
  - Minimum and maximum temperature
  - Humidity
  - Current temperature in Celsius
  - 5-day forecast with dynamic weather icons
- Users can switch temperature units between Celsius, Kelvin, and Fahrenheit.
- Alert configuration:
  - Users can set alerts based on city name, temperature thresholds, and weather conditions.
  - Alerts are triggered and emailed to users until deleted.
  - Alerts are fetched automatically every 10 minutes.
- Users can create, delete, and view current alerts, including viewing triggered alerts.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Others**: Axios (for API requests), Nodemailer (for email notifications)

## Installation

### Prerequisites
- Node.js
- PostgreSQL
- Docker (optional for containerized setup)

### Setting Up the Application

#### Frontend
1. Clone the repository:~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   git clone <repository-url>

2. Install Dependencies
~~~~~~~~~~~~~~~~~~~~~~~~
**********For Frontend**********
   cd frontend  // Navigate to your frontend project path
   npm install  // Install required depedencies for frontend
   npm start    // Start the frontend


#### Backend
   cd ..  // navigate to previous path
   cd backend    // Navigate to your backend project path
   npm install   // Install required depedencies for backend

#### Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Create the PostgreSQL Database:
    
    Open your PostgreSQL client (e.g., pgAdmin or psql).
        OR
    Create a new database using the following command:
    
    CREATE DATABASE weatherapp;  // As per your choice
    Adjust the database name in the backend .env file if necessary.
    Automatically Create Required Tables:
    
    The application is configured to automatically create the required tables if they do not exist when the server starts.

**Deployment**
~~~~~~~~~~~~~~~~~~~~~~~
    node server.js   // Start the server:

**Design Choices**
    Frontend: React was chosen for its component-based architecture, making the UI reusable and maintainable. Tailwind CSS was used for rapid UI development and customization.
    Backend: Express was selected for its simplicity and efficiency in building RESTful APIs.
    Database: PostgreSQL was chosen for its reliability and support for complex queries.
    Email Notifications: Nodemailer was implemented for sending alert notifications via email.

**Dependencies**
    Frontend
    React
    Tailwind CSS
    Axios
    Backend
    Express
    dotenv
    cors
    pg (for PostgreSQL integration)
    nodemailer (for sending emails)

**Usage**
1. **Accessing the Application**
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the frontend of the weather application.

2. **Viewing Weather Data**
   - The application will automatically fetch initial weather data for six major metropolitan cities every 5 minutes. You can view current weather conditions, including temperature, humidity, wind speed, and a 5-day forecast.

3. **Searching for Cities**
   - Use the search bar to find weather data for various cities. Simply enter the city name and hit "Enter" or click the search icon to retrieve the relevant information.

4. **Configuring Alerts**
   - Navigate to the alert management section to configure alerts. You can set alerts by specifying:
     - **City Name**: The city for which you want to receive weather alerts.
     - **Temperature Threshold**: Set a minimum or maximum temperature that will trigger the alert.
     - **Conditions**: Specify weather conditions (e.g., rain, snow) that you want to monitor.
     - **Email Address**: Enter the email address where you want to receive alert notifications.

5. **Alert Notifications**
   - The application will check for alerts every 10 minutes. If the specified temperature threshold or weather conditions are triggered, an email notification will be sent to the provided email address.
   - The alert will continue to send notifications every 10 minutes until you delete the triggered alert from the alert management section.

6. **Managing Alerts**
   - Users can view current alerts, delete them, and see a list of triggered alerts. This allows for easy management and customization of alert settings.

**Configuration**
In the backend folder, replace this .env file with the following content:
            # Database configuration
            DB_USER=Your_Database_Username
            DB_HOST=Your_Database_Host
            DB_NAME=Your_Database_Name
            DB_PASSWORD=2Your_Database_Password
            DB_PORT=Your_Database_Port (5432)
            
            # Weather API configuration
            WEATHER_API_KEY=Your_OpenweathermapAPI_Key
            
            # Server configuration
            PORT=5000
            
            # Email configuration
            EMAIL_USER=Your_Sender_Mail_Id  // sender mail id to send mails if alert triggers
            EMAIL_PASS=App_Passwords   //enter app passwords
