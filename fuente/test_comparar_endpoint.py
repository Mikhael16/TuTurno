import requests
import json

# URL del endpoint de comparación
url = "http://localhost:8000/api/comparar-secciones"

# Parámetros de prueba
params = {
    "codigo_curso": "SI505",
    "ciclo": "241"
}

try:
    print("Probando endpoint de comparación de secciones...")
    print(f"URL: {url}")
    print(f"Parámetros: {params}")
    
    response = requests.get(url, params=params)
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\nSecciones encontradas: {len(data)}")
        
        if len(data) > 0:
            print("\nPrimera sección:")
            primera_seccion = data[0]
            print(f"  Curso: {primera_seccion.get('codigo_curso')}")
            print(f"  Profesor: {primera_seccion.get('nombre_profesor')}")
            print(f"  Sección: {primera_seccion.get('seccion')}")
            
            # Probar predicción para el primer profesor
            print("\nProbando predicción para el primer profesor...")
            prediccion_url = "http://localhost:8000/api/prediccion-probabilidad-alumno"
            prediccion_params = {
                "codigo_curso": primera_seccion.get('codigo_curso'),
                "nombre_profesor": primera_seccion.get('nombre_profesor'),
                "promedio": 12.7
            }
            
            prediccion_response = requests.get(prediccion_url, params=prediccion_params)
            
            if prediccion_response.status_code == 200:
                prediccion_data = prediccion_response.json()
                print("✅ Predicción exitosa:")
                print(f"  Probabilidad: {prediccion_data.get('probabilidad')}%")
                print(f"  Nivel: {prediccion_data.get('nivel')}")
                print(f"  Color: {prediccion_data.get('color')}")
            else:
                print(f"❌ Error en predicción: {prediccion_response.status_code}")
                print(f"  Response: {prediccion_response.text}")
    else:
        print(f"❌ Error en comparación: {response.status_code}")
        print(f"  Response: {response.text}")
        
except Exception as e:
    print(f"Error: {e}") 