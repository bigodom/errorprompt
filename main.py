from fastapi import FastAPI, HTTPException
from database import create_connection
from pydantic import BaseModel
from models import startup

app = FastAPI()



'''async def shutdown():
    conexao = app.state.conexao
    if conexao:
        conexao.close()'''

@app.get("/usuarios")
async def listar_usuarios():
    startup()
    conexao = create_connection()
    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM usuario")
    resultados = cursor.fetchall()

    usuarios = []
    for r in resultados:
        usuario = {
            "nome": r[0],
            "email": r[1],
            'login': r[2]
        }
        usuarios.append(usuario)
    
    return usuarios

@app.post("/usuarios")
async def criar_usuario(nome: str, email: str, login: str, senha: str):
    conexao = app.state.conexao
    cursor = conexao.cursor()

    cursor.execute("INSERT INTO usuario (nome, email, login, senha) VALUES (%s, %s, %s, %s)", (nome, email, login, senha))
    conexao.commit()

    return {"mensagem": "Usuário criado com sucesso"}
