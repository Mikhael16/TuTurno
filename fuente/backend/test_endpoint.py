import requests
import json

# Probar el endpoint de prerrequisitos
base_url = "http://localhost:8000"

# Probar con diferentes cursos
cursos_test = ["BMA02", "BMA03", "FB202", "HU102"]

for curso in cursos_test:
    print(f"\n=== Probando curso: {curso} ===")
    
    # Sin filtro de carrera
    try:
        response = requests.get(f"{base_url}/api/prerequisitos-curso/{curso}")
        print(f"Sin filtro de carrera: {response.status_code}")
        print(f"Respuesta: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Con filtro de carrera I1
    try:
        response = requests.get(f"{base_url}/api/prerequisitos-curso/{curso}?carrera=i1")
        print(f"Con filtro I1: {response.status_code}")
        print(f"Respuesta: {response.json()}")
    except Exception as e:
        print(f"Error: {e}") 