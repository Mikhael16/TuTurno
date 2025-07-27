import requests
import json

# URL del endpoint
url = "http://localhost:8000/api/prediccion-matriculados-finales"

# Parámetros de prueba
params = {
    "codigo_curso": "SI505",
    "nombre_profesor": "CABALLERO ORTIZ, JOSE ALBERTO",
    "num_vacantes": 32
}

try:
    print("Probando endpoint de predicción de matriculados...")
    print(f"URL: {url}")
    print(f"Parámetros: {params}")
    
    response = requests.get(url, params=params)
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        data = response.json()
        print("\nPredicción exitosa:")
        print(f"Curso: {data.get('curso')}")
        print(f"Profesor: {data.get('profesor')}")
        print(f"Vacantes: {data.get('vacantes')}")
        print(f"Predicción: {data.get('prediccion')}")
        print(f"Porcentaje de ocupación: {data.get('porcentaje_ocupacion')}%")
        print(f"Nivel de ocupación: {data.get('nivel_ocupacion')}")
    else:
        print("Error en la respuesta")
        
except Exception as e:
    print(f"Error: {e}") 