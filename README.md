

# Realesto

Realesto is a platform designed to simplify the process of finding and listing properties. It provides users with a seamless experience to discover available properties and communicate with agents in real-time through a chat option. The project is built using React for the frontend, MongoDB as the database, Prisma for ORM (Object-Relational Mapping), and socket.io for real-time communication.


#output

https://github.com/iinava/RealEsto/assets/131179814/4c328f58-197c-4cc6-aafe-580b39b69635


## Features

- **Property Search:** Users can search for properties based on various criteria such as location, price range, property type, etc.
- **Property Listing:** Property owners or agents can easily list their properties on the platform, providing detailed information and images.
- **Real-time Chat:** Users can communicate with agents in real-time through a chat option, enabling quick responses to inquiries and facilitating smoother transactions.
- **User Authentication:** Secure user authentication system to ensure privacy and data security.
- **Responsive Design:** The platform is designed to be responsive, ensuring a seamless experience across different devices and screen sizes.

## Project Structure

The project is structured into three main directories:

1. **api:** Contains the backend API code, built using Node.js and Express. This directory handles data storage, retrieval, and business logic.
2. **client:** Holds the frontend codebase, developed using React. This directory is responsible for the user interface and client-side interactions.
3. **socket:** Includes the socket.io implementation for real-time communication between clients and agents.

## Installation and Setup

To set up the project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   https://github.com/iinava/RealEsto.git
   ```
2. **Navigate to the Api , CLient , Socket Project Directorys and run these command:**
   ```bash
   cd api
   cd socket
   cd client
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   This command will concurrently start the backend server, frontend server, and socket server.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **MongoDB:** A NoSQL database used for storing property data.
- **Prisma:** An ORM (Object-Relational Mapping) tool used for database management.
- **Socket.io:** A library enabling real-time, bidirectional communication between clients and servers.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
