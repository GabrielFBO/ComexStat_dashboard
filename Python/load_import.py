import pandas as pd

from connect import get_connection

conn = get_connection()
cursor = conn.cursor()

# Lê o CSV
df = pd.read_csv("data/raw/Imp.csv")

# Converte DataFrame para lista de tuplas
dados = list(
    df.itertuples(index=False, name=None)
)

# Query SQL
query = """
INSERT INTO importation
(year, month, country_name, usd_value)
VALUES (%d, %s, %s, %d)
"""
cursor.execute("TRUNCATE TABLE importation")
# Executa inserção em lote
cursor.executemany(query, dados)

# Confirma transação
conn.commit()

# Fecha recursos
cursor.close()
conn.close()

print(f"{len(dados)} registros inseridos com sucesso.")