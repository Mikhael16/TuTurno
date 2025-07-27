#!/usr/bin/env python3
"""
Script de prueba para el reporte por ciclo relativo
"""

import requests
import json

def test_reporte_ciclo_relativo():
    """Prueba el endpoint de reporte por ciclo relativo"""
    
    # URL del endpoint
    url = "http://localhost:8000/api/reporte-pronostico-ciclo-relativo"
    
    # Datos de prueba
    datos_prueba = {
        "carrera": "I1",  # Ingeniería Industrial
        "vacantes_por_seccion": 40
    }
    
    print("=== Prueba del Reporte por Ciclo Relativo ===")
    print(f"URL: {url}")
    print(f"Datos de prueba: {json.dumps(datos_prueba, indent=2)}")
    print()
    
    try:
        # Realizar la petición POST
        response = requests.post(url, json=datos_prueba)
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        print()
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Respuesta exitosa:")
            print(f"Success: {data.get('success')}")
            print(f"Total cursos: {data.get('total_cursos')}")
            print(f"Total secciones: {data.get('total_secciones')}")
            print(f"Carrera: {data.get('carrera')}")
            print(f"Campo ciclo: {data.get('campo_ciclo')}")
            print()
            
            # Mostrar algunos datos de ejemplo
            datos = data.get('datos', [])
            if datos:
                print("📊 Datos de ejemplo (primeros 5 registros):")
                for i, item in enumerate(datos[:5]):
                    print(f"  {i+1}. Ciclo {item['ciclo']} - {item['codigo_curso']} ({item['nombre_curso']})")
                    print(f"     Sección: {item['seccion']} | Profesor: {item['profesor_teoria']}")
                    print(f"     Matriculados pronosticados: {item['matriculados_pronosticados']}")
                    print()
            else:
                print("⚠️  No se encontraron datos")
        else:
            print("❌ Error en la respuesta:")
            try:
                error_data = response.json()
                print(f"Error: {error_data}")
            except:
                print(f"Error: {response.text}")
                
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión: No se pudo conectar al servidor")
        print("Asegúrate de que el backend esté ejecutándose en http://localhost:8000")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

def test_diferentes_carreras():
    """Prueba el endpoint con diferentes carreras"""
    
    carreras = [
        {"codigo": "I1", "nombre": "Ingeniería Industrial"},
        {"codigo": "I2", "nombre": "Ingeniería de Sistemas"},
        {"codigo": "I3", "nombre": "Ingeniería de Software"}
    ]
    
    url = "http://localhost:8000/api/reporte-pronostico-ciclo-relativo"
    
    print("=== Prueba con Diferentes Carreras ===")
    
    for carrera in carreras:
        print(f"\n🔍 Probando carrera: {carrera['nombre']} ({carrera['codigo']})")
        
        datos = {
            "carrera": carrera['codigo'],
            "vacantes_por_seccion": 35
        }
        
        try:
            response = requests.post(url, json=datos)
            
            if response.status_code == 200:
                data = response.json()
                print(f"  ✅ Éxito: {data.get('total_cursos')} cursos, {data.get('total_secciones')} secciones")
            else:
                print(f"  ❌ Error: {response.status_code}")
                
        except Exception as e:
            print(f"  ❌ Error: {e}")

if __name__ == "__main__":
    print("🚀 Iniciando pruebas del reporte por ciclo relativo...")
    print()
    
    # Prueba principal
    test_reporte_ciclo_relativo()
    
    print("\n" + "="*60 + "\n")
    
    # Prueba con diferentes carreras
    test_diferentes_carreras()
    
    print("\n✅ Pruebas completadas") 