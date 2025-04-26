# React + FastAPI Boilerplate

This is a boilerplate project that combines React.js for the frontend and FastAPI for the backend.

## Project Structure

```
.
├── frontend/          # React.js frontend application
└── backend/          # FastAPI backend application
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

## Features

- React.js frontend with modern tooling
- FastAPI backend with automatic API documentation
- CORS enabled for local development
- Hot reloading for both frontend and backend
- TypeScript support
- Modern project structure 