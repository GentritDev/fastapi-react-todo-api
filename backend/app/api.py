from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

class TodoCreate(BaseModel):
    item: str

class TodoUpdate(BaseModel):
    item:str
class Todo(BaseModel):
    id: int
    item: str
todos: List[Todo] = [
    Todo(id=1, item = "Read a book."),
    Todo(id=2, item="Cycle around town,"),
]

@app.get("/", tags=["root"])
async def read_root():
    return {"message": "Welcome to your todo list."}

@app.get("/todo", tags=["todos"])
async def get_todos():
    return {"data": todos}

@app.post("/todo", tags=["todos"])
async def add_todo(payload: TodoCreate):
    new_id = max([t.id for t in todos], default=0) + 1
    new_todo = Todo(id=new_id, item = payload.item.strip())
    todos.append(new_todo)
    return {"data": new_todo, "message": "Todo added."}


@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: int, body: TodoUpdate):
    for i, todo in enumerate(todos):
        if todo.id == id:
            todos[i] = Todo(id=id, item=body.item.strip())
            return {"data": todos[i], "message": f"Todo with id {id} updated."}
    raise HTTPException(status_code=404, detail= f"Todo with id {id} not found.")

@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: int):
    for i, todo in enumerate(todos):
        if todo.id == id:
            deleted = todos.pop(i)
            return {"data": deleted, "message": f"Todo with id {id} removed."}
    raise HTTPException(status_code=404, detail=f"Todo with id {id} not found.")
