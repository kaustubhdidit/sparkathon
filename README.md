# Assignment - RBAC App Frontend

This is the frontend of the Sparkathon application, built using React and Next.js. The app provides a user interface for role-based access control (RBAC) that interacts with the backend API for managing orders, user roles, and other functionalities.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher)

- **npm** (version 8 or higher)

## Setup Instructions

1. **Clone the Repository**:

   Start by cloning the repository to your local machine:

   ```bash

   git clone https://github.com/kaustubhdidit/sparkathon.git

   ```

2. **Navigate to the Project Folder**:

   Once the repository is cloned, navigate into the project directory:

   ```bash

   cd sparkathon

   ```

3. **Install Dependencies**:

   Run the following command to install all the required dependencies:

   ```bash

   npm install

   ```

4. **Create a .env File**:

   In the root of the project, create a .env file and add the following line to set up the backend URL:

   ```env

   NEXT_PUBLIC_BACKEND_URL=https://sparkbackend-z4w6.onrender.com

   ```

   If you're running the backend locally, update the URL to:

   ```env

   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

   ```

   This environment variable will be used to connect to the backend API.

5. **Run the Application**:

   To start the application locally, run the following command:

   ```bash

   npm run dev

   ```

   This will start the development server. You can access the app in your browser at:

   ```

   http://localhost:3000

   ```

## Available Scripts

- npm run dev: Starts the development server (typically available at http://localhost:3000).

- npm run build: Builds the project for production.

- npm run start: Starts the production server after building.

## Features

- **Role-Based Access Control**: Users with different roles (e.g., admin, vendor, employee) have access to specific features.

- **Order Management**: View and manage orders with the ability to toggle the delivery status.

- **Search and Filters**: Search orders by email, product ID, and filter by delivery status (Pending/Delivered).

- **Delete Functionality**: Admin can delete orders with a confirmation alert.

## Contributing

If you'd like to contribute to this project, follow these steps:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature-branch`).

3. Commit your changes (`git commit -am 'Add new feature'`).

4. Push to your branch (`git push origin feature-branch`).

5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, feel free to create an issue in the GitHub repository or reach out to the project maintainers.

```
