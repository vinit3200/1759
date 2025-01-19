# Project-5: Food Calorie Calculator with QR Code Scanning

## Overview

This project is a React-based web application that scans a QR code representing a food dish and calculates its calorie count based on its individual constituents. Users can modify the quantity of individual items in the dish, and the app dynamically updates the calorie calculation. The backend, powered by Node.js and MongoDB, manages the inventory, including CRUD APIs for dishes and their constituent items.

## Key Features

1. **QR Code Scanning**
   - Scan QR codes containing dish information.
   - Decode data such as dish name and constituent items.
   
2. **Dynamic Calorie Calculation**
   - Retrieve calorie data for dish constituents from the database.
   - Display a real-time calorie breakdown and total calories.
   - Allow users to modify the quantity of items and update calorie counts dynamically.

3. **Inventory Management**
   - CRUD APIs for managing dishes and their constituent items.
   - Update calorie values and item details through the backend.

4. **User-Friendly Interface**
   - Intuitive UI for viewing dish details, calorie breakdown, and modifying quantities.

## Tech Stack

- **Frontend:** React.js (with `react-qr-reader`)
- **Backend:** Node.js with Express.js
- **Database:** MongoDB

## Installation and Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud-based instance)
- npm or yarn package manager

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vinit3200/1759.git
   cd 1759

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend

2. **Install dependencies**
- npm install

3. **Set up environment variables in a .env file**
- MONGO_URI=<your_mongodb_connection_string>
- PORT=5001

4. **Start the server**
   -npm run dev


### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd ../backend

2. **Install dependencies**
- npm install

3. **Start the server**
   -npm run dev


## Access the Application

Frontend: http://localhost:3000
Backend: http://localhost:5001

## Deployment
Frontend: Deployed on Netlify [click here](https://jovial-stardust-c3870e.netlify.app).
Backend: Deployed on Render/Heroku [click here](https://foodapp-lq4i.onrender.com/api/dishes).

## Group Presentation
A 7–10 minute video covering the app's functionality and technical details is available [here]()

## Contributors

- **Preethi**
- **Aditya** 
- **Shamanth** 
- **Vaibhav** 

## License

This project is proprietary and not licensed for public use or distribution.



