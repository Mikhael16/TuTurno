"""
Ejemplo de uso de las funciones de predicción de matriculados
"""

from lector import predecir_matriculados, predecir_resultados_seccion

def ejemplo_prediccion_matriculados():
    """Ejemplo de cómo usar la función predecir_matriculados"""
    
    # Datos de ejemplo
    curso = "SI505"
    docente = "REYNA MONTEVERDE, TINO EDUARDO"
    nro_vacante = 32
    
    print("=== Predicción de Matriculados ===")
    print(f"Curso: {curso}")
    print(f"Docente: {docente}")
    print(f"Número de vacantes: {nro_vacante}")
    
    # Realizar predicción
    prediccion = predecir_matriculados(curso, docente, nro_vacante)
    
    if prediccion is not None:
        print(f"Predicción de matriculados: {prediccion:.2f}")
        print(f"Porcentaje de ocupación: {(prediccion/nro_vacante)*100:.1f}%")
    else:
        print("Error: No se pudo realizar la predicción")
    
    return prediccion

def ejemplo_prediccion_resultados():
    """Ejemplo de cómo usar la función predecir_resultados_seccion"""
    
    # Datos de ejemplo
    curso = "SI505"
    docente = "REYNA MONTEVERDE, TINO EDUARDO"
    nro_matric = 26  # Usando la predicción anterior como ejemplo
    
    print("\n=== Predicción de Resultados de Sección ===")
    print(f"Curso: {curso}")
    print(f"Docente: {docente}")
    print(f"Número de matriculados: {nro_matric}")
    
    # Realizar predicción
    prediccion = predecir_resultados_seccion(curso, docente, nro_matric)
    
    if prediccion is not None:
        print(f"Predicción de resultados: {prediccion}")
        if len(prediccion) == 2:
            print(f"  - Resultado 1: {prediccion[0]:.2f}")
            print(f"  - Resultado 2: {prediccion[1]:.2f}")
    else:
        print("Error: No se pudo realizar la predicción")
    
    return prediccion

def ejemplo_multiple_cursos():
    """Ejemplo con múltiples cursos"""
    
    cursos_ejemplo = [
        {"curso": "SI505", "docente": "REYNA MONTEVERDE, TINO EDUARDO", "vacantes": 32},
        {"curso": "SI506", "docente": "OTRO DOCENTE, NOMBRE", "vacantes": 25},
        {"curso": "SI507", "docente": "TERCER DOCENTE, NOMBRE", "vacantes": 30}
    ]
    
    print("\n=== Predicciones Múltiples ===")
    resultados = []
    
    for i, datos in enumerate(cursos_ejemplo, 1):
        print(f"\n{i}. Curso: {datos['curso']}")
        prediccion = predecir_matriculados(
            datos['curso'], 
            datos['docente'], 
            datos['vacantes']
        )
        
        if prediccion is not None:
            print(f"   Predicción: {prediccion:.2f} matriculados")
            print(f"   Ocupación: {(prediccion/datos['vacantes'])*100:.1f}%")
            resultados.append({
                'curso': datos['curso'],
                'prediccion': prediccion,
                'vacantes': datos['vacantes']
            })
        else:
            print("   Error en la predicción")
    
    return resultados

if __name__ == "__main__":
    # Ejecutar ejemplos
    prediccion1 = ejemplo_prediccion_matriculados()
    prediccion2 = ejemplo_prediccion_resultados()
    resultados_multiple = ejemplo_multiple_cursos()
    
    print("\n" + "="*50)
    print("Resumen de predicciones:")
    if prediccion1 is not None:
        print(f"Matriculados esperados: {prediccion1:.2f}")
    if prediccion2 is not None:
        print(f"Resultados esperados: {prediccion2}") 