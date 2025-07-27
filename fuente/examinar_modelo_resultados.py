#!/usr/bin/env python3
"""
Script para examinar el archivo modelo_resultadosseccion.pkl
"""

import pickle
import numpy as np
import pandas as pd
from pathlib import Path

def examinar_archivo(ruta_archivo):
    """Examina el contenido de un archivo pickle"""
    print(f"🔍 Examinando: {ruta_archivo}")
    print("=" * 60)
    
    if not Path(ruta_archivo).exists():
        print("❌ El archivo no existe")
        return
    
    try:
        with open(ruta_archivo, 'rb') as f:
            contenido = pickle.load(f)
        
        print(f"✅ Archivo cargado exitosamente")
        print(f"📊 Tipo de contenido: {type(contenido)}")
        
        # Si es un pipeline de sklearn
        if hasattr(contenido, 'named_steps'):
            print(f"🔧 Es un Pipeline de sklearn")
            print(f"📋 Pasos del pipeline:")
            for nombre, paso in contenido.named_steps.items():
                print(f"   - {nombre}: {type(paso).__name__}")
                
                # Si es un preprocesador
                if 'preprocessor' in nombre.lower():
                    if hasattr(paso, 'transformers'):
                        print(f"     Transformadores: {len(paso.transformers)}")
                        for i, (nombre_trans, trans, cols) in enumerate(paso.transformers):
                            print(f"       {i+1}. {nombre_trans}: {type(trans).__name__}")
                
                # Si es un regresor
                if 'regressor' in nombre.lower():
                    if hasattr(paso, 'estimators_'):
                        print(f"     Número de estimadores: {len(paso.estimators_)}")
                    if hasattr(paso, 'n_estimators'):
                        print(f"     n_estimators: {paso.n_estimators}")
                    if hasattr(paso, 'n_outputs_'):
                        print(f"     n_outputs: {paso.n_outputs_}")
        
        # Si es un array de numpy
        elif isinstance(contenido, np.ndarray):
            print(f"🔢 Es un array de numpy")
            print(f"   Shape: {contenido.shape}")
            print(f"   Dtype: {contenido.dtype}")
            print(f"   Primeros elementos: {contenido[:5] if len(contenido) > 0 else 'Array vacío'}")
        
        # Si es una lista
        elif isinstance(contenido, list):
            print(f"📝 Es una lista con {len(contenido)} elementos")
            print(f"   Primeros elementos: {contenido[:5]}")
        
        # Si es un diccionario
        elif isinstance(contenido, dict):
            print(f"📚 Es un diccionario con {len(contenido)} claves")
            print(f"   Claves: {list(contenido.keys())}")
            for key, value in contenido.items():
                print(f"   {key}: {type(value)} - {value}")
        
        # Si es un DataFrame
        elif isinstance(contenido, pd.DataFrame):
            print(f"📊 Es un DataFrame")
            print(f"   Shape: {contenido.shape}")
            print(f"   Columnas: {list(contenido.columns)}")
            print(f"   Primeras filas:")
            print(contenido.head())
        
        # Otros tipos
        else:
            print(f"🔧 Otro tipo de objeto")
            print(f"   Atributos: {dir(contenido)}")
            
            # Intentar acceder a atributos comunes de modelos
            for attr in ['predict', 'fit', 'transform', 'fit_transform']:
                if hasattr(contenido, attr):
                    print(f"   ✅ Tiene método {attr}")
        
        return contenido
        
    except Exception as e:
        print(f"❌ Error al cargar el archivo: {e}")
        return None

def probar_prediccion_simple(modelo):
    """Prueba una predicción simple si es un modelo"""
    print(f"\n🧪 Probando predicción simple")
    print("-" * 50)
    
    if not hasattr(modelo, 'predict'):
        print("❌ El objeto no tiene método predict")
        return None
    
    try:
        # Datos de ejemplo para el segundo modelo
        datos_ejemplo = {
            'Cursos': ['SI505'],
            'DOCENTE': ['REYNA MONTEVERDE, TINO EDUARDO'],
            'Nro Matric': [32]  # Usando un valor típico
        }
        
        print(f"📊 Datos de ejemplo:")
        for key, value in datos_ejemplo.items():
            print(f"   {key}: {value}")
        
        # Crear DataFrame
        df_prueba = pd.DataFrame(datos_ejemplo)
        print(f"\n📋 DataFrame de prueba:")
        print(df_prueba)
        
        # Intentar predicción
        print(f"\n🔄 Intentando predicción...")
        prediccion = modelo.predict(df_prueba)
        print(f"✅ Predicción exitosa: {prediccion}")
        print(f"📊 Shape de predicción: {prediccion.shape}")
        
        return prediccion
        
    except Exception as e:
        print(f"❌ Error en predicción: {e}")
        return None

def main():
    """Función principal"""
    print("🔍 EXAMINANDO MODELO_RESULTADOSSECCION.PKL")
    print("=" * 60)
    
    # Examinar el archivo
    contenido = examinar_archivo("backend/models/modelo_resultadosseccion.pkl")
    
    if contenido is not None:
        # Probar predicción si es un modelo
        prediccion = probar_prediccion_simple(contenido)
        
        print(f"\n" + "=" * 60)
        print("📋 CONCLUSIONES")
        print("=" * 60)
        
        if hasattr(contenido, 'named_steps'):
            print("✅ El archivo contiene un modelo real (Pipeline de sklearn)")
            print("💡 Este modelo puede ser usado para predicciones")
            if prediccion is not None:
                print(f"🎯 Predicción de prueba exitosa: {prediccion}")
        elif hasattr(contenido, 'predict'):
            print("✅ El archivo contiene un modelo real")
            print("💡 Este modelo puede ser usado para predicciones")
            if prediccion is not None:
                print(f"🎯 Predicción de prueba exitosa: {prediccion}")
        else:
            print("❓ El archivo no parece ser un modelo entrenado")
            print("💡 Necesitamos más análisis para entender qué es")
    
    print(f"\n✅ Análisis completado")

if __name__ == "__main__":
    main() 