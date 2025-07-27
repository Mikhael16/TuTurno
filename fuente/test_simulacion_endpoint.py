#!/usr/bin/env python3
"""
Script de prueba para el endpoint de simulación de matrícula simplificado
"""

import requests
import json
from datetime import datetime

# Configuración
base_url = "http://localhost:8000"

def test_prediccion_matricula():
    """Prueba el endpoint simplificado"""
    
    print("=" * 60)
    print("PRUEBA DEL ENDPOINT SIMPLIFICADO")
    print("=" * 60)
    
    casos_prueba = [
        {
            "nombre": "Caso 1: Estudiante con alta nota",
            "datos": {
                "nota": 15.5,
                "codigo_curso": "SI505",
                "ciclo": "2024-1",
                "profesor": "REYNA MONTEVERDE, TINO EDUARDO",
                "seccion": "01"
            }
        },
        {
            "nombre": "Caso 2: Estudiante con nota media",
            "datos": {
                "nota": 12.0,
                "codigo_curso": "MAT101",
                "ciclo": "241",
                "profesor": "GARCIA LOPEZ, MARIA",
                "seccion": "02"
            }
        }
    ]
    
    for i, caso in enumerate(casos_prueba, 1):
        print(f"\n{i}. {caso['nombre']}")
        print("-" * 50)
        
        print("📥 Datos de entrada:")
        for key, value in caso['datos'].items():
            print(f"   {key}: {value}")
        
        try:
            print(f"\n🔄 Llamando a {base_url}/api/prediccion-matricula...")
            response = requests.get(f"{base_url}/api/prediccion-matricula", params=caso['datos'])
            
            if response.status_code == 200:
                resultado = response.json()
                
                print("✅ Respuesta exitosa:")
                print(f"   Respuesta completa: {json.dumps(resultado, indent=2)}")
                
                # Verificar campos esperados
                if 'probabilidad' in resultado:
                    print(f"   Probabilidad: {resultado['probabilidad']}%")
                else:
                    print("   ❌ Campo 'probabilidad' no encontrado")
                
                if 'resultado' in resultado:
                    print(f"   Resultado: {resultado['resultado']}")
                else:
                    print("   ❌ Campo 'resultado' no encontrado")
                
                if 'color' in resultado:
                    print(f"   Color: {resultado['color']}")
                else:
                    print("   ❌ Campo 'color' no encontrado")
                
                # Verificar que no hay info_adicional
                if 'info_adicional' not in resultado:
                    print("   ✅ Sin información de turnos (correcto)")
                else:
                    print("   ⚠️ Aún hay información adicional")
                
            else:
                print(f"❌ Error {response.status_code}: {response.text}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
        
        print("\n" + "="*60)

def test_estado_modelo():
    """Verifica el estado del modelo"""
    
    print("\n" + "=" * 60)
    print("ESTADO DEL MODELO")
    print("=" * 60)
    
    try:
        response = requests.get(f"{base_url}/api/modelo-estado")
        
        if response.status_code == 200:
            estado = response.json()
            print("✅ Estado del modelo:")
            print(f"   Disponible: {estado.get('disponible', False)}")
            print(f"   Tipo: {estado.get('tipo', 'N/A')}")
            print(f"   Mensaje: {estado.get('mensaje', 'N/A')}")
        else:
            print(f"❌ Error {response.status_code}: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print(f"🚀 Pruebas del endpoint simplificado")
    print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    test_estado_modelo()
    test_prediccion_matricula()
    
    print("\n" + "=" * 60)
    print("✅ PRUEBAS COMPLETADAS")
    print("=" * 60) 