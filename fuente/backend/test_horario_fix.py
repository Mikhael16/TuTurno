#!/usr/bin/env python3
"""
Script de prueba para verificar que el endpoint /api/horario-cursos funciona correctamente
"""

import requests
import json

def test_horario_cursos():
    """Prueba el endpoint horario-cursos con diferentes escenarios"""
    
    base_url = "http://localhost:8000"
    
    # Caso 1: Con nota del alumno
    print("=== Prueba 1: Con nota del alumno ===")
    try:
        response = requests.post(f"{base_url}/api/horario-cursos", 
                               json={
                                   "codigos": ["CS1100", "CS1101"],
                                   "periodo": "251",
                                   "nota_alumno": 12.5
                               })
        
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Total secciones: {data.get('resumen', {}).get('total_secciones', 0)}")
            print(f"Promedio probabilidad: {data.get('resumen', {}).get('promedio_probabilidad', 0)}")
            print(f"Secciones con probabilidad: {len([s for s in data.get('secciones', []) if s.get('probabilidad') is not None])}")
            print("✅ Prueba 1 exitosa")
        else:
            print(f"❌ Error: {response.text}")
    except Exception as e:
        print(f"❌ Error en prueba 1: {e}")
    
    print("\n" + "="*50 + "\n")
    
    # Caso 2: Sin nota del alumno
    print("=== Prueba 2: Sin nota del alumno ===")
    try:
        response = requests.post(f"{base_url}/api/horario-cursos", 
                               json={
                                   "codigos": ["CS1100", "CS1101"],
                                   "periodo": "251"
                               })
        
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Total secciones: {data.get('resumen', {}).get('total_secciones', 0)}")
            print(f"Promedio probabilidad: {data.get('resumen', {}).get('promedio_probabilidad', 0)}")
            print(f"Secciones con probabilidad: {len([s for s in data.get('secciones', []) if s.get('probabilidad') is not None])}")
            print("✅ Prueba 2 exitosa")
        else:
            print(f"❌ Error: {response.text}")
    except Exception as e:
        print(f"❌ Error en prueba 2: {e}")
    
    print("\n" + "="*50 + "\n")
    
    # Caso 3: Sin códigos de curso
    print("=== Prueba 3: Sin códigos de curso ===")
    try:
        response = requests.post(f"{base_url}/api/horario-cursos", 
                               json={
                                   "codigos": [],
                                   "periodo": "251",
                                   "nota_alumno": 12.5
                               })
        
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Respuesta: {data}")
            print("✅ Prueba 3 exitosa")
        else:
            print(f"❌ Error: {response.text}")
    except Exception as e:
        print(f"❌ Error en prueba 3: {e}")

if __name__ == "__main__":
    test_horario_cursos() 