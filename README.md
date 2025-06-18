# Backend Project with MongoDB

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and set your environment variables.
3. Start MongoDB (locally or with Docker Compose):
   ```bash
   docker-compose up
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Build and Run

```bash
npm run build
npm start
```

## API Endpoints
- `GET /api/users` - List users
- `POST /api/users` - Create user 