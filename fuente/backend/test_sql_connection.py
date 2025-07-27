import psycopg2

# Parámetros de conexión
conn = psycopg2.connect(
    host="localhost",
    port=5433,
    database="prueba_db",
    user="postgres",
    password="123456"
)
abc = "SELECT * FROM public.curso"
try:
    with conn.cursor() as cur:
        cur.execute(abc)
        rows = cur.fetchall()
        print("Resultados de la tabla curso:")
        for row in rows:
            print(row)
finally:
    conn.close() 