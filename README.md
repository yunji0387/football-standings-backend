# Football League Standings Backend Server

This Node.js backend server is designed to manage football league standings, including creating, updating, retrieving, and deleting standings. It leverages MongoDB, a NoSQL database, to store competition data and interacts with the `api.football-data.org` API to fetch real-time competition standings.

## Features

- **Create Standings**: Add new standings for different competitions by fetching data from the `api.football-data.org`.
- **Retrieve Standings**: Get the current standings of a specific competition by its code.
- **Update Standings**: Update the standings data for a competition.
- **Delete Standings**: Remove a competition's standings from the database.
- **Error Handling**: Proper error responses for non-existent competition codes or when requested data already exists.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB setup locally or remotely.
- An API key from `api.football-data.org`.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/<your-username>/football-league-standings-backend.git
    ```

2. Navigate into the project directory:
    ```bash
    cd football-league-standings-backend
    ```

3. Install dependencies:
    ```baash
    npm install
    ```

4. Create a .env file in the root directory and add your MongoDB connection string and api.football-data.org API key:
    ```bash
    MONGO_URI=<your_mongodb_connection_string>FOOTBALL_API_KEY=<your_api_football_data_org_key>
    ```
5. Start the server:
    ```bash
    npm start
    ```

### API Endpoints
- POST /standings/:code: Create a new standing with the competition code.
- GET /standings/:code: Retrieve the standing by the competition code.
- PUT /standings/:code: Update the standing by the competition code.
- DELETE /standings/:code: Delete the standing by the competition code.

### Running Tests
Ensure you have a separate test database and set NODE_ENV to test to avoid using the production or development database. Run tests using:
```bash
npm test
```

### Deployment
Coming soon...

### Built With
- Node.js - The JavaScript runtime environment.
- MongoDB - The NoSQL database used.
- Express.js - The web application framework.

### Contributing
- Please read [CONTRIBUTING.md]() for details on our code of conduct and the process for submitting pull requests.

### License
- This project is licensed under the MIT License - see the [LICENSE.md]() file for details.

### Acknowledgments
