# New York Post and DowJOnes Tracking Request Application

This application, developed by John Margotti on 3/28/2024, is designed to manage tracking request sites for the New York Post. It allows users to add or remove tracking requests and provides functionality to indicate when requests are late. The application is built using React, Rails, and PostgreSQL.

Revised on 2/27/2025 to include DowJones for tracking new users and terminations 

## Features

- **Add or Remove Tracking Requests**: Users can add new tracking requests to the system or remove existing ones.

- **Late Request Notification**: The application can identify and display notifications for requests that are late.

- **Sorting Functionality**: Requests can be sorted based on their status, such as completed, in progress, or new requests.

## Technologies Used

- React: Frontend framework for building the user interface.
- JavaScript Express BAckend with PG NPM package to connect to the DB
- PostgreSQL: Database management system used to store tracking request data.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install` for the frontend and `bundle install` for the backend.
3. Set up the backend env and frontend env settings
5. Start the React development server using `npm start`.
6. Start Backend by using node server.js

## Usage

1. Open the application in your web browser.
2. Use the interface to add, remove, or manage tracking requests.
3. Use the sorting functionality to organize requests based on their status.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
