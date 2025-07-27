import os
import joblib
import pandas as pd
from sklearn.pipeline import Pipeline

def cargar_modelo(ruta):
    """Carga un modelo desde la ruta especificada con manejo de errores"""
    try:
        modelo = joblib.load(ruta)
        if not isinstance(modelo, Pipeline):
            print(f"Advertencia: El archivo {ruta} no es un Pipeline de scikit-learn")
        return modelo
    except Exception as e:
        print(f"Error al cargar {ruta}: {str(e)}")
        return None

def mostrar_estructura_pipeline(pipeline):
    """Muestra la estructura del pipeline"""
    print("\nEstructura del Pipeline:")
    for nombre, paso in pipeline.named_steps.items():
        print(f" - {nombre}: {type(paso).__name__}")
        
        # Mostrar parámetros importantes para el preprocesador
        if nombre == 'preprocessor':
            if hasattr(paso, 'transformers_'):
                print("   Transformers:")
                for trans in paso.transformers_:
                    print(f"     * {trans[0]}: {trans[2]}")

def predecir_con_modelo(pipeline, datos):
    """Realiza predicciones con el pipeline"""
    try:
        # Verificar si el pipeline tiene los métodos necesarios
        if not all(hasattr(pipeline, metodo) for metodo in ['predict', 'named_steps']):
            print("El objeto cargado no es un pipeline válido")
            return None
            
        resultado = pipeline.predict(datos)
        return resultado
    except Exception as e:
        print(f"Error en predicción: {str(e)}")
        return None

def predecir_matriculados(curso, docente, nro_vacante):
    """
    Predice la cantidad de matriculados basado en el curso, docente y número de vacantes.
    
    Args:
        curso (str): Código del curso (ej: 'SI505')
        docente (str): Nombre completo del docente
        nro_vacante (int): Número de vacantes disponibles
    
    Returns:
        float: Predicción de matriculados, None si hay error
    """
    # Ruta del modelo de matriculados
    ruta_modelo = os.path.join(os.path.dirname(__file__), 'modelo_matriculados.pkl')
    
    # Verificar que el archivo existe
    if not os.path.exists(ruta_modelo):
        print(f"Error: No se encontró el modelo en {ruta_modelo}")
        return None
    
    # Cargar el modelo
    pipeline = cargar_modelo(ruta_modelo)
    if pipeline is None:
        return None
    
    try:
        # Crear DataFrame con los datos de entrada
        datos = pd.DataFrame({
            'Cursos': [curso],
            'DOCENTE': [docente],
            'Nro Vacante': [nro_vacante]
        })
        
        # Realizar predicción
        prediccion = pipeline.predict(datos)
        
        # Retornar el primer valor (ya que solo tenemos una fila)
        return float(prediccion[0])
        
    except Exception as e:
        print(f"Error al realizar la predicción: {str(e)}")
        return None

def predecir_resultados_seccion(curso, docente, nro_matric):
    """
    Predice los resultados de sección basado en el curso, docente y número de matriculados.
    
    Args:
        curso (str): Código del curso (ej: 'SI505')
        docente (str): Nombre completo del docente
        nro_matric (int): Número de matriculados
    
    Returns:
        list: Lista con las predicciones de resultados, None si hay error
    """
    # Ruta del modelo de resultados de sección
    ruta_modelo = os.path.join(os.path.dirname(__file__), 'modelo_resultadosseccion.pkl')
    
    # Verificar que el archivo existe
    if not os.path.exists(ruta_modelo):
        print(f"Error: No se encontró el modelo en {ruta_modelo}")
        return None
    
    # Cargar el modelo
    pipeline = cargar_modelo(ruta_modelo)
    if pipeline is None:
        return None
    
    try:
        # Crear DataFrame con los datos de entrada
        datos = pd.DataFrame({
            'Cursos': [curso],
            'DOCENTE': [docente],
            'Nro Matric': [nro_matric]
        })
        
        # Realizar predicción
        prediccion = pipeline.predict(datos)
        
        # El modelo devuelve un array 2D, convertir a lista
        if prediccion.ndim == 2:
            return prediccion[0].tolist()
        else:
            return prediccion.tolist()
        
    except Exception as e:
        print(f"Error al realizar la predicción: {str(e)}")
        return None

def main():
    # Ejemplo de uso de la función predecir_matriculados
    print("=== Ejemplo de uso de predecir_matriculados ===")
    curso = "SI505"
    docente = "CABALLERO ORTIZ, JOSE ALBERTO"
    nro_vacante = 32
    
    prediccion = predecir_matriculados(curso, docente, nro_vacante)
    if prediccion is not None:
        print(f"Curso: {curso}")
        print(f"Docente: {docente}")
        print(f"Número de vacantes: {nro_vacante}")
        print(f"Predicción de matriculados: {prediccion:.2f}")
    else:
        print("No se pudo realizar la predicción")
    
    print("\n" + "="*50)
    
    # Rutas específicas de los modelos
    rutas_modelos = [
        r'C:\Users\User\Desktop\proyectologin\backend\models\modelo_matriculados.pkl',
        r'C:\Users\User\Desktop\proyectologin\backend\models\modelo_resultadosseccion.pkl'
    ]
    
    # Verificar existencia de archivos
    modelos_disponibles = []
    for ruta in rutas_modelos:
        if os.path.exists(ruta):
            modelos_disponibles.append(ruta)
        else:
            print(f"Archivo no encontrado: {ruta}")
    
    if not modelos_disponibles:
        print("No se encontraron modelos en las rutas especificadas")
        return
    
    # Menú para seleccionar modelo
    print("\nModelos disponibles:")
    for i, ruta in enumerate(modelos_disponibles, 1):
        print(f"{i}. {os.path.basename(ruta)}")
    
    try:
        seleccion = int(input("\nSeleccione el modelo a cargar (número): ")) - 1
        ruta_seleccionada = modelos_disponibles[seleccion]
    except (ValueError, IndexError):
        print("Selección inválida. Usando el primer modelo por defecto.")
        ruta_seleccionada = modelos_disponibles[0]
    
    # Cargar modelo seleccionado
    print(f"\nCargando modelo: {ruta_seleccionada}")
    pipeline = cargar_modelo(ruta_seleccionada)
    
    if pipeline is None:
        return
    
    # Mostrar estructura del pipeline
    mostrar_estructura_pipeline(pipeline)
    
    # Crear datos de prueba según el modelo seleccionado
    if 'matriculados' in ruta_seleccionada.lower():
        print("\nEjemplo de datos para modelo_matriculados.pkl:")
        nuevo_dato = pd.DataFrame({
            'Cursos': ['SI505'],
            'DOCENTE': ['CABALLERO ORTIZ, JOSE ALBERTO'],
            'Nro Vacante': [32]
        })
    else:  # modelo_resultadosseccion
        print("\nEjemplo de datos para modelo_resultadosseccion.pkl:")
        nuevo_dato = pd.DataFrame({
            'Cursos': ['SI505'],
            'DOCENTE': ['CABALLERO ORTIZ, JOSE ALBERTO'],
            'Nro Matric': [32]
        })
    
    print(nuevo_dato)
    
    # Realizar predicción
    resultado = predecir_con_modelo(pipeline, nuevo_dato)
    
    if resultado is not None:
        print("\nResultado de la predicción:")
        print(resultado)

if __name__ == "__main__":
    main()