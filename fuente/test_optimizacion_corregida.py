import requests
import json

def test_optimizacion_horario_corregida():
    """Prueba el endpoint de optimización de horarios corregido"""
    
    # Datos de prueba
    datos = {
        "codigos_cursos": ["SI505", "SI207", "SI405"],
        "periodo": "241",
        "nota_alumno": 15.5
    }
    
    try:
        # Llamar al endpoint
        response = requests.post(
            "http://localhost:8000/api/optimizar-horario",
            json=datos,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            resultado = response.json()
            print("✅ Optimización exitosa!")
            print(f"Probabilidad media: {resultado['probabilidad_media']}%")
            print(f"Total de cursos: {resultado['total_cursos']}")
            print(f"Cruces: {resultado['cruces']}")
            
            print("\n📅 Horario optimizado:")
            for seccion in resultado['horario_optimizado']:
                print(f"  • {seccion['codigo_curso']} - Sección {seccion['seccion']}")
                print(f"    Profesor: {seccion['profesor']}")
                print(f"    Probabilidad: {seccion['probabilidad']}%")
                print(f"    Horarios: {len(seccion['horarios'])} clases")
                print()
                
        else:
            print("❌ Error en la optimización:")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Error de conexión: {e}")

if __name__ == "__main__":
    test_optimizacion_horario_corregida() 