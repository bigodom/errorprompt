from fastapi import FastAPI
from database import create_connection

app = FastAPI()

async def startup():
    conexao = create_connection()
    if conexao:
        app.state.conexao = conexao


async def shutdown():
    conexao = app.state.conexao
    if conexao:
        conexao.close()

app.add_event_handler("startup", startup)
app.add_event_handler("shutdown", shutdown)

@app.get("/usuarios")
async def listar_usuarios():
    conexao = app.state.conexao
    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM usuario")
    resultados = cursor.fetchall()

    usuarios = []
    for r in resultados:
        usuario = {
            "id": r[0],
            "nome": r[1],
            "email": r[2]
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
