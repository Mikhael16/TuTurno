#!/usr/bin/env python3
"""
Módulo para predicciones usando el modelo de matriculados
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional
import sys
import os

# Agregar el directorio de modelos al path
sys.path.append(os.path.join(os.path.dirname(__file__), 'models'))

from models.lector_mejorado import ModeloMatriculadosLector

class ModelPredictor:
    """Clase para hacer predicciones usando el modelo de matriculados"""
    
    def __init__(self):
        """Inicializar el predictor"""
        self.lector = ModeloMatriculadosLector()
        self.model_loaded = self.lector.cargar_modelo()
        
    def predecir_matriculados(self, 
                             codigo_curso: str, 
                             nombre_profesor: str, 
                             num_vacantes: int) -> Optional[Dict]:
        """
        Predecir número de matriculados para una sección
        
        Args:
            codigo_curso: Código del curso
            nombre_profesor: Nombre del profesor
            num_vacantes: Número de vacantes disponibles
            
        Returns:
            Dict con predicción y estadísticas
        """
        try:
            # Crear DataFrame con los datos
            datos = pd.DataFrame({
                'Cursos': [codigo_curso],
                'DOCENTE': [nombre_profesor],
                'Nro Vacante': [num_vacantes]
            })
            
            # Validar datos
            if not self.lector.validar_datos(datos):
                return None
            
            # Hacer predicción
            resultado = self.lector.predecir_con_intervalo(datos)
            
            if resultado:
                # Calcular número estimado de matriculados
                probabilidad = resultado['prediccion'] / 100.0
                matriculados_estimados = int(num_vacantes * probabilidad)
                
                # Agregar información adicional
                resultado.update({
                    'codigo_curso': codigo_curso,
                    'nombre_profesor': nombre_profesor,
                    'num_vacantes': num_vacantes,
                    'matriculados_estimados': matriculados_estimados,
                    'probabilidad_porcentaje': resultado['prediccion'],
                    'probabilidad_decimal': probabilidad
                })
                
                return resultado
            
            return None
            
        except Exception as e:
            print(f"❌ Error en predicción de matriculados: {e}")
            return None
    
    def predecir_multiple_secciones(self, secciones: List[Dict]) -> List[Dict]:
        """
        Predecir para múltiples secciones
        
        Args:
            secciones: Lista de diccionarios con datos de secciones
            
        Returns:
            Lista de resultados de predicción
        """
        resultados = []
        
        for seccion in secciones:
            resultado = self.predecir_matriculados(
                codigo_curso=seccion.get('codigo_curso'),
                nombre_profesor=seccion.get('profesor'),
                num_vacantes=seccion.get('vacantes', 40)
            )
            
            if resultado:
                resultados.append(resultado)
        
        return resultados
    
    def obtener_estadisticas_modelo(self) -> Dict:
        """
        Obtener estadísticas del modelo
        
        Returns:
            Dict con información del modelo
        """
        return self.lector.obtener_informacion_modelo()
    
    def esta_disponible(self) -> bool:
        """
        Verificar si el modelo está disponible
        
        Returns:
            bool: True si el modelo está cargado y disponible
        """
        return self.model_loaded

# Instancia global del predictor
predictor = ModelPredictor()

def get_predictor() -> ModelPredictor:
    """
    Obtener la instancia global del predictor
    
    Returns:
        ModelPredictor: Instancia del predictor
    """
    return predictor 