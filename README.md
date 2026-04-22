# FastAPI Todo API + React Client

A full-stack Todo CRUD application with a **FastAPI backend** and a React frontend.

## Tech Stack

### Backend (Primary Focus)
- FastAPI
- Uvicorn
- Pydantic
- CORS Middleware

### Frontend
- React (Vite + TypeScript)
- Chakra UI

---

## Features

### FastAPI API
- `GET /` health/welcome route
- `GET /todo` list all todos
- `POST /todo` create a todo
- `PUT /todo/{id}` update a todo
- `DELETE /todo/{id}` delete a todo
- Input validation with Pydantic
- Proper HTTP error responses (400/404)
- CORS enabled for local frontend integration

### Frontend
- View todo list
- Add todo
- Update todo
- Delete todo

---

## Project Structure

```text
fastapi-react-todo-api/
├─ backend/
│  ├─ main.py
│  ├─ requirements.txt
│  └─ app/
│     ├─ __init__.py
│     └─ api.py
└─ frontend/
   ├─ src/
   └─ package.json
```

---

## Backend Setup (FastAPI)

### 1) Go to backend folder
```bash
cd backend
```

### 2) Create virtual environment
```bash
python -m venv venv
```

### 3) Activate venv

**Windows (PowerShell):**
```bash
.\venv\Scripts\Activate.ps1
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4) Install dependencies
```bash
pip install -r requirements.txt
```

### 5) Run API
```bash
python main.py
```

API runs on: `http://localhost:8000`

Interactive docs:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## API Examples

### GET all todos
```bash
curl http://localhost:8000/todo
```

### Create todo
```bash
curl -X POST http://localhost:8000/todo \
  -H "Content-Type: application/json" \
  -d "{\"item\":\"Build a production-ready FastAPI app\"}"
```

### Update todo
```bash
curl -X PUT http://localhost:8000/todo/1 \
  -H "Content-Type: application/json" \
  -d "{\"item\":\"Updated todo text\"}"
```

### Delete todo
```bash
curl -X DELETE http://localhost:8000/todo/1
```

---

## Notes

- Current data storage is in-memory (Python list), so data resets when server restarts.
- Next production step: replace in-memory storage with PostgreSQL + SQLAlchemy.

---

## Roadmap (Production Upgrade)

- [ ] PostgreSQL integration
- [ ] SQLAlchemy models + Alembic migrations
- [ ] JWT authentication
- [ ] Pytest API test suite
- [ ] Docker + docker-compose
- [ ] Deployment (Render/Railway for backend, Vercel for frontend)

---

## Author

- GitHub: [@GentritSE](https://github.com/GentritSE)
