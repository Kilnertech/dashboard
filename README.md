# Kilner.Tech Dashboard

The Kilner.Tech Dashboard is built using React and MUI, allowing users to manage agents, tasks, and queries in an intuitive interface. This project enables tracking multiple agents and their assigned queries and shows data feeds and grade sheets for deeper analysis. The dashboard offers customizable filters, tables, and data management, all fully integrated with backend APIs.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Running Locally](#running-locally)
- [Deploying to Google Cloud](#deploying-to-google-cloud)


## Features
1. **Admin**: Manage agents and tasks through an intuitive interface.

    - Admins can add agents, each tied to multiple tasks.
    - Agents are saved in the `admin.prompts` table, while their corresponding queries are stored in `admin.queries`. **IMPORTANT** Deleting an agent cascades the removal of associated queries and results. Removing a query also deletes its results in the backend.
2. **Identikit Table**: Displays a sortable list of MPs in Parliament. Filter by term and sort data as needed.
3. **Feed**: Displays a detailed feed for each agent-query combination. Apply various filters to customize the displayed data.
4. **Grade Sheets**: For each agent-query combination, view comprehensive grade sheets for MPs. Organized and easy-to-navigate grading data.

## Project Structure

The core dashboard components are organized under the `src/layouts` folder, while subcomponents are housed in the `src/customizedComponents` folder. A more refined organization is encouraged for future improvements.

`src/api` contains utilities for API interactions.
Ensure the **firebaseConfig.js** file is placed within this directory for proper Firebase setup.

## Running Locally

To run the dashboard locally:

1. Install dependencies by running `npm install` or `yarn install`.
2. Start the development server running `npm start`.

## Deploying to Google Cloud

To deploy the dashboard to Google Cloud via Docker:


1. Run the `run_docker_google.sh` to deploy:
2. This will create a Docker image and push it to Google Container Registry (GCR).



