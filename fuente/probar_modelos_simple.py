#!/usr/bin/env python3
"""
Script simple para probar los modelos predictivos
Intenta diferentes métodos de carga
"""

import pandas as pd
import numpy as np
import joblib
import pickle
from pathlib import Path

def probar_carga_modelo(ruta_archivo, nombre_modelo):
    """Prueba diferentes métodos para cargar un modelo"""
    print(f"\n🔍 Probando carga de {nombre_modelo}")
    print(f"📁 Archivo: {ruta_archivo}")
    print("-" * 50)
    
    if not Path(ruta_archivo).exists():
        print("❌ El archivo no existe")
        return None
    
    # Método 1: joblib.load
    try:
        print("🔄 Intentando con joblib.load...")
        modelo = joblib.load(ruta_archivo)
        print("✅ ¡Éxito con joblib.load!")
        return modelo
    except Exception as e:
        print(f"❌ Error con joblib.load: {e}")
    
    # Método 2: pickle.load
    try:
        print("🔄 Intentando con pickle.load...")
        with open(ruta_archivo, 'rb') as f:
            modelo = pickle.load(f)
        print("✅ ¡Éxito con pickle.load!")
        return modelo
    except Exception as e:
        print(f"❌ Error con pickle.load: {e}")
    
    # Método 3: joblib.load con compress
    try:
        print("🔄 Intentando con joblib.load (compressed)...")
        modelo = joblib.load(ruta_archivo, mmap_mode='r')
        print("✅ ¡Éxito con joblib.load (mmap)!")
        return modelo
    except Exception as e:
        print(f"❌ Error con joblib.load (mmap): {e}")
    
    print("❌ No se pudo cargar el modelo con ningún método")
    return None

def probar_prediccion_simple(modelo, datos_prueba, nombre_modelo):
    """Prueba una predicción simple con el modelo cargado"""
    print(f"\n🧪 Probando predicción con {nombre_modelo}")
    print("-" * 50)
    
    try:
        # Crear DataFrame de prueba
        df_prueba = pd.DataFrame(datos_prueba)
        print(f"📊 Datos de prueba:")
        print(df_prueba)
        
        # Intentar predicción directa
        if hasattr(modelo, 'predict'):
            print("🔄 Intentando predicción directa...")
            prediccion = modelo.predict(df_prueba)
            print(f"✅ Predicción exitosa: {prediccion}")
            return prediccion
        
        # Si es un pipeline, intentar con named_steps
        elif hasattr(modelo, 'named_steps'):
            print("🔄 Detectado pipeline, intentando con named_steps...")
            
            # Buscar preprocesador y regresor
            if 'preprocessor' in modelo.named_steps and 'regressor' in modelo.named_steps:
                preprocesador = modelo.named_steps['preprocessor']
                regresor = modelo.named_steps['regressor']
                
                print("✅ Encontrados preprocesador y regresor")
                
                # Transformar datos
                datos_procesados = preprocesador.transform(df_prueba)
                print(f"📊 Datos procesados shape: {datos_procesados.shape}")
                
                # Predecir
                prediccion = regresor.predict(datos_procesados)
                print(f"✅ Predicción exitosa: {prediccion}")
                return prediccion
            else:
                print("❌ No se encontraron preprocesador y regresor en el pipeline")
        
        else:
            print(f"❌ Modelo no reconocido: {type(modelo)}")
            
    except Exception as e:
        print(f"❌ Error en predicción: {e}")
    
    return None

def main():
    """Función principal"""
    print("🧪 PRUEBA SIMPLE DE MODELOS PREDICTIVOS")
    print("=" * 60)
    
    # Datos de prueba
    datos_prueba = {
        'Cursos': ['SI505'],
        'DOCENTE': ['REYNA MONTEVERDE, TINO EDUARDO'],
        'Nro Vacante': [40]
    }
    
    # Probar modelo de matriculados
    modelo_matriculados = probar_carga_modelo(
        "backend/models/modelo_matriculados.pkl", 
        "Modelo de Matriculados"
    )
    
    if modelo_matriculados:
        prediccion_matriculados = probar_prediccion_simple(
            modelo_matriculados, 
            datos_prueba, 
            "Modelo de Matriculados"
        )
        
        # Si tenemos predicción de matriculados, probar el segundo modelo
        if prediccion_matriculados is not None:
            print(f"\n📊 Resultado del primer modelo: {prediccion_matriculados}")
            
            # Preparar datos para el segundo modelo
            num_matriculados = int(round(prediccion_matriculados[0]))
            datos_segundo_modelo = {
                'Cursos': ['SI505'],
                'DOCENTE': ['REYNA MONTEVERDE, TINO EDUARDO'],
                'Nro Matric': [num_matriculados]
            }
            
            print(f"🔄 Usando {num_matriculados} matriculados para el segundo modelo")
            
            # Probar modelo de resultados
            modelo_resultados = probar_carga_modelo(
                "backend/models/modelo_resultadosseccion.pkl", 
                "Modelo de Resultados"
            )
            
            if modelo_resultados:
                prediccion_resultados = probar_prediccion_simple(
                    modelo_resultados, 
                    datos_segundo_modelo, 
                    "Modelo de Resultados"
                )
                
                if prediccion_resultados is not None:
                    print(f"\n📊 Resultado del segundo modelo: {prediccion_resultados}")
                    
                    # Mostrar resumen
                    print("\n" + "=" * 60)
                    print("📋 RESUMEN DE PREDICCIONES")
                    print("=" * 60)
                    print(f"🎯 Datos de entrada:")
                    print(f"   Curso: SI505")
                    print(f"   Profesor: REYNA MONTEVERDE, TINO EDUARDO")
                    print(f"   Vacantes: 40")
                    print(f"\n📊 Predicciones:")
                    print(f"   Matriculados estimados: {prediccion_matriculados[0]:.1f}")
                    if len(prediccion_resultados) >= 2:
                        print(f"   Aprobados estimados: {prediccion_resultados[0]:.1f}")
                        print(f"   Desaprobados estimados: {prediccion_resultados[1]:.1f}")
                    
                    # Calcular probabilidad
                    matriculados = prediccion_matriculados[0]
                    vacantes = 40
                    if matriculados >= vacantes:
                        probabilidad = max(5, 100 - ((matriculados - vacantes) / vacantes) * 100)
                    else:
                        probabilidad = min(95, (matriculados / vacantes) * 100 + 20)
                    
                    print(f"\n🎯 Probabilidad de alcanzar vacante: {probabilidad:.1f}%")
    
    print("\n✅ Prueba completada")

if __name__ == "__main__":
    main() 