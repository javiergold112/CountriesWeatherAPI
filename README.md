# Countries Explorer Application with Weather Integration

A React-based single-page application that displays data about countries and provides real-time weather information for each country's capital city. The app integrates both the **Countries GraphQL API** and **OpenWeatherMap API** to showcase country details and weather data.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Challenges Faced](#challenges-faced)
- [Future Enhancements](#future-enhancements)

## Features

1. **Country Search**:  
   - Search countries by name.
   - Displays matching countries with essential details: country name, capital, region, and flag.

2. **Country Details with Weather Information**:  
   - Shows detailed information like languages, currencies, population, neighboring countries, and time zones.
   - Displays real-time weather data for the capital city, including temperature, weather conditions, and an icon.

3. **Filter and Sort**:  
   - Filter countries by region or language.
   - Sort the list of countries by name, population, or area.

4. **Responsivity**:  
   - Fully responsive layout for mobile, tablet, and desktop devices.

## Tech Stack

- **Frontend**: React, TypeScript, CSS, Styled Components
- **GraphQL**: Apollo Client for querying data from the **Countries GraphQL API**
- **REST API**: Fetches weather data from the **OpenWeatherMap API**
- **Testing**: React Testing Library, Jest
- **Build Tool**: Vite/Webpack
- **Version Control**: GitHub/GitLab

## Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher) and **npm**.
2. A free API key from [OpenWeatherMap API](https://openweathermap.org/). 

### Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>

2. **Install Dependencies**:
   ```bash
   npm install

3. **Set up Environment Variables**:
   - Create a .env file in the project root.
   - Add your OpenWeatherMap API key.
   
4. **Run the Application**:
   ```bash
   npm start

### Testing
  
  - To run tests, execute:
      ```bash
      npm test

### Usage

1. **Searching for Countries**: Use the search bar on the homepage to find countries by name.
2. **Viewing Country Details**: Click on a country card to view more details, including the weather.
3. **Filtering/Sorting**: Use the filter dropdown to filter countries by region or language. Use the sort option to arrange countries by name, population, or area.

### Challenges Faced

  - **API Rate Limiting**:
    Implemented error handling for API rate limits to notify users if the weather data cannot be fetched due to API restrictions.
  - **Integrating GraphQL and REST APIs**:
    Combining data from both GraphQL (Countries API) and REST (OpenWeatherMap) required careful asynchronous handling and state management.

### Future Enhancements

1. **Caching**: Use a caching strategy for API responses to improve performance.
2. **Pagination**: Implement pagination for the list of countries.
3. **Improved Error Handling**: Add user-friendly messages for different types of errors (e.g., network failures, invalid API responses).