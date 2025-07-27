from sqlalchemy import create_engine, text
from database import SQLALCHEMY_DATABASE_URL

# Crear conexión
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Verificar datos en cursoprerrequisito
with engine.connect() as conn:
    # Verificar si la tabla existe
    result = conn.execute(text("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'cursoprerrequisito'
        );
    """))
    table_exists = result.scalar()
    print(f"¿Existe la tabla cursoprerrequisito? {table_exists}")
    
    if table_exists:
        # Contar registros
        result = conn.execute(text("SELECT COUNT(*) FROM cursoprerrequisito"))
        count = result.scalar()
        print(f"Total de registros en cursoprerrequisito: {count}")
        
        # Mostrar algunos registros de ejemplo
        if count > 0:
            result = conn.execute(text("SELECT * FROM cursoprerrequisito LIMIT 5"))
            print("\nPrimeros 5 registros:")
            for row in result:
                print(f"  {row}")
        else:
            print("La tabla está vacía")
            
        # Verificar cursos disponibles
        result = conn.execute(text("SELECT codigo, nombre FROM curso LIMIT 5"))
        print("\nAlgunos cursos disponibles:")
        for row in result:
            print(f"  {row.codigo} - {row.nombre}") 