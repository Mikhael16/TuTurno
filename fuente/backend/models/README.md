# Sistema de Modelos de Predicción

Este directorio contiene los modelos de machine learning para predicciones en el sistema de matriculación.

## Archivos

### `modelo_matriculados.pkl`
- **Tamaño**: 9.88 MB
- **Contenido**: Actualmente contiene solo metadatos (nombres de columnas)
- **Columnas**: `['Cursos', 'DOCENTE', 'Nro Vacante']`
- **Estado**: ⚠️ **Incompleto** - Solo contiene metadatos, no el modelo entrenado

### `modelo_resultadosseccion.pkl`
- **Tamaño**: 21.28 MB
- **Contenido**: Modelo completo (probablemente)
- **Estado**: ✅ **Disponible**

### `lector.py`
- **Estado**: ❌ **Obsoleto** - Código incompleto con errores
- **Problemas**:
  - Variables no definidas (`pd`, `model_pipeline`)
  - No maneja errores de compatibilidad de versiones
  - Código no funcional

### `lector_mejorado.py`
- **Estado**: ✅ **Funcional** - Versión mejorada del lector
- **Características**:
  - Manejo robusto de errores
  - Compatibilidad con diferentes versiones de scikit-learn
  - Predicción basada en reglas cuando no hay modelo entrenado
  - Clase orientada a objetos
  - Documentación completa

## Funcionalidades del Lector Mejorado

### Clase `ModeloMatriculadosLector`

```python
# Inicializar
lector = ModeloMatriculadosLector()

# Cargar modelo
lector.cargar_modelo()

# Predicción simple
prediccion = lector.predecir_simple(datos)

# Predicción con intervalo de confianza
resultado = lector.predecir_con_intervalo(datos)

# Información del modelo
info = lector.obtener_informacion_modelo()

# Validar datos
valido = lector.validar_datos(datos)
```

### Predicción Basada en Reglas

Cuando el modelo entrenado no está disponible, el sistema usa reglas heurísticas:

#### Factores Considerados:
1. **Docente**:
   - Docentes populares: +85% probabilidad
   - Docentes fáciles: +25% probabilidad
   - Otros: +50% probabilidad base

2. **Vacantes**:
   - >50 vacantes: +10%
   - <20 vacantes: -15%

3. **Tipo de Curso**:
   - Cursos SI (Sistemas): +5%
   - Cursos MAT (Matemáticas): -5%

## Endpoints del Backend

### 1. Predicción Individual
```
GET /api/prediccion-matriculados
```
**Parámetros**:
- `codigo_curso`: Código del curso
- `nombre_profesor`: Nombre del profesor
- `num_vacantes`: Número de vacantes (opcional, default: 40)

### 2. Predicción Múltiple
```
POST /api/prediccion-multiple-secciones
```
**Body**: Lista de secciones con `codigo_curso`, `profesor`, `vacantes`

### 3. Estado del Modelo
```
GET /api/modelo-estado
```
**Respuesta**: Información sobre disponibilidad y tipo de modelo

## Ejemplo de Uso

```python
from models.lector_mejorado import ModeloMatriculadosLector
import pandas as pd

# Crear lector
lector = ModeloMatriculadosLector()

# Datos de prueba
datos = pd.DataFrame({
    'Cursos': ['SI505'],
    'DOCENTE': ['REYNA MONTEVERDE, TINO EDUARDO'],
    'Nro Vacante': [40]
})

# Hacer predicción
resultado = lector.predecir_con_intervalo(datos)

print(f"Probabilidad: {resultado['prediccion']:.2f}%")
print(f"Matriculados estimados: {int(40 * resultado['prediccion'] / 100)}")
```

## Problemas Identificados

### 1. Modelo Incompleto
- El archivo `modelo_matriculados.pkl` solo contiene metadatos
- Necesita ser reentrenado o reemplazado con el modelo completo

### 2. Compatibilidad de Versiones
- Advertencias de scikit-learn sobre versiones incompatibles
- El modelo fue entrenado con scikit-learn 1.6.1 pero se ejecuta con 1.2.2

### 3. Código Original Obsoleto
- `lector.py` tiene errores y no es funcional
- Falta manejo de errores y validaciones

## Recomendaciones

### 1. Reentrenar el Modelo
```python
# Ejemplo de cómo debería ser el entrenamiento
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
import pickle

# Crear pipeline
pipeline = Pipeline([
    ('preprocessor', OneHotEncoder()),
    ('regressor', RandomForestRegressor(n_estimators=100))
])

# Entrenar modelo
pipeline.fit(X_train, y_train)

# Guardar modelo completo
with open('modelo_matriculados.pkl', 'wb') as f:
    pickle.dump(pipeline, f)
```

### 2. Actualizar Dependencias
- Actualizar scikit-learn a la versión más reciente
- Asegurar compatibilidad entre versiones

### 3. Implementar Tests
- Crear tests unitarios para el lector
- Validar predicciones con datos conocidos

## Estado Actual

✅ **Funcional**: El sistema funciona con predicciones basadas en reglas
⚠️ **Limitado**: No usa modelo de ML real
❌ **Incompleto**: Modelo entrenado no disponible

El sistema está listo para usar y puede proporcionar predicciones útiles basadas en reglas heurísticas mientras se resuelve el problema del modelo entrenado. 