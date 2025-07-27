-- =====================================================
-- ANÁLISIS DE CRUCES POR PROFESOR - ESTRUCTURA DE DATOS
-- =====================================================

-- 1. Verificar estructura de las tablas principales
SELECT '=== ESTRUCTURA DE TABLAS ===' as info;

-- Tabla cursoseccion
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cursoseccion' 
ORDER BY ordinal_position;

-- Tabla cursoseccionprofesor
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cursoseccionprofesor' 
ORDER BY ordinal_position;

-- Tabla profesor
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profesor' 
ORDER BY ordinal_position;

-- Tabla curso
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'curso' 
ORDER BY ordinal_position;

-- =====================================================
-- 2. ANÁLISIS DE RELACIÓN SECCIÓN-PROFESOR
-- =====================================================

SELECT '=== ANÁLISIS SECCIÓN-PROFESOR ===' as info;

-- Ver cuántos profesores tiene cada sección
SELECT 
    cs.codigo_curso,
    cs.letra_seccion,
    cs.relativo as ciclo,
    COUNT(DISTINCT csp.codprofesor) as total_profesores,
    STRING_AGG(DISTINCT p.nombre, ', ') as profesores
FROM cursoseccion cs
LEFT JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
LEFT JOIN profesor p ON csp.codprofesor = p.codprofesor
WHERE cs.relativo = '241'
GROUP BY cs.codigo_curso, cs.letra_seccion, cs.relativo
HAVING COUNT(DISTINCT csp.codprofesor) > 1
ORDER BY total_profesores DESC, cs.codigo_curso;

-- Ver clases específicas de un profesor en una sección
SELECT 
    cs.codigo_curso,
    cs.letra_seccion,
    p.nombre as profesor,
    csp.dia,
    csp.hora_inicio,
    csp.hora_fin,
    csp.tipoclase,
    csp.aula
FROM cursoseccion cs
INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
WHERE cs.relativo = '241' 
    AND cs.codigo_curso = 'MAT101'  -- Ejemplo
    AND cs.letra_seccion = 'A'      -- Ejemplo
ORDER BY p.nombre, csp.dia, csp.hora_inicio;

-- =====================================================
-- 3. DETERMINAR CURSOS DE INTERÉS POR CICLO
-- =====================================================

SELECT '=== CURSOS DE INTERÉS POR CICLO ===' as info;

-- Mapeo de ciclos académicos
-- Ciclo 1: 241, 242
-- Ciclo 2: 251, 252  
-- Ciclo 3: 261, 262
-- Ciclo 4: 271, 272
-- Ciclo 5: 281, 282
-- Ciclo 6: 291, 292

-- Ver todos los ciclos disponibles
SELECT DISTINCT 
    cs.relativo,
    COUNT(DISTINCT cs.codigo_curso) as total_cursos,
    COUNT(DISTINCT cs.id) as total_secciones
FROM cursoseccion cs
GROUP BY cs.relativo
ORDER BY cs.relativo;

-- Función para determinar cursos de interés
-- Para ciclo 4 (271, 272): interés en ciclos 2, 3, 5, 6
-- Para ciclo 5 (281, 282): interés en ciclos 3, 4, 6
-- Para ciclo 6 (291, 292): interés en ciclos 4, 5

-- Ejemplo: Cursos de interés para ciclo 4 (271)
SELECT 
    'Ciclo 4 (271) - Cursos de interés' as info,
    cs.relativo as ciclo_interes,
    COUNT(DISTINCT cs.codigo_curso) as cursos_disponibles
FROM cursoseccion cs
WHERE cs.relativo IN ('251', '252', '261', '262', '281', '282')  -- Ciclos 2, 3, 5, 6
GROUP BY cs.relativo
ORDER BY cs.relativo;

-- =====================================================
-- 4. CRUCES POR CLASE ESPECÍFICA DEL PROFESOR
-- =====================================================

SELECT '=== CRUCES POR CLASE ESPECÍFICA ===' as info;

-- Ejemplo: Cruces de un profesor específico en su clase específica
WITH profesor_clase AS (
    SELECT 
        cs.codigo_curso,
        cs.letra_seccion,
        cs.relativo as ciclo_curso,
        p.codprofesor,
        p.nombre as nombre_profesor,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        csp.aula
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE cs.relativo = '271'  -- Ciclo 4
        AND p.nombre ILIKE '%Juan%'  -- Ejemplo de profesor
),
cursos_interes AS (
    SELECT 
        cs.codigo_curso,
        cs.letra_seccion,
        cs.relativo as ciclo_curso,
        p.codprofesor,
        p.nombre as nombre_profesor,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        csp.aula
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE cs.relativo IN ('251', '252', '261', '262', '281', '282')  -- Ciclos de interés para ciclo 4
)
SELECT 
    pc.codigo_curso as curso_profesor,
    pc.letra_seccion as seccion_profesor,
    pc.nombre_profesor,
    pc.dia,
    pc.hora_inicio as hora_inicio_profesor,
    pc.hora_fin as hora_fin_profesor,
    pc.tipoclase as tipo_profesor,
    ci.codigo_curso as curso_cruce,
    ci.letra_seccion as seccion_cruce,
    ci.nombre_profesor as profesor_cruce,
    ci.hora_inicio as hora_inicio_cruce,
    ci.hora_fin as hora_fin_cruce,
    ci.tipoclase as tipo_cruce,
    EXTRACT(EPOCH FROM (
        LEAST(pc.hora_fin::time, ci.hora_fin::time) - 
        GREATEST(pc.hora_inicio::time, ci.hora_inicio::time)
    )) / 3600 as horas_cruce,
    CASE 
        WHEN pc.tipoclase IN ('PRA', 'LAB') AND ci.tipoclase IN ('PRA', 'LAB') THEN 'Crítico'
        WHEN (pc.tipoclase = 'T' AND ci.tipoclase IN ('PRA', 'LAB')) OR (ci.tipoclase = 'T' AND pc.tipoclase IN ('PRA', 'LAB')) THEN
            CASE WHEN EXTRACT(EPOCH FROM (
                LEAST(pc.hora_fin::time, ci.hora_fin::time) - 
                GREATEST(pc.hora_inicio::time, ci.hora_inicio::time)
            )) / 3600 <= 2 THEN 'Peligroso' ELSE 'Crítico' END
        WHEN pc.tipoclase = 'T' AND ci.tipoclase = 'T' THEN
            CASE WHEN EXTRACT(EPOCH FROM (
                LEAST(pc.hora_fin::time, ci.hora_fin::time) - 
                GREATEST(pc.hora_inicio::time, ci.hora_inicio::time)
            )) / 3600 <= 4 THEN 'Teórico' ELSE 'Peligroso' END
        ELSE 'Teórico'
    END as tipo_cruce_clasificado
FROM profesor_clase pc
INNER JOIN cursos_interes ci ON pc.dia = ci.dia
    AND (
        (pc.hora_inicio < ci.hora_fin AND ci.hora_inicio < pc.hora_fin)
    )
ORDER BY pc.dia, pc.hora_inicio;

-- =====================================================
-- 5. CONTEO DE CRUCES POR PROFESOR (CLASE ESPECÍFICA)
-- =====================================================

SELECT '=== CONTEO DE CRUCES POR PROFESOR ===' as info;

-- Función para obtener ciclos de interés según el ciclo del profesor
-- Esta lógica se implementará en el backend
SELECT 
    'Ciclos de interés por ciclo académico:' as info,
    'Ciclo 1 (241,242): interés en 2,3' as ciclo1,
    'Ciclo 2 (251,252): interés en 1,3,4' as ciclo2,
    'Ciclo 3 (261,262): interés en 2,4,5' as ciclo3,
    'Ciclo 4 (271,272): interés en 2,3,5,6' as ciclo4,
    'Ciclo 5 (281,282): interés en 3,4,6' as ciclo5,
    'Ciclo 6 (291,292): interés en 4,5' as ciclo6;

-- Ejemplo de conteo de cruces por profesor (clase específica)
WITH profesor_clases AS (
    SELECT 
        cs.codigo_curso,
        cs.letra_seccion,
        cs.relativo as ciclo_curso,
        p.codprofesor,
        p.nombre as nombre_profesor,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        csp.aula
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE cs.relativo = '271'  -- Ciclo 4
),
cursos_interes AS (
    SELECT 
        cs.codigo_curso,
        cs.letra_seccion,
        cs.relativo as ciclo_curso,
        p.codprofesor,
        p.nombre as nombre_profesor,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        csp.aula
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE cs.relativo IN ('251', '252', '261', '262', '281', '282')  -- Ciclos de interés para ciclo 4
),
cruces AS (
    SELECT 
        pc.codprofesor,
        pc.nombre_profesor,
        pc.codigo_curso,
        pc.letra_seccion,
        pc.dia,
        pc.hora_inicio,
        pc.hora_fin,
        pc.tipoclase,
        ci.codigo_curso as curso_cruce,
        ci.nombre_profesor as profesor_cruce,
        ci.tipoclase as tipo_cruce,
        CASE 
            WHEN pc.tipoclase IN ('PRA', 'LAB') AND ci.tipoclase IN ('PRA', 'LAB') THEN 'Crítico'
            WHEN (pc.tipoclase = 'T' AND ci.tipoclase IN ('PRA', 'LAB')) OR (ci.tipoclase = 'T' AND pc.tipoclase IN ('PRA', 'LAB')) THEN
                CASE WHEN EXTRACT(EPOCH FROM (
                    LEAST(pc.hora_fin::time, ci.hora_fin::time) - 
                    GREATEST(pc.hora_inicio::time, ci.hora_inicio::time)
                )) / 3600 <= 2 THEN 'Peligroso' ELSE 'Crítico' END
            WHEN pc.tipoclase = 'T' AND ci.tipoclase = 'T' THEN
                CASE WHEN EXTRACT(EPOCH FROM (
                    LEAST(pc.hora_fin::time, ci.hora_fin::time) - 
                    GREATEST(pc.hora_inicio::time, ci.hora_inicio::time)
                )) / 3600 <= 4 THEN 'Teórico' ELSE 'Peligroso' END
            ELSE 'Teórico'
        END as tipo_cruce_clasificado
    FROM profesor_clases pc
    INNER JOIN cursos_interes ci ON pc.dia = ci.dia
        AND (
            (pc.hora_inicio < ci.hora_fin AND ci.hora_inicio < pc.hora_fin)
        )
)
SELECT 
    codprofesor,
    nombre_profesor,
    COUNT(*) as total_cruces,
    COUNT(CASE WHEN tipo_cruce_clasificado = 'Crítico' THEN 1 END) as cruces_criticos,
    COUNT(CASE WHEN tipo_cruce_clasificado = 'Peligroso' THEN 1 END) as cruces_peligrosos,
    COUNT(CASE WHEN tipo_cruce_clasificado = 'Teórico' THEN 1 END) as cruces_teoricos,
    COUNT(DISTINCT codigo_curso) as cursos_afectados,
    COUNT(DISTINCT dia) as dias_afectados
FROM cruces
GROUP BY codprofesor, nombre_profesor
ORDER BY total_cruces DESC;

-- =====================================================
-- 6. VERIFICACIÓN DE DATOS DE PRUEBA
-- =====================================================

SELECT '=== VERIFICACIÓN DE DATOS ===' as info;

-- Verificar que hay datos en las tablas
SELECT 
    'cursoseccion' as tabla,
    COUNT(*) as total_registros,
    COUNT(DISTINCT codigo_curso) as cursos_unicos,
    COUNT(DISTINCT relativo) as ciclos_unicos
FROM cursoseccion
UNION ALL
SELECT 
    'cursoseccionprofesor' as tabla,
    COUNT(*) as total_registros,
    COUNT(DISTINCT codprofesor) as profesores_unicos,
    COUNT(DISTINCT idcursoseccion) as secciones_unicas
FROM cursoseccionprofesor
UNION ALL
SELECT 
    'profesor' as tabla,
    COUNT(*) as total_registros,
    COUNT(DISTINCT codprofesor) as profesores_unicos,
    0 as dummy
FROM profesor
UNION ALL
SELECT 
    'curso' as tabla,
    COUNT(*) as total_registros,
    COUNT(DISTINCT codigo) as cursos_unicos,
    0 as dummy
FROM curso; 