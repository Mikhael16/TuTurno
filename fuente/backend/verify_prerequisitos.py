from sqlalchemy import create_engine, text
from database import SQLALCHEMY_DATABASE_URL

# Crear conexión
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Verificar datos en cursoprerrequisito
with engine.connect() as conn:
    # Buscar un curso que tenga prerrequisitos
    result = conn.execute(text("""
        SELECT cp.codigo_curso, cp.codigoprerrequisito_1, cp.codigoprerrequisito_2, cp.codigoprerrequisito_3, cp.carrera,
               c1.nombre as nombre_prereq_1,
               c2.nombre as nombre_prereq_2,
               c3.nombre as nombre_prereq_3
        FROM cursoprerrequisito cp
        LEFT JOIN curso c1 ON cp.codigoprerrequisito_1 = c1.codigo
        LEFT JOIN curso c2 ON cp.codigoprerrequisito_2 = c2.codigo
        LEFT JOIN curso c3 ON cp.codigoprerrequisito_3 = c3.codigo
        WHERE cp.codigoprerrequisito_1 IS NOT NULL
        LIMIT 3
    """))
    
    print("Ejemplos de prerrequisitos en la base de datos:")
    for row in result:
        print(f"\nCurso: {row.codigo_curso}")
        print(f"Carrera: {row.carrera}")
        if row.codigoprerrequisito_1:
            print(f"  Prerrequisito 1: {row.codigoprerrequisito_1} - {row.nombre_prereq_1}")
        if row.codigoprerrequisito_2:
            print(f"  Prerrequisito 2: {row.codigoprerrequisito_2} - {row.nombre_prereq_2}")
        if row.codigoprerrequisito_3:
            print(f"  Prerrequisito 3: {row.codigoprerrequisito_3} - {row.nombre_prereq_3}") 