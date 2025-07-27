#!/usr/bin/env python3
"""
Script de prueba para verificar el endpoint de horario-cursos con probabilidades
"""

import requests
import json

def test_horario_cursos_con_probabilidades():
    """Probar el endpoint de horario-cursos con probabilidades"""
    print("=== PRUEBA DE HORARIO-CURSOS CON PROBABILIDADES ===")
    
    # Casos de prueba
    casos_prueba = [
        {
            "codigos": ["MAT101", "FIS101"],
            "periodo": "241",
            "nota_alumno": 12.5
        },
        {
            "codigos": ["MAT101"],
            "periodo": "241", 
            "nota_alumno": 15.0
        },
        {
            "codigos": ["MAT101", "FIS101", "INF101"],
            "periodo": "241",
            "nota_alumno": 10.0
        }
    ]
    
    for i, caso in enumerate(casos_prueba, 1):
        print(f"\n--- Caso {i} ---")
        print(f"Cursos: {caso['codigos']}")
        print(f"Periodo: {caso['periodo']}")
        print(f"Nota: {caso['nota_alumno']}")
        
        try:
            response = requests.post('http://localhost:8000/api/horario-cursos', json=caso)
            if response.status_code == 200:
                data = response.json()
                
                print(f"✅ Respuesta exitosa:")
                print(f"   - Total secciones: {data.get('resumen', {}).get('total_secciones', 'N/A')}")
                print(f"   - Secciones sin cruces críticos: {data.get('resumen', {}).get('secciones_sin_cruces_criticos', 'N/A')}")
                print(f"   - Secciones con cruces críticos: {data.get('resumen', {}).get('secciones_con_cruces_criticos', 'N/A')}")
                print(f"   - Probabilidad promedio: {data.get('resumen', {}).get('promedio_probabilidad', 'N/A')}%")
                
                secciones = data.get('secciones', [])
                print(f"   - Detalle de secciones:")
                
                for j, seccion in enumerate(secciones[:3], 1):  # Mostrar solo las primeras 3
                    print(f"     {j}. {seccion.get('codigo_curso')} - {seccion.get('seccion')}")
                    print(f"        Profesor: {seccion.get('profesor')}")
                    print(f"        Probabilidad: {seccion.get('probabilidad', 'N/A')}%")
                    print(f"        Cruces críticos: {seccion.get('cruces', {}).get('criticos', 0)}")
                    print(f"        Cruces peligrosos: {seccion.get('cruces', {}).get('peligrosos', 0)}")
                    print(f"        Cruces teóricos: {seccion.get('cruces', {}).get('teoricos', 0)}")
                
                if len(secciones) > 3:
                    print(f"     ... y {len(secciones) - 3} secciones más")
                    
            else:
                print(f"❌ Error: {response.status_code} - {response.text}")
                
        except Exception as e:
            print(f"❌ Error de conexión: {e}")

def test_normalizacion_ciclo():
    """Probar la normalización de ciclo 252 -> 251"""
    print("\n\n=== PRUEBA DE NORMALIZACIÓN DE CICLO ===")
    
    casos_ciclo = [
        {"periodo": "252", "esperado": "251"},
        {"periodo": "251", "esperado": "251"},
        {"periodo": "241", "esperado": "241"},
        {"periodo": "232", "esperado": "232"}
    ]
    
    for caso in casos_ciclo:
        try:
            response = requests.post('http://localhost:8000/api/horario-cursos', json={
                "codigos": ["MAT101"],
                "periodo": caso["periodo"],
                "nota_alumno": 12.5
            })
            
            if response.status_code == 200:
                data = response.json()
                periodo_recibido = data.get('periodo', 'N/A')
                print(f"✅ Ciclo {caso['periodo']} -> {periodo_recibido} (esperado: {caso['esperado']})")
            else:
                print(f"❌ Error con ciclo {caso['periodo']}: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Error con ciclo {caso['periodo']}: {e}")

def test_analisis_cruces():
    """Probar el análisis de cruces"""
    print("\n\n=== PRUEBA DE ANÁLISIS DE CRUCES ===")
    
    try:
        response = requests.post('http://localhost:8000/api/horario-cursos', json={
            "codigos": ["MAT101", "FIS101", "INF101"],
            "periodo": "241",
            "nota_alumno": 12.5
        })
        
        if response.status_code == 200:
            data = response.json()
            secciones = data.get('secciones', [])
            
            print(f"✅ Análisis de cruces completado:")
            print(f"   - Total secciones analizadas: {len(secciones)}")
            
            # Contar tipos de cruces
            total_criticos = sum(s.get('cruces', {}).get('criticos', 0) for s in secciones)
            total_peligrosos = sum(s.get('cruces', {}).get('peligrosos', 0) for s in secciones)
            total_teoricos = sum(s.get('cruces', {}).get('teoricos', 0) for s in secciones)
            
            print(f"   - Total cruces críticos: {total_criticos}")
            print(f"   - Total cruces peligrosos: {total_peligrosos}")
            print(f"   - Total cruces teóricos: {total_teoricos}")
            
            # Mostrar secciones con cruces críticos
            secciones_criticas = [s for s in secciones if s.get('cruces', {}).get('criticos', 0) > 0]
            if secciones_criticas:
                print(f"   - Secciones con cruces críticos:")
                for seccion in secciones_criticas:
                    print(f"     * {seccion.get('codigo_curso')} - {seccion.get('seccion')} ({seccion.get('cruces', {}).get('criticos', 0)} críticos)")
            else:
                print(f"   - ✅ No hay secciones con cruces críticos")
                
        else:
            print(f"❌ Error en análisis de cruces: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error en análisis de cruces: {e}")

if __name__ == "__main__":
    print("🧪 INICIANDO PRUEBAS DEL SISTEMA DE CALENDARIO CON PROBABILIDADES")
    print("=" * 70)
    
    test_horario_cursos_con_probabilidades()
    test_normalizacion_ciclo()
    test_analisis_cruces()
    
    print("\n" + "=" * 70)
    print("✅ PRUEBAS COMPLETADAS")
    print("\n💡 Verifica que:")
    print("   - El servidor esté ejecutándose en http://localhost:8000")
    print("   - Los datos de prueba estén cargados en la base de datos")
    print("   - El endpoint /api/horario-cursos esté funcionando correctamente") 