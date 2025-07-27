#!/usr/bin/env python3
"""
Script de prueba para verificar los endpoints de gestión de cruces
"""

import requests
import json
from datetime import datetime

# Configuración
BASE_URL = "http://localhost:8000"
HEADERS = {"Content-Type": "application/json"}

def test_endpoint(endpoint, params=None, method="GET"):
    """Función auxiliar para probar endpoints"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url, params=params, headers=HEADERS)
        elif method == "POST":
            response = requests.post(url, json=params, headers=HEADERS)
        
        print(f"\n{'='*60}")
        print(f"Probando: {method} {url}")
        if params:
            print(f"Parámetros: {params}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Respuesta exitosa:")
            print(json.dumps(data, indent=2, ensure_ascii=False))
        else:
            print(f"Error: {response.text}")
            
        return response.status_code == 200, response.json() if response.status_code == 200 else None
        
    except Exception as e:
        print(f"Error de conexión: {e}")
        return False, None

def main():
    """Función principal de pruebas"""
    print("🧪 INICIANDO PRUEBAS DEL SISTEMA DE GESTIÓN DE CRUCES")
    print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # 1. Probar estadísticas generales
    print("\n" + "="*60)
    print("1. PROBANDO ESTADÍSTICAS GENERALES")
    print("="*60)
    
    success, data = test_endpoint("/api/estadisticas-cruces")
    
    if success and data:
        print(f"\n✅ Estadísticas obtenidas:")
        print(f"   - Total cursos: {data.get('total_cursos', 'N/A')}")
        print(f"   - Total profesores: {data.get('total_profesores', 'N/A')}")
        print(f"   - Cruces teóricos: {data.get('cruces_teoricos', 'N/A')}")
        print(f"   - Cruces peligrosos: {data.get('cruces_peligrosos', 'N/A')}")
        print(f"   - Cruces críticos: {data.get('cruces_criticos', 'N/A')}")
    
    # 2. Probar búsqueda por curso
    print("\n" + "="*60)
    print("2. PROBANDO BÚSQUEDA POR CURSO")
    print("="*60)
    
    # Probar con MAT101
    success, data = test_endpoint("/api/cruces-por-curso", {
        "curso": "MAT101",
        "ciclo": "241"
    })
    
    if success and data:
        print(f"\n✅ Cruces del curso MAT101:")
        print(f"   - Curso: {data.get('curso', {}).get('nombre', 'N/A')}")
        print(f"   - Secciones: {len(data.get('secciones', []))}")
        print(f"   - Cruces teóricos: {data.get('cruces_teoricos', 'N/A')}")
        print(f"   - Cruces peligrosos: {data.get('cruces_peligrosos', 'N/A')}")
        print(f"   - Cruces críticos: {data.get('cruces_criticos', 'N/A')}")
    
    # Probar con búsqueda por nombre
    success, data = test_endpoint("/api/cruces-por-curso", {
        "curso": "Matemáticas",
        "ciclo": "241"
    })
    
    # 3. Probar búsqueda por profesor
    print("\n" + "="*60)
    print("3. PROBANDO BÚSQUEDA POR PROFESOR")
    print("="*60)
    
    success, data = test_endpoint("/api/cruces-por-profesor", {
        "profesor": "Juan García"
    })
    
    if success and data:
        print(f"\n✅ Historial del profesor:")
        print(f"   - Profesor: {data.get('profesor', {}).get('nombre', 'N/A')}")
        print(f"   - Cursos dictados: {len(data.get('cursos', []))}")
        print(f"   - Total teóricos: {data.get('total_teoricos', 'N/A')}")
        print(f"   - Total peligrosos: {data.get('total_peligrosos', 'N/A')}")
        print(f"   - Total críticos: {data.get('total_criticos', 'N/A')}")
    
    # 4. Probar detección de cruces
    print("\n" + "="*60)
    print("4. PROBANDO DETECCIÓN DE CRUCES")
    print("="*60)
    
    success, data = test_endpoint("/api/detectar-cruces", {
        "ciclo": "241"
    })
    
    if success and data:
        print(f"\n✅ Cruces detectados en ciclo 241:")
        print(f"   - Total cruces: {data.get('total_cruces', 'N/A')}")
        
        cruces = data.get('cruces', [])
        if cruces:
            print(f"   - Detalle de cruces:")
            for i, cruce in enumerate(cruces[:5], 1):  # Mostrar solo los primeros 5
                curso1 = cruce.get('curso1', {})
                curso2 = cruce.get('curso2', {})
                print(f"     {i}. {curso1.get('codigo')} vs {curso2.get('codigo')} - {cruce.get('tipo_cruce')}")
    
    # 5. Probar casos de error
    print("\n" + "="*60)
    print("5. PROBANDO CASOS DE ERROR")
    print("="*60)
    
    # Curso inexistente
    success, data = test_endpoint("/api/cruces-por-curso", {
        "curso": "CURSO_INEXISTENTE",
        "ciclo": "241"
    })
    
    # Profesor inexistente
    success, data = test_endpoint("/api/cruces-por-profesor", {
        "profesor": "PROFESOR_INEXISTENTE"
    })
    
    # Ciclo inexistente
    success, data = test_endpoint("/api/detectar-cruces", {
        "ciclo": "999"
    })
    
    print("\n" + "="*60)
    print("🏁 PRUEBAS COMPLETADAS")
    print("="*60)
    print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("\n💡 Recomendaciones:")
    print("   - Verificar que el servidor esté ejecutándose en http://localhost:8000")
    print("   - Ejecutar el script SQL para crear datos de prueba")
    print("   - Revisar los logs del servidor para más detalles")

if __name__ == "__main__":
    main() 