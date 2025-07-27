import requests
import json

# URL del endpoint
url = "http://localhost:8000/api/prediccion-probabilidad-alumno"

# Parámetros de prueba
params = {
    "codigo_curso": "SI505",
    "nombre_profesor": "CABALLERO ORTIZ, JOSE ALBERTO",
    "promedio": 12.7
}

try:
    print("Probando endpoint de predicción de probabilidad de alumno...")
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
        print(f"Promedio: {data.get('promedio')}")
        print(f"Probabilidad: {data.get('probabilidad')}%")
        print(f"Nivel: {data.get('nivel')}")
        print(f"Color: {data.get('color')}")
    else:
        print("Error en la respuesta")
        
except Exception as e:
    print(f"Error: {e}") 