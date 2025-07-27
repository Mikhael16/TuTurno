#!/usr/bin/env python3
"""
Script interactivo para probar los modelos predictivos
Permite ingresar datos por consola y ver las predicciones de ambos modelos
"""

import pandas as pd
import numpy as np
import joblib
import os
from pathlib import Path

def cargar_modelos():
    """Carga ambos modelos predictivos"""
    try:
        # Ruta a los modelos
        models_dir = Path("backend/models")
        modelo_matriculados_path = models_dir / "modelo_matriculados.pkl"
        modelo_resultados_path = models_dir / "modelo_resultadosseccion.pkl"
        
        print("🔄 Cargando modelos...")
        
        # Cargar modelo de matriculados
        if modelo_matriculados_path.exists():
            modelo_matriculados = joblib.load(modelo_matriculados_path)
            print("✅ Modelo de matriculados cargado correctamente")
        else:
            print("❌ No se encontró modelo_matriculados.pkl")
            return None, None
        
        # Cargar modelo de resultados
        if modelo_resultados_path.exists():
            modelo_resultados = joblib.load(modelo_resultados_path)
            print("✅ Modelo de resultados cargado correctamente")
        else:
            print("❌ No se encontró modelo_resultadosseccion.pkl")
            return modelo_matriculados, None
        
        return modelo_matriculados, modelo_resultados
        
    except Exception as e:
        print(f"❌ Error al cargar modelos: {e}")
        return None, None

def obtener_datos_entrada():
    """Obtiene los datos de entrada del usuario"""
    print("\n" + "="*60)
    print("📝 INGRESO DE DATOS")
    print("="*60)
    
    # Código del curso
    while True:
        codigo_curso = input("Ingrese el código del curso (ej: SI505, MAT101): ").strip().upper()
        if codigo_curso:
            break
        print("❌ El código del curso no puede estar vacío")
    
    # Nombre del profesor
    while True:
        nombre_profesor = input("Ingrese el nombre del profesor: ").strip()
        if nombre_profesor:
            break
        print("❌ El nombre del profesor no puede estar vacío")
    
    # Número de vacantes
    while True:
        try:
            num_vacantes = int(input("Ingrese el número de vacantes disponibles: "))
            if num_vacantes > 0:
                break
            print("❌ El número de vacantes debe ser mayor a 0")
        except ValueError:
            print("❌ Ingrese un número válido")
    
    return {
        'codigo_curso': codigo_curso,
        'nombre_profesor': nombre_profesor,
        'num_vacantes': num_vacantes
    }

def predecir_matriculados(modelo, datos):
    """Predice el número de matriculados usando el primer modelo"""
    try:
        print("\n🔄 Prediciendo número de matriculados...")
        
        # Preparar datos para el modelo
        nuevo_dato = pd.DataFrame({
            'Cursos': [datos['codigo_curso']],
            'DOCENTE': [datos['nombre_profesor']],
            'Nro Vacante': [datos['num_vacantes']]
        })
        
        print(f"📊 Datos de entrada:")
        print(f"   Curso: {datos['codigo_curso']}")
        print(f"   Profesor: {datos['nombre_profesor']}")
        print(f"   Vacantes: {datos['num_vacantes']}")
        
        # Separar preprocesador y regresor del pipeline
        preprocesador = modelo.named_steps['preprocessor']
        regresor = modelo.named_steps['regressor']
        
        # Transformar el nuevo dato con el preprocesador
        nuevo_dato_procesado = preprocesador.transform(nuevo_dato)
        
        # Predecir con cada árbol individual
        all_predictions = np.stack([tree.predict(nuevo_dato_procesado) for tree in regresor.estimators_])
        media = all_predictions.mean(axis=0)
        desviacion = all_predictions.std(axis=0)
        
        resultado = {
            'prediccion': media[0],
            'desviacion': desviacion[0],
            'intervalo_inferior': media[0] - desviacion[0],
            'intervalo_superior': media[0] + desviacion[0]
        }
        
        print(f"\n✅ Predicción de matriculados:")
        print(f"   Matriculados estimados: {resultado['prediccion']:.2f}")
        print(f"   Intervalo de confianza: {resultado['intervalo_inferior']:.2f} a {resultado['intervalo_superior']:.2f}")
        print(f"   Desviación estándar: ±{resultado['desviacion']:.2f}")
        
        return resultado
        
    except Exception as e:
        print(f"❌ Error al predecir matriculados: {e}")
        return None

def predecir_resultados(modelo, datos, matriculados_prediccion):
    """Predice aprobados y desaprobados usando el segundo modelo"""
    try:
        print("\n🔄 Prediciendo resultados (aprobados/desaprobados)...")
        
        # Usar la predicción de matriculados como entrada
        num_matriculados = int(round(matriculados_prediccion))
        
        # Preparar datos para el modelo
        nuevo_dato = pd.DataFrame({
            'Cursos': [datos['codigo_curso']],
            'DOCENTE': [datos['nombre_profesor']],
            'Nro Matric': [num_matriculados]
        })
        
        print(f"📊 Usando {num_matriculados} matriculados como entrada")
        
        # Separar el preprocesador y el modelo
        pre = modelo.named_steps['preprocessor']
        reg = modelo.named_steps['regressor']
        
        # Transformar entrada
        nuevo_dato_proc = pre.transform(nuevo_dato)
        
        # Obtener predicciones de todos los árboles en cada salida
        all_preds = []  # [n_targets x n_estimators x n_muestras]
        for i, est in enumerate(reg.estimators_):  # iterar por objetivo (aprobados, desaprobados)
            preds = np.stack([tree.predict(nuevo_dato_proc) for tree in est.estimators_])  # shape: [n_trees, n_samples]
            all_preds.append(preds)
        
        # Convertir a array: shape [2, n_trees, n_samples]
        all_preds = np.array(all_preds)
        
        # Calcular medias y desviaciones
        media = all_preds.mean(axis=1)[:, 0]        # shape [2]
        std_dev = all_preds.std(axis=1)[:, 0]       # shape [2]
        
        resultado = {
            'aprobados': {
                'prediccion': media[0],
                'desviacion': std_dev[0],
                'intervalo_inferior': media[0] - std_dev[0],
                'intervalo_superior': media[0] + std_dev[0]
            },
            'desaprobados': {
                'prediccion': media[1],
                'desviacion': std_dev[1],
                'intervalo_inferior': media[1] - std_dev[1],
                'intervalo_superior': media[1] + std_dev[1]
            }
        }
        
        print(f"\n✅ Predicción de resultados:")
        print(f"   🔹 Total Aprobados: {resultado['aprobados']['prediccion']:.2f} ± {resultado['aprobados']['desviacion']:.2f}")
        print(f"   🔹 Total Desaprobados: {resultado['desaprobados']['prediccion']:.2f} ± {resultado['desaprobados']['desviacion']:.2f}")
        print(f"   📊 Intervalo Aprobados: {resultado['aprobados']['intervalo_inferior']:.2f} a {resultado['aprobados']['intervalo_superior']:.2f}")
        print(f"   📊 Intervalo Desaprobados: {resultado['desaprobados']['intervalo_inferior']:.2f} a {resultado['desaprobados']['intervalo_superior']:.2f}")
        
        return resultado
        
    except Exception as e:
        print(f"❌ Error al predecir resultados: {e}")
        return None

def calcular_probabilidad(matriculados_prediccion, num_vacantes):
    """Calcula la probabilidad de alcanzar vacante"""
    if num_vacantes <= 0:
        return 0
    
    # Si se predicen más matriculados que vacantes, la probabilidad es baja
    if matriculados_prediccion >= num_vacantes:
        # Calcular probabilidad basada en cuántos más se matricularán
        exceso = matriculados_prediccion - num_vacantes
        probabilidad = max(5, 100 - (exceso / num_vacantes) * 100)
    else:
        # Si se predicen menos matriculados que vacantes, alta probabilidad
        probabilidad = min(95, (matriculados_prediccion / num_vacantes) * 100 + 20)
    
    return round(probabilidad, 1)

def mostrar_resumen(datos, resultado_matriculados, resultado_resultados):
    """Muestra un resumen completo de las predicciones"""
    print("\n" + "="*60)
    print("📋 RESUMEN COMPLETO DE PREDICCIONES")
    print("="*60)
    
    print(f"🎯 Datos de entrada:")
    print(f"   Curso: {datos['codigo_curso']}")
    print(f"   Profesor: {datos['nombre_profesor']}")
    print(f"   Vacantes disponibles: {datos['num_vacantes']}")
    
    if resultado_matriculados:
        print(f"\n📊 Modelo 1 - Predicción de matriculados:")
        print(f"   Matriculados estimados: {resultado_matriculados['prediccion']:.1f}")
        print(f"   Intervalo: {resultado_matriculados['intervalo_inferior']:.1f} - {resultado_matriculados['intervalo_superior']:.1f}")
        
        # Calcular probabilidad
        probabilidad = calcular_probabilidad(resultado_matriculados['prediccion'], datos['num_vacantes'])
        print(f"   🎯 Probabilidad de alcanzar vacante: {probabilidad}%")
        
        # Determinar resultado cualitativo
        if probabilidad >= 80:
            resultado_cualitativo = "Alta probabilidad"
            color = "🟢"
        elif probabilidad >= 50:
            resultado_cualitativo = "Probabilidad media"
            color = "🟡"
        else:
            resultado_cualitativo = "Baja probabilidad"
            color = "🔴"
        
        print(f"   {color} Resultado: {resultado_cualitativo}")
    
    if resultado_resultados:
        print(f"\n📈 Modelo 2 - Predicción de resultados:")
        print(f"   Aprobados estimados: {resultado_resultados['aprobados']['prediccion']:.1f}")
        print(f"   Desaprobados estimados: {resultado_resultados['desaprobados']['prediccion']:.1f}")
        
        # Calcular tasa de aprobación
        total_estimado = resultado_resultados['aprobados']['prediccion'] + resultado_resultados['desaprobados']['prediccion']
        if total_estimado > 0:
            tasa_aprobacion = (resultado_resultados['aprobados']['prediccion'] / total_estimado) * 100
            print(f"   📊 Tasa de aprobación estimada: {tasa_aprobacion:.1f}%")

def main():
    """Función principal"""
    print("🚀 TESTEO DE MODELOS PREDICTIVOS")
    print("="*60)
    print("Este script te permite probar los modelos de predicción")
    print("con diferentes combinaciones de curso, profesor y vacantes.")
    
    # Cargar modelos
    modelo_matriculados, modelo_resultados = cargar_modelos()
    
    if not modelo_matriculados:
        print("❌ No se pudieron cargar los modelos. Verifica que los archivos existan.")
        return
    
    while True:
        try:
            # Obtener datos de entrada
            datos = obtener_datos_entrada()
            
            # Predicción con primer modelo
            resultado_matriculados = predecir_matriculados(modelo_matriculados, datos)
            
            # Predicción con segundo modelo (si está disponible)
            resultado_resultados = None
            if modelo_resultados and resultado_matriculados:
                resultado_resultados = predecir_resultados(modelo_resultados, datos, resultado_matriculados['prediccion'])
            
            # Mostrar resumen
            mostrar_resumen(datos, resultado_matriculados, resultado_resultados)
            
            # Preguntar si continuar
            print("\n" + "-"*60)
            continuar = input("¿Deseas hacer otra predicción? (s/n): ").strip().lower()
            if continuar not in ['s', 'si', 'sí', 'y', 'yes']:
                break
                
        except KeyboardInterrupt:
            print("\n\n👋 ¡Hasta luego!")
            break
        except Exception as e:
            print(f"\n❌ Error inesperado: {e}")
            continuar = input("¿Deseas intentar de nuevo? (s/n): ").strip().lower()
            if continuar not in ['s', 'si', 'sí', 'y', 'yes']:
                break
    
    print("\n✅ Testeo completado")

if __name__ == "__main__":
    main() 