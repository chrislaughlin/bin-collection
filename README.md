# Bin Collection

A playful Node.js web application that shows the next Belfast City Council bin collection for BT7 2HR.

## Getting Started

1. Install dependencies (none required beyond Node.js 18+ which provides the built-in `fetch`).
2. Start the server:
   ```bash
   npm start
   ```
3. Visit [http://localhost:3000](http://localhost:3000) and spin the bin to fetch the latest info.

## How it Works

- The server makes a POST request to the Belfast City Council bin collection endpoint with the provided payload.
- It parses the HTML response to find the “Type of bin” column and sends that to the frontend.
- The frontend presents the data with a comic, upbeat interface—complete with confetti and bin banter.
