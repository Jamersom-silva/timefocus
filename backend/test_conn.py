# Exemplo mínimo com asyncpg
import asyncio
import asyncpg

async def test_conn():
    conn = await asyncpg.connect(
        user="timefocus_user",
        password="SUA_SENHA",
        database="timefocus_db",
        host="127.0.0.1",  # obrigatório, funciona no Windows
        port=5432,
        ssl=None            # evita problemas de SSL
    )
    print("Conectado com sucesso!")
    await conn.close()

asyncio.run(test_conn())
