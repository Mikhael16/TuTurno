from sqlalchemy import create_engine, text
from database import SQLALCHEMY_DATABASE_URL

# Crear conexión
engine = create_engine(SQLALCHEMY_DATABASE_URL)

print("=== VERIFICACIÓN DE DATOS DE PRERREQUISITOS ===\n")

with engine.connect() as conn:
    # 1. Verificar estructura de la tabla
    print("1. ESTRUCTURA DE LA TABLA:")
    result = conn.execute(text("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'cursoprerrequisito' 
        ORDER BY ordinal_position
    """))
    for row in result:
        print(f"  {row.column_name}: {row.data_type} (nullable: {row.is_nullable})")
    
    print("\n" + "="*50 + "\n")
    
    # 2. Verificar registros de ejemplo
    print("2. REGISTROS DE EJEMPLO:")
    result = conn.execute(text("""
        SELECT codigo_curso, codigoprerrequisito_1, codigoprerrequisito_2, codigoprerrequisito_3, carrera
        FROM cursoprerrequisito 
        LIMIT 10
    """))
    for row in result:
        print(f"  {row.codigo_curso} -> {row.codigoprerrequisito_1}, {row.codigoprerrequisito_2}, {row.codigoprerrequisito_3} [{row.carrera}]")
    
    print("\n" + "="*50 + "\n")
    
    # 3. Contar por carrera
    print("3. CONTEO POR CARRERA:")
    result = conn.execute(text("""
        SELECT carrera, COUNT(*) as total_registros
        FROM cursoprerrequisito 
        GROUP BY carrera
        ORDER BY carrera
    """))
    for row in result:
        print(f"  {row.carrera}: {row.total_registros} registros")
    
    print("\n" + "="*50 + "\n")
    
    # 4. Buscar cursos con prerrequisitos específicos
    print("4. CURSOS CON PRERREQUISITOS:")
    result = conn.execute(text("""
        SELECT cp.codigo_curso, cp.carrera, cp.codigoprerrequisito_1, c1.nombre as nombre_prereq_1
        FROM cursoprerrequisito cp
        LEFT JOIN curso c1 ON cp.codigoprerrequisito_1 = c1.codigo
        WHERE cp.codigoprerrequisito_1 IS NOT NULL
        ORDER BY cp.codigo_curso
        LIMIT 5
    """))
    for row in result:
        print(f"  {row.codigo_curso} [{row.carrera}] -> {row.codigoprerrequisito_1} ({row.nombre_prereq_1})")
    
    print("\n" + "="*50 + "\n")
    
    # 5. Probar consulta específica (igual al endpoint)
    print("5. PRUEBA CON BMA02 (sin filtro de carrera):")
    result = conn.execute(text("""
        SELECT cp.codigoprerrequisito_1, cp.codigoprerrequisito_2, cp.codigoprerrequisito_3, cp.carrera,
               c1.nombre as nombre_prereq_1, c2.nombre as nombre_prereq_2, c3.nombre as nombre_prereq_3
        FROM cursoprerrequisito cp
        LEFT JOIN curso c1 ON cp.codigoprerrequisito_1 = c1.codigo
        LEFT JOIN curso c2 ON cp.codigoprerrequisito_2 = c2.codigo
        LEFT JOIN curso c3 ON cp.codigoprerrequisito_3 = c3.codigo
        WHERE cp.codigo_curso = 'BMA02'
    """))
    for row in result:
        print(f"  Carrera: {row.carrera}")
        if row.codigoprerrequisito_1:
            print(f"    Prereq 1: {row.codigoprerrequisito_1} - {row.nombre_prereq_1}")
        if row.codigoprerrequisito_2:
            print(f"    Prereq 2: {row.codigoprerrequisito_2} - {row.nombre_prereq_2}")
        if row.codigoprerrequisito_3:
            print(f"    Prereq 3: {row.codigoprerrequisito_3} - {row.nombre_prereq_3}")
    
    print("\n" + "="*50 + "\n")
    
    # 6. Probar con filtro de carrera
    print("6. PRUEBA CON BMA02 Y FILTRO I1:")
    result = conn.execute(text("""
        SELECT cp.codigoprerrequisito_1, cp.codigoprerrequisito_2, cp.codigoprerrequisito_3, cp.carrera,
               c1.nombre as nombre_prereq_1, c2.nombre as nombre_prereq_2, c3.nombre as nombre_prereq_3
        FROM cursoprerrequisito cp
        LEFT JOIN curso c1 ON cp.codigoprerrequisito_1 = c1.codigo
        LEFT JOIN curso c2 ON cp.codigoprerrequisito_2 = c2.codigo
        LEFT JOIN curso c3 ON cp.codigoprerrequisito_3 = c3.codigo
        WHERE cp.codigo_curso = 'BMA02' AND cp.carrera = 'I1'
    """))
    for row in result:
        print(f"  Carrera: {row.carrera}")
        if row.codigoprerrequisito_1:
            print(f"    Prereq 1: {row.codigoprerrequisito_1} - {row.nombre_prereq_1}")
        if row.codigoprerrequisito_2:
            print(f"    Prereq 2: {row.codigoprerrequisito_2} - {row.nombre_prereq_2}")
        if row.codigoprerrequisito_3:
            print(f"    Prereq 3: {row.codigoprerrequisito_3} - {row.nombre_prereq_3}") 