# Bin Collection

A playful Next.js application that shows the next Belfast City Council bin collection for BT7 2HR.

The page is rendered with a server component that fetches the council data on each request, so the
UI is always filled with the freshest bin gossip.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to meet your next bin buddy.

## Production Build

To create an optimised build and run it locally:

```bash
npm run build
npm run start
```

## How it Works

- The server component uses `fetch` to POST to the Belfast City Council bin collection endpoint.
- The HTML response is parsed on the server to locate the “Type of bin” entry.
- The rendered page presents the result with a cheerful UI and a simple refresh action that
  re-renders the server component.
