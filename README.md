# ETL University Data Process

This project implements an ETL (Extract, Transform, Load) process to ingest university data from a public API, store it locally, and provide a CSV download via a separate API endpoint.

## Table of Contents

- [Features](#features)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [ETL Process Details](#etl-process-details)
- [How to Test the Project](#how-to-test-the-project)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- **Extract**: Fetches university data from a configurable API endpoint (defaulting to a test API for consistency during development, but can be switched to the original).
- **Transform**: Processes fetched data, ensuring correct typing and removing unnecessary fields.
- **Load**: Stores the transformed data into a local JSON file (`data/universities.json`).
- **Scheduled Refresh**: Automatically refreshes data daily at midnight UTC. An initial ETL run occurs on server startup.
- **CSV Download API**: Provides an endpoint to download the stored university data as a CSV file.
- **Robust Error Handling**: Implements comprehensive logging for better debugging and operational insights.

## Technical Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **Axios**: Promise-based HTTP client for API requests.
- **CSV-Stringify**: Library for converting data to CSV format.
- **Node-Cron**: For scheduling the daily data refresh.
- **Dotenv**: For managing environment variables.
- **Winston**: For robust logging.
- **Nodemon**: (Development) For automatic server restarts during development.

## Project Structure

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/YOUR_USERNAME/etl-university-data.git](https://github.com/YOUR_USERNAME/etl-university-data.git)
    cd etl-university-data
    ```

2.  Install the dependencies for the **main project**:

    ```bash
    npm install
    ```

3.  Navigate into the `test-api` directory and install its dependencies:

    ```bash
    cd test-api
    npm install
    cd .. # Go back to the root directory
    ```

4.  Create a `.env` file in the **root directory** of the project and populate it with the required environment variables.

    ```
    PORT=3000
    # For testing, point to your dummy API:
    UNIVERSITY_DATA_API_URL=http://localhost:3000/data
    ```

### Running the Application

To run the full setup for testing, you need to run both the dummy API and the main ETL application concurrently.

1.  **Start the Dummy API (in a separate terminal window/tab):**
    Open a new terminal window/tab, navigate to the **root directory** of the project, and then run:

    ```bash
    cd test-api
    npm run dev
    # This will start the dummy API on port 3001
    ```

    _Ensure this terminal remains open and the dummy API is running._

2.  **Start the Main ETL Application (in another terminal window/tab):**
    Open _another_ new terminal window/tab, navigate to the **root directory** of the project, and run:

    ```bash
    npm run dev
    # This will start the main ETL application on port 3000
    ```

    _Ensure this terminal remains open and the main application is running._

The main ETL application will run on the port specified in your `.env` file (default: `http://localhost:3000`).
Upon startup, the main application will immediately perform an ETL run, fetching data from your dummy API.

- **Production Mode (for main app):**
  ```bash
  npm start
  ```

## API Endpoints

- **GET `/api/etl/download-csv`**:
  Downloads the currently stored university data as a CSV file.

  **Example Usage:** `http://localhost:3000/api/etl/download-csv`

## ETL Process Details

The data is initially extracted and loaded when the main server starts. Subsequently, it refreshes automatically at midnight UTC every day via a scheduled cron job.

## How to Test the Project

To thoroughly test the project, follow these steps:

1.  **Ensure Both Servers are Running:**

    - Confirm the dummy API is running on `http://localhost:3001`.
    - Confirm the main ETL app is running on `http://localhost:3000`.

2.  **Verify Initial Data Load:**

    - After the main app starts, check your terminal logs. You should see messages from the `logger` indicating "Starting ETL process...", "Data extraction successful.", and "Data loading successful."
    - Verify that a file named `universities.json` has been created or updated in the `data/` directory of your main project. Open this file to see the initially loaded data.

3.  **Download the CSV File:**

    - Open your web browser and navigate to:
      `http://localhost:3000/api/etl/download-csv`
    - Your browser should prompt you to download `universities.csv`.
    - Open the downloaded CSV file to verify that it contains the data you saw in `data/universities.json` and is correctly formatted.

## Future Enhancements

- **Database Integration**: Implement a robust database (e.g., PostgreSQL, MongoDB) to store the data instead of a flat file. This would allow for more complex querying, indexing, and better data integrity.
  - **Upsert Logic**: When moving to a database, implement upsert operations to handle new data and updates to existing entries, preventing duplicates.
- **Data Validation**: More rigorous schema validation on extracted data beyond basic type checks.
- **Error Handling and Retries**: Implement exponential backoff for API retries in the `extract` step to handle temporary network issues gracefully.
- **Monitoring and Alerting**: Integrate with monitoring tools (e.g., Prometheus, Grafana) to track ETL job status and send alerts on failures.
- **Authentication/Authorization**: Secure API endpoints if exposed publicly.
- **Pagination for large datasets**: Handle API responses that might be paginated, fetching all available data.
- **Containerization**: Dockerize the application for easier deployment and consistent environments.
- **Testing Framework**: Add unit and integration tests using frameworks like Jest or Mocha.
- **Manual ETL Trigger**: Add a dedicated API endpoint (e.g., `POST /api/etl/run`) to manually trigger the ETL process for testing or on-demand updates.
- **Dynamic Country Query**
