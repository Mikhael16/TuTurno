import pickle
import pandas as pd
import numpy as np  # Importación añadida
import os

def cargar_modelo(ruta_modelo):
    """Carga el modelo desde la ruta especificada con manejo de errores"""
    try:
        # Verificar si el archivo existe
        if not os.path.exists(ruta_modelo):
            raise FileNotFoundError(f"No se encontró el archivo en la ruta: {ruta_modelo}")
        
        # Cargar el modelo
        with open(ruta_modelo, 'rb') as archivo:
            modelo = pickle.load(archivo)
        
        # Verificar que el objeto cargado tiene el método predict
        if not hasattr(modelo, 'predict'):
            raise AttributeError("El objeto cargado no tiene método predict()")
            
        print(f"✅ Modelo cargado correctamente desde: {ruta_modelo}")
        return modelo
        
    except Exception as e:
        print(f"❌ Error al cargar el modelo: {str(e)}")
        return None

def preparar_datos():
    """Prepara los datos de entrada para la predicción"""
    # Asegúrate que los nombres de las columnas coincidan exactamente con los usados en el entrenamiento
    return pd.DataFrame({
        'Curso': ['SI505'],
        'Docente': ['CABALLERO ORTIZ, JOSE ALBERTO'],
        'Promedio': [12.7]  # Verifica si este valor debe ser entero o float
    })

def main():
    # Configuración de la ruta del modelo
    ruta_modelo = r'C:\Users\User\Desktop\proyectologin\backend\models\modelo_alumno.pkl'
    
    # 1. Cargar el modelo
    modelo = cargar_modelo(ruta_modelo)
    if modelo is None:
        return
    
    # 2. Preparar datos de prueba
    try:
        nuevo_alumno = preparar_datos()
        print("\nDatos de entrada para predicción:")
        print(nuevo_alumno)
        
        # Verificación adicional de columnas
        if hasattr(modelo, 'feature_names_in_'):
            expected_columns = set(modelo.feature_names_in_)
            current_columns = set(nuevo_alumno.columns)
            if expected_columns != current_columns:
                print("\n⚠️ Advertencia: Las columnas no coinciden con las esperadas por el modelo")
                print(f"Columnas esperadas: {sorted(expected_columns)}")
                print(f"Columnas proporcionadas: {sorted(current_columns)}")
                
    except Exception as e:
        print(f"Error al preparar datos: {str(e)}")
        return
    
    # 3. Realizar predicción
    try:
        prediccion = modelo.predict(nuevo_alumno)
        
        # Mostrar resultados
        print("\nResultado de la predicción:")
        if isinstance(prediccion, (list, np.ndarray)) and len(prediccion) > 0:
            # Formatear la salida según el tipo de dato
            if isinstance(prediccion[0], (np.floating, float)):
                print(f"Probabilidad predicha: {prediccion[0]:.4f}")  # 4 decimales para probabilidades
            else:
                print(f"Predicción: {prediccion[0]}")
        else:
            print(f"Predicción: {prediccion}")
            
    except Exception as e:
        print(f"\n❌ Error durante la predicción: {str(e)}")
        print("\n🔍 Posibles causas y soluciones:")
        print("1. Verifica los nombres exactos de las columnas (pueden diferir en mayúsculas/acentos)")
        print("2. Comprueba los tipos de datos (ej: 'Promedio' debe ser numérico)")
        print("3. Asegúrate que los valores estén en el rango esperado")
        print("4. Revisa si el modelo necesita preprocesamiento adicional")

if __name__ == "__main__":
    main()