from fastapi import FastAPI, HTTPException, Depends
from database import engine, Base
from crud import conference_crud
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",  # Adicione aqui outras origens permitidas
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(conference_crud.router, tags=['Conference'])