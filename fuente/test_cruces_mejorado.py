#!/usr/bin/env python3
"""
Script de prueba para los nuevos endpoints de Gestión de Cruces mejorado
"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def test_endpoint(endpoint, params=None):
    """Prueba un endpoint y retorna el resultado"""
    try:
        url = f"{BASE_URL}{endpoint}"
        print(f"\n🔍 Probando: {url}")
        if params:
            print(f"📋 Parámetros: {params}")
        
        response = requests.get(url, params=params, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Éxito - Status: {response.status_code}")
            print(f"📊 Datos recibidos: {json.dumps(data, indent=2, ensure_ascii=False)}")
            return True, data
        else:
            print(f"❌ Error - Status: {response.status_code}")
            print(f"📄 Respuesta: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Error de conexión: {e}")
        return False, None
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False, None

def main():
    print("🚀 Iniciando pruebas de Gestión de Cruces Mejorado")
    print("=" * 60)
    
    # 1. Probar endpoint de estadísticas generales
    print("\n📈 1. Probando estadísticas generales de cruces")
    success, data = test_endpoint("/api/estadisticas-cruces")
    
    # 2. Probar top profesores - ciclo actual
    print("\n👨‍🏫 2. Probando top profesores (ciclo actual)")
    success, data = test_endpoint("/api/top-profesores-cruces", {
        "ciclo": "241",
        "historico": False,
        "limit": 5
    })
    
    # 3. Probar top profesores - histórico
    print("\n👨‍🏫 3. Probando top profesores (histórico)")
    success, data = test_endpoint("/api/top-profesores-cruces", {
        "ciclo": "241",
        "historico": True,
        "limit": 5
    })
    
    # 4. Probar top cursos - ciclo actual
    print("\n📚 4. Probando top cursos (ciclo actual)")
    success, data = test_endpoint("/api/top-cursos-cruces", {
        "ciclo": "241",
        "historico": False,
        "limit": 5
    })
    
    # 5. Probar top cursos - histórico
    print("\n📚 5. Probando top cursos (histórico)")
    success, data = test_endpoint("/api/top-cursos-cruces", {
        "ciclo": "241",
        "historico": True,
        "limit": 5
    })
    
    # 6. Probar sugerencias de profesores
    print("\n🔍 6. Probando sugerencias de profesores")
    success, data = test_endpoint("/api/sugerir-profesores", {
        "prefijo": "Juan",
        "limit": 5
    })
    
    # 7. Probar sugerencias de cursos
    print("\n🔍 7. Probando sugerencias de cursos")
    success, data = test_endpoint("/api/sugerir-cursos-cruces", {
        "prefijo": "MAT",
        "limit": 5
    })
    
    # 8. Probar cruces por curso
    print("\n📊 8. Probando cruces por curso")
    success, data = test_endpoint("/api/cruces-por-curso", {
        "curso": "MAT101",
        "ciclo": "241"
    })
    
    # 9. Probar cruces por profesor
    print("\n📊 9. Probando cruces por profesor")
    success, data = test_endpoint("/api/cruces-por-profesor", {
        "profesor": "Juan"
    })
    
    print("\n" + "=" * 60)
    print("🏁 Pruebas completadas")
    print(f"⏰ Hora: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main() 