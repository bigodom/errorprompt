from fastapi import FastAPI, HTTPException
from database import create_connection

async def startup():
    conexao = create_connection()
    cursor = conexao.cursor()

    cursor.execute('CREATE TABLE IF NOT EXISTS usuario\
                    (nome TEXT NOT NULL,\
                    email TEXT NOT NULL,\
                    login TEXT PRIMARY KEY,\
                    senha TEXT NOT NULL);')
    
    cursor.execute('''CREATE TABLE Conference
                    (id SERIAL PRIMARY KEY,
                    store TEXT NOT NULL,
                    id_check INTEGER NOT NULL,
                    sector TEXT NOT NULL,
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    item_code INTEGER NOT NULL,
                    ticket TEXT,
                    id_reason INTEGER NOT NULL,
                    quantity FLOAT NOT NULL,
                    value FLOAT NOT NULL,
                    obs TEXT,
                    responsable TEXT,
                    login_user TEXT NOT NULL);'''
                    )

    conexao.commit()
    cursor.close()
