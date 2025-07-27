#!/usr/bin/env python3
"""
Lector mejorado para modelos de predicción de matriculados
"""

import pickle
import pandas as pd
import numpy as np
import warnings
from typing import Dict, List, Tuple, Optional
warnings.filterwarnings('ignore')

class ModeloMatriculadosLector:
    """Clase para cargar y usar modelos de predicción de matriculados"""
    
    def __init__(self, model_path: str = 'backend/models/modelo_matriculados.pkl'):
        """
        Inicializar el lector del modelo
        
        Args:
            model_path: Ruta al archivo del modelo
        """
        self.model_path = model_path
        self.model = None
        self.preprocessor = None
        self.regressor = None
        self.is_loaded = False
        self.feature_names = None
        self.model_type = None
        
    def cargar_modelo(self) -> bool:
        """
        Cargar el modelo desde el archivo
        
        Returns:
            bool: True si se cargó exitosamente
        """
        try:
            with open(self.model_path, 'rb') as f:
                content = pickle.load(f)
            
            print(f"Contenido cargado: {type(content)}")
            
            # Verificar si es un array de numpy (caso actual)
            if isinstance(content, np.ndarray):
                print(f"⚠️  El archivo contiene solo metadatos: {content}")
                self.feature_names = content.tolist()
                self.model_type = 'metadata_only'
                self.is_loaded = True
                return True
            
            # Verificar si es un Pipeline
            elif hasattr(content, 'named_steps'):
                self.model = content
                self.model_type = 'pipeline'
                
                # Extraer componentes del pipeline
                if 'preprocessor' in content.named_steps:
                    self.preprocessor = content.named_steps['preprocessor']
                if 'regressor' in content.named_steps:
                    self.regressor = content.named_steps['regressor']
                
                self.is_loaded = True
                print(f"✅ Modelo Pipeline cargado exitosamente")
                return True
            
            # Verificar si es un modelo directo
            elif hasattr(content, 'predict'):
                self.model = content
                self.model_type = 'direct_model'
                self.is_loaded = True
                print(f"✅ Modelo directo cargado exitosamente")
                return True
            
            else:
                print(f"❌ Tipo de contenido no reconocido: {type(content)}")
                return False
                
        except Exception as e:
            print(f"❌ Error al cargar el modelo: {e}")
            return False
    
    def predecir_simple(self, datos: pd.DataFrame) -> Optional[float]:
        """
        Hacer predicción simple usando lógica de reglas
        
        Args:
            datos: DataFrame con los datos de entrada
            
        Returns:
            float: Predicción basada en reglas o None si hay error
        """
        if not self.is_loaded:
            if not self.cargar_modelo():
                return None
        
        try:
            # Si solo tenemos metadatos, usar lógica de reglas
            if self.model_type == 'metadata_only':
                return self._predecir_con_reglas(datos)
            
            # Si tenemos modelo real, usarlo
            elif self.model and hasattr(self.model, 'predict'):
                prediccion = self.model.predict(datos)
                return float(prediccion[0])
            
            else:
                print("❌ No se puede hacer predicción: modelo no disponible")
                return None
                
        except Exception as e:
            print(f"❌ Error en predicción simple: {e}")
            return None
    
    def _predecir_con_reglas(self, datos: pd.DataFrame) -> float:
        """
        Predicción basada en reglas cuando no hay modelo entrenado
        
        Args:
            datos: DataFrame con los datos de entrada
            
        Returns:
            float: Predicción basada en reglas
        """
        try:
            # Extraer datos
            curso = datos['Cursos'].iloc[0]
            docente = datos['DOCENTE'].iloc[0]
            vacantes = datos['Nro Vacante'].iloc[0]
            
            # Reglas basadas en el docente
            docentes_populares = [
                "MONDRAGON MONDRAGON MARGARITA DELICIA",
                "REYNA MONTEVERDE, TINO EDUARDO"
            ]
            
            docentes_faciles = [
                "ACOSTA DE LA CRUZ, PEDRO RAUL",
                "KALA BEJAR, LOURDES CRISTINA",
                "LLANOS PANDURO, JORGE DANIEL"
            ]
            
            # Calcular probabilidad base
            probabilidad_base = 50.0
            
            # Ajustar por docente
            if docente.upper() in [d.upper() for d in docentes_populares]:
                probabilidad_base = 85.0  # Docente muy popular
            elif docente.upper() in [d.upper() for d in docentes_faciles]:
                probabilidad_base = 25.0  # Docente fácil de conseguir
            
            # Ajustar por número de vacantes
            if vacantes > 50:
                probabilidad_base += 10
            elif vacantes < 20:
                probabilidad_base -= 15
            
            # Ajustar por tipo de curso
            if 'SI' in curso.upper():
                probabilidad_base += 5  # Cursos de sistemas suelen ser populares
            elif 'MAT' in curso.upper():
                probabilidad_base -= 5  # Matemáticas suelen ser difíciles
            
            # Asegurar que esté en rango válido
            probabilidad_base = max(5.0, min(95.0, probabilidad_base))
            
            return probabilidad_base
            
        except Exception as e:
            print(f"❌ Error en predicción con reglas: {e}")
            return 50.0  # Valor por defecto
    
    def predecir_con_intervalo(self, datos: pd.DataFrame) -> Optional[Dict[str, float]]:
        """
        Hacer predicción con intervalo de confianza
        
        Args:
            datos: DataFrame con los datos de entrada
            
        Returns:
            Dict con predicción, media, desviación e intervalo
        """
        if not self.is_loaded:
            if not self.cargar_modelo():
                return None
        
        try:
            # Predicción base
            prediccion_base = self.predecir_simple(datos)
            if prediccion_base is None:
                return None
            
            # Si tenemos modelo real con RandomForest, calcular intervalo
            if (self.model_type == 'pipeline' and 
                self.regressor and 
                self.preprocessor and 
                hasattr(self.regressor, 'estimators_')):
                
                # Transformar datos
                datos_procesados = self.preprocessor.transform(datos)
                
                # Predicciones individuales de cada árbol
                predicciones_individuales = []
                for tree in self.regressor.estimators_:
                    try:
                        pred = tree.predict(datos_procesados)
                        predicciones_individuales.append(pred[0])
                    except:
                        continue
                
                if predicciones_individuales:
                    predicciones_array = np.array(predicciones_individuales)
                    media = predicciones_array.mean()
                    desviacion = predicciones_array.std()
                    
                    return {
                        'prediccion': prediccion_base,
                        'media': media,
                        'desviacion': desviacion,
                        'intervalo_inferior': media - desviacion,
                        'intervalo_superior': media + desviacion,
                        'rango_min': predicciones_array.min(),
                        'rango_max': predicciones_array.max(),
                        'num_arboles': len(predicciones_individuales),
                        'tipo_modelo': 'random_forest'
                    }
            
            # Si no se puede calcular intervalo real, simular uno
            else:
                # Simular incertidumbre basada en el tipo de predicción
                if self.model_type == 'metadata_only':
                    # Para predicciones basadas en reglas, simular incertidumbre
                    desviacion_simulada = prediccion_base * 0.15  # 15% de incertidumbre
                else:
                    desviacion_simulada = prediccion_base * 0.10  # 10% de incertidumbre
                
                return {
                    'prediccion': prediccion_base,
                    'media': prediccion_base,
                    'desviacion': desviacion_simulada,
                    'intervalo_inferior': prediccion_base - desviacion_simulada,
                    'intervalo_superior': prediccion_base + desviacion_simulada,
                    'rango_min': prediccion_base - desviacion_simulada,
                    'rango_max': prediccion_base + desviacion_simulada,
                    'num_arboles': 1,
                    'tipo_modelo': self.model_type
                }
            
        except Exception as e:
            print(f"❌ Error en predicción con intervalo: {e}")
            return None
    
    def obtener_informacion_modelo(self) -> Dict:
        """
        Obtener información del modelo
        
        Returns:
            Dict con información del modelo
        """
        if not self.is_loaded:
            return {'error': 'Modelo no cargado'}
        
        info = {
            'tipo_modelo': self.model_type,
            'cargado': self.is_loaded,
            'ruta_archivo': self.model_path
        }
        
        if self.feature_names:
            info['nombres_caracteristicas'] = self.feature_names
        
        if self.model and hasattr(self.model, 'named_steps'):
            info['pasos_pipeline'] = list(self.model.named_steps.keys())
        
        if self.regressor:
            info['tipo_regresor'] = str(type(self.regressor))
            if hasattr(self.regressor, 'n_estimators'):
                info['num_arboles'] = self.regressor.n_estimators
            if hasattr(self.regressor, 'max_depth'):
                info['profundidad_maxima'] = self.regressor.max_depth
        
        return info
    
    def validar_datos(self, datos: pd.DataFrame) -> bool:
        """
        Validar que los datos tengan el formato correcto
        
        Args:
            datos: DataFrame a validar
            
        Returns:
            bool: True si los datos son válidos
        """
        try:
            # Verificar columnas requeridas
            columnas_requeridas = ['Cursos', 'DOCENTE', 'Nro Vacante']
            columnas_faltantes = [col for col in columnas_requeridas if col not in datos.columns]
            
            if columnas_faltantes:
                print(f"❌ Columnas faltantes: {columnas_faltantes}")
                return False
            
            # Verificar que no haya valores nulos
            if datos.isnull().any().any():
                print("❌ Los datos contienen valores nulos")
                return False
            
            # Verificar tipos de datos
            if not datos['Nro Vacante'].dtype in ['int64', 'float64']:
                print("❌ La columna 'Nro Vacante' debe ser numérica")
                return False
            
            print("✅ Datos válidos")
            return True
            
        except Exception as e:
            print(f"❌ Error en validación de datos: {e}")
            return False

# Función de ejemplo de uso
def ejemplo_uso():
    """Ejemplo de cómo usar el lector mejorado"""
    print("=== EJEMPLO DE USO DEL LECTOR MEJORADO ===")
    
    # Crear instancia del lector
    lector = ModeloMatriculadosLector()
    
    # Cargar modelo
    if lector.cargar_modelo():
        # Información del modelo
        info = lector.obtener_informacion_modelo()
        print(f"Información del modelo: {info}")
        
        # Datos de prueba
        datos_prueba = pd.DataFrame({
            'Cursos': ['SI505'],
            'DOCENTE': ['REYNA MONTEVERDE, TINO EDUARDO'],
            'Nro Vacante': [40]
        })
        
        print(f"\nDatos de prueba:")
        print(datos_prueba)
        
        # Validar datos
        if lector.validar_datos(datos_prueba):
            # Predicción simple
            prediccion = lector.predecir_simple(datos_prueba)
            print(f"\nPredicción simple: {prediccion:.2f}%")
            
            # Predicción con intervalo
            resultado = lector.predecir_con_intervalo(datos_prueba)
            if resultado:
                print(f"\nPredicción con intervalo:")
                print(f"  Predicción: {resultado['prediccion']:.2f}%")
                print(f"  Media: {resultado['media']:.2f}%")
                print(f"  Desviación: {resultado['desviacion']:.2f}%")
                print(f"  Intervalo: {resultado['intervalo_inferior']:.2f}% a {resultado['intervalo_superior']:.2f}%")
                print(f"  Rango: {resultado['rango_min']:.2f}% a {resultado['rango_max']:.2f}%")
                print(f"  Tipo de modelo: {resultado['tipo_modelo']}")
                print(f"  Árboles utilizados: {resultado['num_arboles']}")

if __name__ == "__main__":
    ejemplo_uso()
