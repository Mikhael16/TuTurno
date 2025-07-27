# Gestión de Cruces - Dashboard Mejorado

## 📋 Resumen de Mejoras Implementadas

### 🎯 Funcionalidades Agregadas

#### 1. **Dashboard Inicial Mejorado**
- **Diagrama circular** de distribución de tipos de cruces (Críticos, Peligrosos, Teóricos)
- **Gráfico de evolución** de cruces por ciclo
- **Controles de ciclo** con selector de período (2024-1, 2024-2, 2025-1, 2025-2)
- **Botón de histórico** para alternar entre datos actuales e históricos

#### 2. **Top 20 Profesores con más Cruces**
- Tabla con ranking de profesores
- Muestra total de cruces, cruces críticos y peligrosos
- Soporte para datos históricos (todos los ciclos) o actuales (ciclo específico)
- Chips de colores para identificar tipos de cruces

#### 3. **Top 20 Cursos con más Cruces**
- Tabla con ranking de cursos
- Muestra código, nombre, total de cruces, cruces críticos y número de secciones
- Soporte para datos históricos o actuales
- Información detallada de cada curso

#### 4. **Sistema de Sugerencias Inteligente**
- **Sugerencias de cursos**: Búsqueda por código o nombre
- **Sugerencias de profesores**: Búsqueda por nombre
- Funciona en todos los campos de entrada (Búsqueda Avanzada, Cruces por Profesor, Cruces por Curso)
- Se activa al escribir 2 o más caracteres
- Se cierra automáticamente al hacer clic fuera

### 🔧 Nuevos Endpoints del Backend

#### `/api/top-profesores-cruces`
```http
GET /api/top-profesores-cruces?ciclo=241&historico=false&limit=20
```
**Parámetros:**
- `ciclo`: Código del ciclo (241, 242, 251, 252)
- `historico`: Boolean para datos históricos (true) o actuales (false)
- `limit`: Número máximo de resultados (default: 20)

#### `/api/top-cursos-cruces`
```http
GET /api/top-cursos-cruces?ciclo=241&historico=false&limit=20
```
**Parámetros:**
- `ciclo`: Código del ciclo
- `historico`: Boolean para datos históricos o actuales
- `limit`: Número máximo de resultados

#### `/api/sugerir-profesores`
```http
GET /api/sugerir-profesores?prefijo=Juan&limit=10
```
**Parámetros:**
- `prefijo`: Texto para buscar profesores
- `limit`: Número máximo de sugerencias

#### `/api/sugerir-cursos-cruces`
```http
GET /api/sugerir-cursos-cruces?prefijo=MAT&limit=10
```
**Parámetros:**
- `prefijo`: Texto para buscar cursos (código o nombre)
- `limit`: Número máximo de sugerencias

### 🎨 Mejoras en la Interfaz

#### **Dashboard Principal**
- **Controles superiores**: Selector de ciclo y botón de histórico
- **Estadísticas en tarjetas**: Total, Críticos, Peligrosos, Teóricos
- **Gráficos interactivos**: Doughnut chart y línea de evolución
- **Tablas de ranking**: Top profesores y cursos con scroll

#### **Sistema de Sugerencias**
- **Diseño consistente**: Mismo estilo en todas las secciones
- **Responsive**: Se adapta al modo oscuro/claro
- **Interactivo**: Hover effects y selección fácil
- **Auto-cierre**: Se cierra al hacer clic fuera

#### **Navegación Mejorada**
- **Botones de navegación**: Entre dashboard, búsqueda, por profesor, por curso
- **Estado persistente**: Mantiene selecciones entre navegaciones
- **Loading states**: Indicadores de carga en todas las operaciones

### 📊 Análisis del HorarioSemanal.jsx

El componente `HorarioSemanal.jsx` es una implementación muy sofisticada que incluye:

#### **Características Técnicas:**
- **Sistema de horas**: Array de horas de 7:00 a 23:00
- **Detección de cruces**: Función `isOverlapped` para detectar superposiciones
- **Colores dinámicos**: Hash function para generar colores únicos por curso
- **RowSpan inteligente**: Para clases que duran múltiples horas
- **Modal interactivo**: Detalles al hacer clic en una clase

#### **Funcionalidades:**
- **Renderizado dinámico**: Adapta el tamaño según duración de clases
- **Responsive design**: Soporte para modo oscuro y diferentes tamaños
- **Interactividad**: Hover effects y modal con detalles
- **Optimización**: Evita re-renderizados innecesarios

### 🚀 Instalación y Uso

#### **1. Backend**
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### **2. Frontend**
```bash
cd frontend
npm run dev
```

#### **3. Pruebas**
```bash
python test_cruces_mejorado.py
```

### 🎯 Uso del Dashboard

#### **Dashboard Principal**
1. **Seleccionar ciclo**: Usar el dropdown superior
2. **Alternar histórico**: Botón "Actual/Histórico"
3. **Ver estadísticas**: Tarjetas con números actualizados
4. **Analizar gráficos**: Doughnut chart y evolución
5. **Revisar rankings**: Tablas de top profesores y cursos

#### **Búsqueda con Sugerencias**
1. **Escribir en campos**: Las sugerencias aparecen automáticamente
2. **Seleccionar sugerencia**: Hacer clic en la opción deseada
3. **Buscar cruces**: Los resultados se muestran en modal
4. **Navegar entre secciones**: Usar botones de navegación

### 🔍 Reglas de Cruces Implementadas

#### **Cruces Críticos**
- Práctica + Práctica
- Laboratorio + Laboratorio
- Práctica + Laboratorio

#### **Cruces Peligrosos**
- Teoría + Práctica/Laboratorio (≤ 2 horas)
- Teoría + Teoría (> 4 horas)

#### **Cruces Teóricos**
- Teoría + Teoría (≤ 4 horas)

### 📈 Datos Mostrados

#### **Dashboard**
- Total de cruces por tipo
- Evolución temporal
- Top 20 profesores y cursos
- Distribución por días

#### **Búsquedas**
- Cruces específicos por curso/profesor
- Detalles de horarios
- Clasificación de tipos de cruce
- Información de aulas y secciones

### 🎨 Características de Diseño

- **Modo oscuro/claro**: Soporte completo
- **Responsive**: Adaptable a diferentes pantallas
- **Animaciones**: Transiciones suaves
- **Consistencia**: Mismo estilo en toda la aplicación
- **Accesibilidad**: Contraste y navegación por teclado

### 🔧 Tecnologías Utilizadas

- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Frontend**: React, Material-UI, Chart.js
- **Gráficos**: React-Chartjs-2 (Doughnut, Line)
- **Estado**: React Hooks (useState, useEffect)
- **HTTP**: Axios para comunicación con API

### 📝 Notas de Implementación

1. **Sugerencias**: Se activan con 2+ caracteres
2. **Auto-cierre**: Sugerencias se cierran al hacer clic fuera
3. **Caching**: Los tops se recargan al cambiar ciclo/histórico
4. **Error handling**: Manejo de errores en todas las operaciones
5. **Loading states**: Indicadores visuales durante cargas

### 🎯 Próximas Mejoras Sugeridas

1. **Exportación**: PDF/Excel de reportes
2. **Filtros avanzados**: Por departamento, carrera, etc.
3. **Notificaciones**: Alertas de cruces críticos
4. **Análisis predictivo**: Predicción de cruces futuros
5. **Integración**: Con sistema de horarios existente

---

**Desarrollado con ❤️ para la gestión eficiente de cruces académicos** 