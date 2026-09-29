# Shardize-Client

The frontend web application for **Shardize**, a decentralized cloud storage platform built on IPFS. This is the actual product — where users register, log in, and manage their storage or node activity — as opposed to the standalone [landing/explainer page](https://github.com/07Ishika/shardize-landing).

## What This Project Is

A React + Vite single-page application providing:
- **Authentication** — Login and Register pages
- **Protected routing** — app routes accessible only to authenticated users
- **Dark theme** UI
- **Network diagram views** for visualizing storage nodes and file distribution

## Tech Stack

- React 18
- Vite

## Setup Instructions

**1. Clone the repository**
```bash
git clone https://github.com/07Ishika/Shardize-Client.git
cd Shardize-Client
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the dev server**
```bash
npm run dev
```
The app will run at `http://localhost:5173/`.

## Notes

- This app is built independently and connects to a Django + IPFS backend developed by a teammate.

## Related Repositories

- [shardize-landing](https://github.com/07Ishika/shardize-landing) — standalone marketing/explainer page
- [decentralized-storage](https://github.com/meetrshah2112/decentralized-storage) — Django + IPFS backend and node agent, developed by a teammate

## Live Preview

[View UI on AWS S3](http://shardize-bucket.s3-website.ap-south-1.amazonaws.com/)

> Note: This is a static deployment of the login/signup UI for demonstration purposes. Authentication is not yet connected to a live backend.
## Status

Final year project, in progress.
