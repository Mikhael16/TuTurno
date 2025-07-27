#!/usr/bin/env python3
"""
Script para probar los endpoints del modelo de predicción
"""

import requests
import json

def test_model_endpoints():
    """Probar los endpoints del modelo de predicción"""
    base_url = "http://localhost:8000"
    
    print("=== PRUEBA DE ENDPOINTS DEL MODELO DE PREDICCIÓN ===")
    
    # 1. Probar estado del modelo
    print("\n1. Verificando estado del modelo...")
    try:
        response = requests.get(f"{base_url}/api/modelo-estado")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Estado del modelo: {data}")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Error de conexión: {e}")
        return
    
    # 2. Probar predicción individual
    print("\n2. Probando predicción individual...")
    try:
        params = {
            "codigo_curso": "SI505",
            "nombre_profesor": "REYNA MONTEVERDE, TINO EDUARDO",
            "num_vacantes": 40
        }
        
        response = requests.get(f"{base_url}/api/prediccion-matriculados", params=params)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Predicción exitosa:")
            prediccion = data.get('prediccion', {})
            print(f"   Curso: {prediccion.get('codigo_curso')}")
            print(f"   Profesor: {prediccion.get('nombre_profesor')}")
            print(f"   Vacantes: {prediccion.get('num_vacantes')}")
            print(f"   Probabilidad: {prediccion.get('probabilidad_porcentaje', 0):.2f}%")
            print(f"   Matriculados estimados: {prediccion.get('matriculados_estimados', 0)}")
            print(f"   Intervalo: {prediccion.get('intervalo_inferior', 0):.2f}% - {prediccion.get('intervalo_superior', 0):.2f}%")
            print(f"   Tipo de modelo: {prediccion.get('tipo_modelo', 'N/A')}")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Error en predicción individual: {e}")
    
    # 3. Probar predicción múltiple
    print("\n3. Probando predicción múltiple...")
    try:
        secciones = [
            {
                "codigo_curso": "SI505",
                "profesor": "REYNA MONTEVERDE, TINO EDUARDO",
                "vacantes": 40
            },
            {
                "codigo_curso": "MAT101",
                "profesor": "MONDRAGON MONDRAGON MARGARITA DELICIA",
                "vacantes": 35
            },
            {
                "codigo_curso": "FIS101",
                "profesor": "ACOSTA DE LA CRUZ, PEDRO RAUL",
                "vacantes": 45
            }
        ]
        
        response = requests.post(f"{base_url}/api/prediccion-multiple-secciones", json=secciones)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Predicción múltiple exitosa:")
            print(f"   Total secciones: {data.get('total_secciones', 0)}")
            print(f"   Predicciones exitosas: {data.get('predicciones_exitosas', 0)}")
            
            predicciones = data.get('predicciones', [])
            for i, pred in enumerate(predicciones, 1):
                print(f"   {i}. {pred.get('codigo_curso')} - {pred.get('nombre_profesor')}")
                print(f"      Probabilidad: {pred.get('probabilidad_porcentaje', 0):.2f}%")
                print(f"      Matriculados: {pred.get('matriculados_estimados', 0)}")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Error en predicción múltiple: {e}")
    
    # 4. Probar casos edge
    print("\n4. Probando casos edge...")
    
    # Caso con profesor no conocido
    try:
        params = {
            "codigo_curso": "SI505",
            "nombre_profesor": "PROFESOR DESCONOCIDO",
            "num_vacantes": 30
        }
        
        response = requests.get(f"{base_url}/api/prediccion-matriculados", params=params)
        
        if response.status_code == 200:
            data = response.json()
            prediccion = data.get('prediccion', {})
            print(f"✅ Profesor desconocido - Probabilidad: {prediccion.get('probabilidad_porcentaje', 0):.2f}%")
        else:
            print(f"❌ Error con profesor desconocido: {response.status_code}")
    except Exception as e:
        print(f"❌ Error en caso edge: {e}")
    
    print("\n=== PRUEBAS COMPLETADAS ===")

if __name__ == "__main__":
    test_model_endpoints() 