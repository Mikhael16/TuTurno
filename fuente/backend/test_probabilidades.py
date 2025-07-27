#!/usr/bin/env python3
"""
Script de prueba para verificar las probabilidades de predicción
"""

import requests
import json

def test_prediccion_matricula():
    """Probar el endpoint de predicción de matrícula"""
    print("=== PRUEBA DE PREDICCIÓN DE MATRÍCULA ===")
    
    # Casos de prueba
    casos_prueba = [
        {
            "nota": 12.5,
            "codigo_curso": "MAT101",
            "ciclo": "2024-2",
            "profesor": "REYNA MONTEVERDE, TINO EDUARDO",
            "seccion": "01"
        },
        {
            "nota": 12.5,
            "codigo_curso": "MAT101", 
            "ciclo": "2024-2",
            "profesor": "MONDRAGON MONDRAGON MARGARITA DELICIA",
            "seccion": "02"
        },
        {
            "nota": 12.5,
            "codigo_curso": "MAT101",
            "ciclo": "2024-2", 
            "profesor": "PROFESOR NORMAL",
            "seccion": "03"
        },
        {
            "nota": 15.0,
            "codigo_curso": "MAT101",
            "ciclo": "2024-2",
            "profesor": "REYNA MONTEVERDE, TINO EDUARDO", 
            "seccion": "01"
        }
    ]
    
    for i, caso in enumerate(casos_prueba, 1):
        print(f"\n--- Caso {i} ---")
        print(f"Nota: {caso['nota']}")
        print(f"Profesor: {caso['profesor']}")
        print(f"Sección: {caso['seccion']}")
        
        try:
            response = requests.get('http://localhost:8000/api/prediccion-matricula', params=caso)
            if response.status_code == 200:
                data = response.json()
                print(f"Probabilidad: {data['probabilidad']}%")
                print(f"Resultado: {data['resultado']}")
                print(f"Demanda: {data['info_adicional']['profesor_demanda']}")
                print(f"Turno estimado: {data['info_adicional']['turno_estimado']}")
            else:
                print(f"Error: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Error de conexión: {e}")

def test_comparar_secciones():
    """Probar el endpoint de comparar secciones"""
    print("\n\n=== PRUEBA DE COMPARAR SECCIONES ===")
    
    casos_prueba = [
        {
            "codigo_curso": "MAT101",
            "ciclo": "2024-2",
            "nota_alumno": 12.5
        },
        {
            "codigo_curso": "MAT101", 
            "ciclo": "2024-2",
            "nota_alumno": 15.0
        }
    ]
    
    for i, caso in enumerate(casos_prueba, 1):
        print(f"\n--- Caso {i} ---")
        print(f"Curso: {caso['codigo_curso']}")
        print(f"Nota: {caso['nota_alumno']}")
        
        try:
            response = requests.get('http://localhost:8000/api/comparar-secciones', params=caso)
            if response.status_code == 200:
                data = response.json()
                print(f"Total secciones: {len(data)}")
                for j, seccion in enumerate(data, 1):
                    print(f"  Sección {j}:")
                    print(f"    Profesor: {seccion['nombre_profesor']}")
                    print(f"    Sección: {seccion['seccion']}")
                    print(f"    Probabilidad: {seccion['porcentaje']}%")
                    print(f"    Demanda: {seccion['profesor_demanda']}")
                    print(f"    Turno estimado: {seccion['turno_estimado']}")
            else:
                print(f"Error: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Error de conexión: {e}")

if __name__ == "__main__":
    print("Iniciando pruebas de probabilidades...")
    test_prediccion_matricula()
    test_comparar_secciones()
    print("\n=== PRUEBAS COMPLETADAS ===") 