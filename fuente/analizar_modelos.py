#!/usr/bin/env python3
"""
Script para analizar los modelos predictivos sin cargarlos completamente
Ayuda a entender la estructura y compatibilidad de los modelos
"""

import pickle
import joblib
import numpy as np
from pathlib import Path

def analizar_archivo_modelo(ruta_archivo):
    """Analiza un archivo de modelo sin cargarlo completamente"""
    print(f"\n🔍 Analizando: {ruta_archivo}")
    print("-" * 50)
    
    try:
        # Verificar si el archivo existe
        if not Path(ruta_archivo).exists():
            print(f"❌ El archivo no existe: {ruta_archivo}")
            return
        
        # Obtener información del archivo
        archivo = Path(ruta_archivo)
        tamaño_mb = archivo.stat().st_size / (1024 * 1024)
        print(f"📁 Tamaño del archivo: {tamaño_mb:.1f} MB")
        
        # Intentar cargar con pickle para ver la estructura
        try:
            with open(ruta_archivo, 'rb') as f:
                # Leer solo los primeros bytes para detectar el formato
                header = f.read(100)
                f.seek(0)
                
                if b'joblib' in header or b'pickle' in header:
                    print("📦 Formato detectado: joblib/pickle")
                    
                    # Intentar cargar con joblib
                    try:
                        modelo = joblib.load(ruta_archivo)
                        print("✅ Modelo cargado exitosamente con joblib")
                        
                        # Analizar estructura del modelo
                        if hasattr(modelo, 'named_steps'):
                            print("🔧 Tipo: Pipeline de sklearn")
                            print("📋 Pasos del pipeline:")
                            for nombre, paso in modelo.named_steps.items():
                                print(f"   - {nombre}: {type(paso).__name__}")
                                
                                # Si es un preprocesador, mostrar más detalles
                                if 'preprocessor' in nombre.lower():
                                    if hasattr(paso, 'transformers'):
                                        print(f"     Transformadores: {len(paso.transformers)}")
                                        for i, (nombre_trans, trans, cols) in enumerate(paso.transformers):
                                            print(f"       {i+1}. {nombre_trans}: {type(trans).__name__}")
                                
                                # Si es un regresor, mostrar más detalles
                                if 'regressor' in nombre.lower():
                                    if hasattr(paso, 'estimators_'):
                                        print(f"     Número de estimadores: {len(paso.estimators_)}")
                                    if hasattr(paso, 'n_estimators'):
                                        print(f"     n_estimators: {paso.n_estimators}")
                        
                        elif hasattr(modelo, 'estimators_'):
                            print("🌳 Tipo: RandomForest o Ensemble")
                            print(f"📊 Número de estimadores: {len(modelo.estimators_)}")
                        
                        else:
                            print(f"🔧 Tipo: {type(modelo).__name__}")
                        
                        return modelo
                        
                    except Exception as e:
                        print(f"❌ Error al cargar con joblib: {e}")
                        
                        # Intentar con pickle
                        try:
                            f.seek(0)
                            modelo = pickle.load(f)
                            print("✅ Modelo cargado exitosamente con pickle")
                            print(f"🔧 Tipo: {type(modelo).__name__}")
                            return modelo
                            
                        except Exception as e2:
                            print(f"❌ Error al cargar con pickle: {e2}")
                
                else:
                    print("❓ Formato no reconocido")
                    
        except Exception as e:
            print(f"❌ Error al analizar archivo: {e}")
            
    except Exception as e:
        print(f"❌ Error general: {e}")

def probar_compatibilidad():
    """Prueba la compatibilidad de scikit-learn"""
    print("\n🔧 VERIFICACIÓN DE COMPATIBILIDAD")
    print("=" * 50)
    
    try:
        import sklearn
        print(f"📦 Versión de scikit-learn instalada: {sklearn.__version__}")
        
        # Verificar versiones de componentes específicos
        try:
            from sklearn.ensemble import RandomForestRegressor
            print("✅ RandomForestRegressor disponible")
        except Exception as e:
            print(f"❌ Error con RandomForestRegressor: {e}")
        
        try:
            from sklearn.compose import ColumnTransformer
            print("✅ ColumnTransformer disponible")
        except Exception as e:
            print(f"❌ Error con ColumnTransformer: {e}")
        
        try:
            from sklearn.preprocessing import OneHotEncoder
            print("✅ OneHotEncoder disponible")
        except Exception as e:
            print(f"❌ Error con OneHotEncoder: {e}")
        
        try:
            from sklearn.pipeline import Pipeline
            print("✅ Pipeline disponible")
        except Exception as e:
            print(f"❌ Error con Pipeline: {e}")
            
    except ImportError:
        print("❌ scikit-learn no está instalado")

def crear_datos_ejemplo():
    """Crea datos de ejemplo para probar los modelos"""
    print("\n📊 DATOS DE EJEMPLO")
    print("=" * 50)
    
    # Datos de ejemplo basados en los códigos que proporcionaste
    datos_ejemplo = [
        {
            'nombre': 'Ejemplo 1 - SI505 con REYNA',
            'datos': {
                'Cursos': ['SI505'],
                'DOCENTE': ['REYNA MONTEVERDE, TINO EDUARDO'],
                'Nro Vacante': [40]
            }
        },
        {
            'nombre': 'Ejemplo 2 - MAT101 con GARCIA',
            'datos': {
                'Cursos': ['MAT101'],
                'DOCENTE': ['GARCIA LOPEZ, MARIA'],
                'Nro Vacante': [35]
            }
        },
        {
            'nombre': 'Ejemplo 3 - SI505 con MONDRAGON',
            'datos': {
                'Cursos': ['SI505'],
                'DOCENTE': ['MONDRAGON MONDRAGON MARGARITA DELICIA'],
                'Nro Vacante': [40]
            }
        }
    ]
    
    print("📋 Datos de ejemplo para probar:")
    for i, ejemplo in enumerate(datos_ejemplo, 1):
        print(f"\n{i}. {ejemplo['nombre']}")
        for key, value in ejemplo['datos'].items():
            print(f"   {key}: {value}")
    
    return datos_ejemplo

def main():
    """Función principal"""
    print("🔍 ANÁLISIS DE MODELOS PREDICTIVOS")
    print("=" * 60)
    print("Este script analiza los modelos sin cargarlos completamente")
    print("para entender su estructura y compatibilidad.")
    
    # Verificar compatibilidad
    probar_compatibilidad()
    
    # Analizar modelos
    modelos_dir = Path("backend/models")
    
    # Analizar modelo de matriculados
    modelo_matriculados_path = modelos_dir / "modelo_matriculados.pkl"
    modelo_matriculados = analizar_archivo_modelo(modelo_matriculados_path)
    
    # Analizar modelo de resultados
    modelo_resultados_path = modelos_dir / "modelo_resultadosseccion.pkl"
    modelo_resultados = analizar_archivo_modelo(modelo_resultados_path)
    
    # Crear datos de ejemplo
    datos_ejemplo = crear_datos_ejemplo()
    
    print("\n" + "=" * 60)
    print("📋 RESUMEN DEL ANÁLISIS")
    print("=" * 60)
    
    if modelo_matriculados:
        print("✅ Modelo de matriculados: Analizado correctamente")
    else:
        print("❌ Modelo de matriculados: No se pudo analizar")
    
    if modelo_resultados:
        print("✅ Modelo de resultados: Analizado correctamente")
    else:
        print("❌ Modelo de resultados: No se pudo analizar")
    
    print("\n💡 RECOMENDACIONES:")
    print("1. Si hay problemas de compatibilidad, considera actualizar scikit-learn")
    print("2. Los modelos requieren las variables: Cursos, DOCENTE, Nro Vacante")
    print("3. El segundo modelo usa la salida del primero como entrada")
    print("4. Los datos de ejemplo están listos para usar cuando se resuelva la compatibilidad")

if __name__ == "__main__":
    main() 