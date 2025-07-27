# Sistema de Gestión de Cruces

## 📋 Descripción

El Sistema de Gestión de Cruces es una funcionalidad completa para monitorear y analizar conflictos de horarios en la universidad. Permite detectar cruces entre cursos según las reglas establecidas y proporciona herramientas de análisis tanto para administradores como para profesores.

## 🎯 Funcionalidades Implementadas

### 1. Dashboard Principal
- **Estadísticas Generales**: Muestra el total de cruces por tipo (Teóricos, Peligrosos, Críticos)
- **Métricas Visuales**: Cards con iconos y colores diferenciados por tipo de cruce
- **Resumen de Cursos**: Total de cursos y profesores en el sistema

### 2. Análisis por Curso
- **Búsqueda Flexible**: Por código o nombre del curso
- **Selección de Ciclo**: Dropdown con ciclos disponibles
- **Detalle de Cruces**: Lista de todos los cruces del curso seleccionado
- **Clasificación Automática**: Cruces categorizados por tipo

### 3. Análisis por Profesor
- **Búsqueda por Nombre**: Historial completo de cruces del profesor
- **Estadísticas Acumuladas**: Total de cruces por tipo en todos sus cursos
- **Lista de Cursos**: Cursos dictados con sus respectivos cruces

### 4. Detección Automática de Cruces
- **Algoritmo Inteligente**: Detecta superposiciones de horarios
- **Reglas de Negocio**: Aplica las reglas establecidas para clasificar cruces
- **Análisis por Ciclo**: Permite analizar cruces en ciclos específicos

## 🚀 Instalación y Configuración

### 1. Backend (FastAPI)

#### Endpoints Implementados

```python
# Estadísticas generales
GET /api/estadisticas-cruces

# Análisis por curso
GET /api/cruces-por-curso?curso={codigo}&ciclo={ciclo}

# Análisis por profesor
GET /api/cruces-por-profesor?profesor={nombre}

# Detección automática
GET /api/detectar-cruces?ciclo={ciclo}
```

#### Archivos Modificados/Creados

1. **`backend/main.py`**
   - Agregados 4 nuevos endpoints
   - Función `determinar_tipo_cruce()` para clasificar cruces
   - Lógica de detección de superposiciones de horarios

2. **`backend/script_cruces.sql`**
   - Script completo para verificar estructura de tablas
   - Datos de prueba con cruces intencionales
   - Queries de detección automática de cruces

3. **`backend/test_cruces.py`**
   - Script de prueba para verificar endpoints
   - Casos de prueba para validar funcionalidad
   - Reportes detallados de resultados

### 2. Frontend (React + Material-UI)

#### Componentes Creados

1. **`frontend/src/components/GestionCruces.jsx`**
   - Dashboard principal con estadísticas
   - Formularios de búsqueda por curso y profesor
   - Interfaz moderna con animaciones y efectos visuales
   - Responsive design para diferentes dispositivos

#### Archivos Modificados

1. **`frontend/src/components/AdminLayout.jsx`**
   - Agregado botón "Gestión de Cruces" en el sidebar
   - Icono de advertencia (Warning) para el nuevo módulo
   - Navegación integrada al sistema

2. **`frontend/src/App.jsx`**
   - Nueva ruta `/gestion-cruces`
   - Protección de ruta para administradores
   - Importación del componente GestionCruces

## 📊 Reglas de Negocio Implementadas

### Tipos de Cruce

1. **Cruces Teóricos (Azul)**
   - Teoría vs Teoría
   - Máximo 4 horas permitidas
   - Color: #1976d2

2. **Cruces Peligrosos (Naranja)**
   - Teoría vs Práctica/Laboratorio
   - Máximo 2 horas permitidas
   - Color: #ff9800

3. **Cruces Críticos (Rojo)**
   - Práctica vs Práctica
   - Práctica vs Laboratorio
   - No permitidos bajo ningún concepto
   - Color: #f44336

### Lógica de Detección

```python
def determinar_tipo_cruce(horario1, horario2, horas_cruce):
    tipo1 = horario1['tipoclase']
    tipo2 = horario2['tipoclase']
    
    # Regla 1: No se permiten cruces entre práctica-práctica o práctica-laboratorio
    if ((tipo1 in ['PRA', 'LAB'] and tipo2 in ['PRA', 'LAB'])):
        return "Crítico"
    
    # Regla 2: Cruces teoría-práctica limitados a 2 horas
    if ((tipo1 == 'T' and tipo2 in ['PRA', 'LAB']) or 
        (tipo2 == 'T' and tipo1 in ['PRA', 'LAB'])):
        if horas_cruce <= 2:
            return "Peligroso"
        else:
            return "Crítico"
    
    # Regla 3: Cruces teoría-teoría permitidos hasta 4 horas
    if tipo1 == 'T' and tipo2 == 'T':
        if horas_cruce <= 4:
            return "Teórico"
        else:
            return "Peligroso"
    
    return "Teórico"
```

## 🧪 Pruebas y Validación

### 1. Ejecutar Script SQL

```bash
cd backend
psql -U tu_usuario -d tu_base_datos -f script_cruces.sql
```

### 2. Ejecutar Script de Pruebas

```bash
cd backend
python test_cruces.py
```

### 3. Verificar Endpoints

```bash
# Estadísticas generales
curl "http://localhost:8000/api/estadisticas-cruces"

# Búsqueda por curso
curl "http://localhost:8000/api/cruces-por-curso?curso=MAT101&ciclo=241"

# Búsqueda por profesor
curl "http://localhost:8000/api/cruces-por-profesor?profesor=Juan%20García"

# Detección de cruces
curl "http://localhost:8000/api/detectar-cruces?ciclo=241"
```

## 🎨 Características de la Interfaz

### Diseño Visual
- **Gradientes Modernos**: Fondo con gradiente suave
- **Cards con Efectos**: Sombras y bordes redondeados
- **Iconografía Clara**: Iconos diferenciados por tipo de cruce
- **Animaciones**: Transiciones suaves con Fade in
- **Responsive**: Adaptable a móviles y tablets

### Colores y Temas
- **Cruces Teóricos**: Azul (#1976d2)
- **Cruces Peligrosos**: Naranja (#ff9800)
- **Cruces Críticos**: Rojo (#f44336)
- **Fondo**: Gradiente gris claro
- **Cards**: Blanco con transparencia

### Componentes Material-UI
- Cards con elevación y bordes
- Chips para mostrar estadísticas
- Dialogs para mostrar resultados detallados
- FormControls con validación
- Buttons con estados de carga

## 📈 Datos de Prueba Incluidos

### Cursos de Prueba
- **MAT101**: Matemáticas I (Ciclo 1)
- **FIS101**: Física I (Ciclo 2)
- **INF101**: Programación I (Ciclo 1)

### Profesores de Prueba
- **Dr. Juan García**: Departamento MAT
- **Dra. María López**: Departamento FIS
- **Prof. Carlos Rodríguez**: Departamento INF

### Horarios con Cruces Intencionales
- **MAT101A**: Lunes/Miércoles/Viernes 8:00-10:00 (Teoría)
- **FIS101A**: Lunes/Miércoles/Viernes 9:00-11:00 (Teoría) - CRUCE
- **INF101A**: Lunes/Miércoles/Viernes 10:00-12:00 (Práctica) - CRUCE

## 🔧 Configuración de Base de Datos

### Tablas Requeridas
- `curso`: Información de cursos
- `cursoseccion`: Secciones de cursos
- `cursoseccionprofesor`: Horarios y profesores
- `profesor`: Información de profesores

### Campos Importantes
- `tipoclase`: T (Teoría), PRA (Práctica), LAB (Laboratorio)
- `hora_inicio`, `hora_fin`: Horarios en formato HH:MM
- `dia`: Día de la semana
- `ciclo_sistemas`, `ciclo_industrial`, `ciclo_software`: Ciclos por carrera

## 🚀 Uso del Sistema

### 1. Acceso al Dashboard
1. Iniciar sesión como administrador
2. Navegar a "Gestión de Cruces" en el sidebar
3. Ver estadísticas generales en el dashboard

### 2. Análisis por Curso
1. Ingresar código o nombre del curso
2. Seleccionar ciclo
3. Hacer clic en "Buscar Cruces"
4. Revisar resultados en el dialog

### 3. Análisis por Profesor
1. Ingresar nombre del profesor
2. Hacer clic en "Buscar Historial"
3. Revisar estadísticas acumuladas
4. Ver lista de cursos dictados

### 4. Detección Automática
1. Usar endpoint `/api/detectar-cruces`
2. Especificar ciclo a analizar
3. Obtener reporte completo de cruces

## 📝 Notas de Implementación

### Consideraciones Técnicas
- **Performance**: Queries optimizadas para grandes volúmenes de datos
- **Escalabilidad**: Sistema preparado para múltiples ciclos
- **Mantenibilidad**: Código modular y bien documentado
- **Extensibilidad**: Fácil agregar nuevas reglas de cruce

### Mejoras Futuras
- Gráficas interactivas con Chart.js
- Exportación de reportes a PDF/Excel
- Notificaciones automáticas de cruces críticos
- Integración con sistema de matrícula
- Dashboard en tiempo real

## 🐛 Solución de Problemas

### Errores Comunes
1. **"Curso no encontrado"**: Verificar que el curso existe en la base de datos
2. **"Profesor no encontrado"**: Verificar nombre exacto del profesor
3. **"No hay cruces"**: Verificar que existen horarios en el ciclo especificado

### Debugging
1. Revisar logs del servidor FastAPI
2. Ejecutar script de pruebas
3. Verificar estructura de base de datos
4. Comprobar datos de prueba

## 📞 Soporte

Para reportar problemas o solicitar mejoras:
1. Revisar logs del sistema
2. Ejecutar script de pruebas
3. Documentar pasos para reproducir el problema
4. Incluir información de entorno (versiones, configuración)

---

**Sistema de Gestión de Cruces v1.0**  
*Implementado con FastAPI, React y Material-UI* 