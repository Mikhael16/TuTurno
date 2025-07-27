#!/usr/bin/env python3
"""
Script para examinar qué contiene realmente el archivo modelo_matriculados.pkl
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
        print(f"📏 Tamaño/Shape: {getattr(contenido, 'shape', 'N/A')}")
        
        # Si es un array de numpy
        if isinstance(contenido, np.ndarray):
            print(f"🔢 Es un array de numpy")
            print(f"   Shape: {contenido.shape}")
            print(f"   Dtype: {contenido.dtype}")
            print(f"   Primeros elementos: {contenido[:5] if len(contenido) > 0 else 'Array vacío'}")
            
            # Si parece ser una lista de nombres de columnas
            if contenido.dtype.kind in ['U', 'S', 'O']:  # Unicode, bytes, object
                print(f"\n📋 Parece ser una lista de nombres de columnas:")
                for i, nombre in enumerate(contenido):
                    print(f"   {i+1}. {nombre}")
        
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
            
            # Intentar acceder a atributos comunes
            for attr in ['columns', 'feature_names_', 'get_feature_names', 'get_feature_names_out']:
                if hasattr(contenido, attr):
                    try:
                        valor = getattr(contenido, attr)
                        if callable(valor):
                            valor = valor()
                        print(f"   {attr}: {valor}")
                    except:
                        pass
        
        return contenido
        
    except Exception as e:
        print(f"❌ Error al cargar el archivo: {e}")
        return None

def probar_con_datos_ejemplo(contenido):
    """Prueba usar el contenido con datos de ejemplo"""
    print(f"\n🧪 Probando con datos de ejemplo")
    print("-" * 50)
    
    # Datos de ejemplo
    datos_ejemplo = {
        'Cursos': ['SI505'],
        'DOCENTE': ['REYNA MONTEVERDE, TINO EDUARDO'],
        'Nro Vacante': [40]
    }
    
    print(f"📊 Datos de ejemplo:")
    for key, value in datos_ejemplo.items():
        print(f"   {key}: {value}")
    
    # Si el contenido es una lista de nombres de columnas
    if isinstance(contenido, np.ndarray) and contenido.dtype.kind in ['U', 'S', 'O']:
        print(f"\n🔍 Verificando si los datos de ejemplo coinciden con las columnas del modelo:")
        
        # Convertir a lista de strings
        columnas_modelo = [str(col) for col in contenido]
        print(f"📋 Columnas del modelo: {columnas_modelo}")
        
        # Verificar coincidencias
        datos_keys = list(datos_ejemplo.keys())
        print(f"📋 Claves de datos: {datos_keys}")
        
        coincidencias = []
        faltantes = []
        
        for col in columnas_modelo:
            if col in datos_keys:
                coincidencias.append(col)
            else:
                faltantes.append(col)
        
        print(f"\n✅ Coincidencias: {coincidencias}")
        print(f"❌ Faltantes: {faltantes}")
        
        if len(faltantes) == 0:
            print(f"🎉 ¡Todos los datos necesarios están disponibles!")
        else:
            print(f"⚠️ Faltan algunos datos: {faltantes}")
    
    # Si es un DataFrame, mostrar las primeras filas
    elif isinstance(contenido, pd.DataFrame):
        print(f"\n📊 Mostrando datos del modelo:")
        print(contenido.head())
        
        # Verificar si los datos de ejemplo están en el modelo
        for key, value in datos_ejemplo.items():
            if key in contenido.columns:
                valores_unicos = contenido[key].unique()
                print(f"   {key}: {value[0]} está en {valores_unicos[:5]}...")

def main():
    """Función principal"""
    print("🔍 EXAMINANDO MODELO_MATRICULADOS.PKL")
    print("=" * 60)
    
    # Examinar el archivo
    contenido = examinar_archivo("backend/models/modelo_matriculados.pkl")
    
    if contenido is not None:
        # Probar con datos de ejemplo
        probar_con_datos_ejemplo(contenido)
        
        print(f"\n" + "=" * 60)
        print("📋 CONCLUSIONES")
        print("=" * 60)
        
        if isinstance(contenido, np.ndarray) and contenido.dtype.kind in ['U', 'S', 'O']:
            print("✅ El archivo contiene nombres de columnas del modelo")
            print("💡 Esto sugiere que es metadata del modelo, no el modelo completo")
            print("🔍 Necesitamos encontrar el modelo real o recrearlo")
        elif isinstance(contenido, pd.DataFrame):
            print("✅ El archivo contiene datos de entrenamiento")
            print("💡 Esto sugiere que son los datos usados para entrenar el modelo")
            print("🔍 Necesitamos encontrar el modelo entrenado")
        else:
            print("❓ El archivo contiene algo inesperado")
            print("💡 Necesitamos más análisis para entender qué es")
    
    print(f"\n✅ Análisis completado")

if __name__ == "__main__":
    main() 