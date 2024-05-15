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
async def get_user():
    conexao = create_connection()
    cursor = conexao.cursor()

    startup()

    cursor.execute("SELECT * FROM usuario")
    resultados = cursor.fetchall()

    usuarios = []
    for r in resultados:
        usuario = {
            "nome": r[0],
            "email": r[1],
            'login': r[2],
            'senha': r[3]
        }
        usuarios.append(usuario)
    
    return usuarios

@app.get('/usuarios/{login}')
async def get_user_by_id(login: str):
    connection = create_connection()
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM usuario WHERE login = %s;', (login,))
    item = cursor.fetchone()

    cursor.close()

    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.post("/usuarios")
async def create_user(nome: str, email: str, login: str, senha: str):
    conexao = create_connection()
    cursor = conexao.cursor()

    cursor.execute("INSERT INTO usuario (nome, email, login, senha) VALUES (%s, %s, %s, %s)", (nome, email, login, senha))
    conexao.commit()

    return {"mensagem": "Usuário criado com sucesso"}

@app.put('/usuarios')
async def update_user(senha:str, login:str):
    conexao= create_connection()
    cursor = conexao.cursor()

    cursor.execute('UPDATE usuario SET senha = %s WHERE login = %s;', (senha, login))
    conexao.commit()

    cursor.close()

@app.delete("/usuarios")
async def delete_user(login: str):
    conexao = create_connection()
    cursor = conexao.cursor()
    
    cursor.execute('DELETE FROM usuario WHERE login = %s;', (login,))
    conexao.commit()

    cursor.close()

    #---------------------------------------------------------------------------------
    #---------------------------------------------------------------------------------
    #---------------------------------------------------------------------------------

class Conference(BaseModel):
    store: str
    id_check: int
    sector: str
    date: str = None
    item_code: int
    ticket: str = None
    id_reason: int
    quantity: float
    value: float
    obs: str = None
    responsable: str = None
    login_user: str

@app.get("/conferences")
async def get_conference():
    conexao = create_connection()
    cursor = conexao.cursor()

    startup()

    cursor.execute("SELECT * FROM conference")
    resultados = cursor.fetchall()

    conferences = []
    for r in resultados:
        conference = {
            "id": r[0],
            "store": r[1],
            'id_check': r[2],
            'sector': r[3],
            'date': r[4],
            'item_code': r[5],
            'ticket': r[6],
            'id_reason': r[7],
            'quantity': r[8],
            'value': r[9],
            'obs': r[10],
            'responsable': r[11],
            'login_user': r[12],
        }
        conferences.append(conference)
    
    return conferences

@app.get('/conferences/{id}')
async def get_conf_by_id(id: int):
    connection = create_connection()
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM conference WHERE id = %s;', (id,))
    conf = cursor.fetchone()

    cursor.close()

    if conf is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return conf

@app.post("/conference")
async def create_conference(store: str, id_check: int, sector: str, date: str, item_code: int, ticket: str, id_reason: int,\
                            quantity: float, value: float, obs: str, responsable: str, login_user: str,
):
    connection = create_connection()
    cursor = connection.cursor()
    insert_query = '''INSERT INTO conference (store, id_check, sector, date, item_code, ticket, id_reason, quantity, value, obs, responsable, login_user) 
                      VALUES (%s, %s, %s, CURRENT_TIMESTAMP, %s, %s, %s, %s, %s, %s, %s, %s);'''
    cursor.execute(insert_query, (store, id_check, sector, item_code, ticket, id_reason, quantity, value, obs, responsable, login_user))
    connection.commit()
    cursor.close()

'''@app.put('/usuarios')
async def update_user(senha:str, login:str):
    conexao= create_connection()
    cursor = conexao.cursor()

    cursor.execute('UPDATE usuario SET senha = %s WHERE login = %s;', (senha, login))
    conexao.commit()

    cursor.close()'''

@app.delete("/conferences")
async def delete_conf(id: int):
    conexao = create_connection()
    cursor = conexao.cursor()
    
    cursor.execute('DELETE FROM conference WHERE id = %s;', (id,))
    conexao.commit()

    cursor.close()