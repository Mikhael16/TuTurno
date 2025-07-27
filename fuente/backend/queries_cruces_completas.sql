-- =====================================================
-- SISTEMA DE GESTIÓN DE CRUCES - CONSULTAS SQL COMPLETAS
-- =====================================================
-- Autor: Sistema de Gestión de Cruces
-- Fecha: 2024
-- Descripción: Todas las consultas SQL necesarias para el dashboard y análisis de cruces

-- =====================================================
-- 1. CONSULTAS PARA EL DASHBOARD PRINCIPAL
-- =====================================================

-- 1.1 Estadísticas generales básicas
SELECT '1.1 - Estadísticas generales básicas' as consulta;
SELECT 
    COUNT(DISTINCT cs.codigo_curso) as total_cursos,
    COUNT(DISTINCT csp.codprofesor) as total_profesores,
    COUNT(DISTINCT cs.relativo) as total_ciclos
FROM cursoseccion cs
LEFT JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
WHERE cs.relativo IN ('241', '242', '251', '252');

-- 1.2 Total de secciones por ciclo
SELECT '1.2 - Total de secciones por ciclo' as consulta;
SELECT 
    cs.relativo as ciclo,
    COUNT(DISTINCT cs.id) as total_secciones,
    COUNT(DISTINCT cs.codigo_curso) as total_cursos,
    COUNT(DISTINCT csp.codprofesor) as total_profesores
FROM cursoseccion cs
LEFT JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
WHERE cs.relativo IN ('241', '242', '251', '252')
GROUP BY cs.relativo
ORDER BY cs.relativo;

-- 1.3 Distribución de tipos de clase
SELECT '1.3 - Distribución de tipos de clase' as consulta;
SELECT 
    csp.tipoclase,
    COUNT(*) as cantidad,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as porcentaje
FROM cursoseccionprofesor csp
INNER JOIN cursoseccion cs ON csp.idcursoseccion = cs.id
WHERE cs.relativo IN ('241', '242', '251', '252')
GROUP BY csp.tipoclase
ORDER BY cantidad DESC;

-- =====================================================
-- 2. CONSULTAS PARA DETECCIÓN DE CRUCES
-- =====================================================

-- 2.1 Detectar todos los cruces en un ciclo específico
SELECT '2.1 - Detectar todos los cruces en ciclo 241' as consulta;
WITH horarios AS (
    SELECT 
        cs.codigo_curso,
        c.nombre as nombre_curso,
        cs.letra_seccion,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        p.nombre as nombre_profesor,
        c.ciclo_sistemas,
        c.ciclo_industrial,
        c.ciclo_software,
        csp.aula
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN curso c ON cs.codigo_curso = c.codigo
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE cs.relativo = '241'
),
cruces AS (
    SELECT 
        h1.codigo_curso as curso1_codigo,
        h1.nombre_curso as curso1_nombre,
        h1.letra_seccion as seccion1,
        h1.nombre_profesor as profesor1,
        h1.tipoclase as tipo1,
        h1.ciclo_sistemas as ciclo1_sistemas,
        h1.ciclo_industrial as ciclo1_industrial,
        h1.ciclo_software as ciclo1_software,
        h2.codigo_curso as curso2_codigo,
        h2.nombre_curso as curso2_nombre,
        h2.letra_seccion as seccion2,
        h2.nombre_profesor as profesor2,
        h2.tipoclase as tipo2,
        h2.ciclo_sistemas as ciclo2_sistemas,
        h2.ciclo_industrial as ciclo2_industrial,
        h2.ciclo_software as ciclo2_software,
        h1.dia,
        h1.hora_inicio,
        h1.hora_fin,
        h2.hora_inicio as hora2_inicio,
        h2.hora_fin as hora2_fin,
        h1.aula as aula1,
        h2.aula as aula2,
        -- Calcular horas de cruce
        CASE 
            WHEN h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin THEN
                EXTRACT(EPOCH FROM (
                    LEAST(h1.hora_fin::time, h2.hora_fin::time) - 
                    GREATEST(h1.hora_inicio::time, h2.hora_inicio::time)
                )) / 3600
            ELSE 0
        END as horas_cruce
    FROM horarios h1
    INNER JOIN horarios h2 ON h1.dia = h2.dia 
        AND h1.codigo_curso < h2.codigo_curso
        AND (
            (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
        )
)
SELECT 
    curso1_codigo,
    curso1_nombre,
    seccion1,
    profesor1,
    tipo1,
    curso2_codigo,
    curso2_nombre,
    seccion2,
    profesor2,
    tipo2,
    dia,
    hora_inicio,
    hora_fin,
    hora2_inicio,
    hora2_fin,
    ROUND(horas_cruce, 2) as horas_cruce,
    -- Determinar tipo de cruce
    CASE 
        WHEN tipo1 IN ('PRA', 'LAB') AND tipo2 IN ('PRA', 'LAB') THEN 'Crítico'
        WHEN (tipo1 = 'T' AND tipo2 IN ('PRA', 'LAB')) OR (tipo2 = 'T' AND tipo1 IN ('PRA', 'LAB')) THEN
            CASE WHEN horas_cruce <= 2 THEN 'Peligroso' ELSE 'Crítico' END
        WHEN tipo1 = 'T' AND tipo2 = 'T' THEN
            CASE WHEN horas_cruce <= 4 THEN 'Teórico' ELSE 'Peligroso' END
        ELSE 'Teórico'
    END as tipo_cruce
FROM cruces
WHERE horas_cruce > 0
ORDER BY dia, hora_inicio;

-- 2.2 Contar cruces por tipo en un ciclo
SELECT '2.2 - Contar cruces por tipo en ciclo 241' as consulta;
WITH horarios AS (
    SELECT 
        cs.codigo_curso,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    WHERE cs.relativo = '241'
),
cruces AS (
    SELECT 
        h1.codigo_curso as curso1,
        h2.codigo_curso as curso2,
        h1.tipoclase as tipo1,
        h2.tipoclase as tipo2,
        CASE 
            WHEN h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin THEN
                EXTRACT(EPOCH FROM (
                    LEAST(h1.hora_fin::time, h2.hora_fin::time) - 
                    GREATEST(h1.hora_inicio::time, h2.hora_inicio::time)
                )) / 3600
            ELSE 0
        END as horas_cruce
    FROM horarios h1
    INNER JOIN horarios h2 ON h1.dia = h2.dia 
        AND h1.codigo_curso < h2.codigo_curso
        AND (
            (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
        )
)
SELECT 
    COUNT(*) as total_cruces,
    COUNT(CASE WHEN tipo1 IN ('PRA', 'LAB') AND tipo2 IN ('PRA', 'LAB') THEN 1 END) as cruces_criticos,
    COUNT(CASE WHEN ((tipo1 = 'T' AND tipo2 IN ('PRA', 'LAB')) OR (tipo2 = 'T' AND tipo1 IN ('PRA', 'LAB'))) 
               AND horas_cruce <= 2 THEN 1 END) as cruces_peligrosos,
    COUNT(CASE WHEN tipo1 = 'T' AND tipo2 = 'T' AND horas_cruce <= 4 THEN 1 END) as cruces_teoricos
FROM cruces
WHERE horas_cruce > 0;

-- 2.3 Evolución de cruces por ciclo
SELECT '2.3 - Evolución de cruces por ciclo' as consulta;
WITH cruces_por_ciclo AS (
    SELECT 
        cs.relativo as ciclo,
        COUNT(*) as total_cruces,
        COUNT(CASE WHEN h1.tipoclase IN ('PRA', 'LAB') AND h2.tipoclase IN ('PRA', 'LAB') THEN 1 END) as cruces_criticos,
        COUNT(CASE WHEN ((h1.tipoclase = 'T' AND h2.tipoclase IN ('PRA', 'LAB')) OR (h2.tipoclase = 'T' AND h1.tipoclase IN ('PRA', 'LAB'))) THEN 1 END) as cruces_peligrosos,
        COUNT(CASE WHEN h1.tipoclase = 'T' AND h2.tipoclase = 'T' THEN 1 END) as cruces_teoricos
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor h1 ON cs.id = h1.idcursoseccion
    INNER JOIN cursoseccionprofesor h2 ON h1.dia = h2.dia 
        AND h1.idcursoseccion < h2.idcursoseccion
        AND (
            (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
        )
    WHERE cs.relativo IN ('241', '242', '251', '252')
    GROUP BY cs.relativo
)
SELECT 
    ciclo,
    total_cruces,
    cruces_criticos,
    cruces_peligrosos,
    cruces_teoricos
FROM cruces_por_ciclo
ORDER BY ciclo;

-- =====================================================
-- 3. CONSULTAS PARA ANÁLISIS POR CURSO
-- =====================================================

-- 3.1 Buscar curso por código o nombre
SELECT '3.1 - Buscar curso MAT101' as consulta;
SELECT 
    c.codigo,
    c.nombre,
    c.horas_teoria,
    c.horas_practica,
    c.horas_total,
    c.creditos,
    c.departamento,
    c.ciclo_sistemas,
    c.ciclo_industrial,
    c.ciclo_software,
    d.nombre as nombre_departamento
FROM curso c
LEFT JOIN departamento d ON c.departamento = d.codigo
WHERE c.codigo = 'MAT101' OR c.nombre ILIKE '%MAT101%';

-- 3.2 Obtener secciones de un curso en un ciclo específico
SELECT '3.2 - Secciones de MAT101 en ciclo 241' as consulta;
SELECT 
    cs.codigo_curso,
    cs.letra_seccion,
    csp.dia,
    csp.hora_inicio,
    csp.hora_fin,
    csp.tipoclase,
    csp.aula,
    p.nombre as nombre_profesor,
    p.codprofesor
FROM cursoseccion cs
INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
WHERE cs.codigo_curso = 'MAT101' AND cs.relativo = '241'
ORDER BY csp.dia, csp.hora_inicio;

-- 3.3 Detectar cruces específicos de un curso
SELECT '3.3 - Cruces específicos de MAT101 en ciclo 241' as consulta;
WITH curso_horarios AS (
    SELECT 
        cs.codigo_curso,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        p.nombre as nombre_profesor
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE cs.codigo_curso = 'MAT101' AND cs.relativo = '241'
),
otros_horarios AS (
    SELECT 
        cs.codigo_curso,
        c.nombre as nombre_curso,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        p.nombre as nombre_profesor
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN curso c ON cs.codigo_curso = c.codigo
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE cs.codigo_curso != 'MAT101' AND cs.relativo = '241'
)
SELECT 
    ch.codigo_curso as curso_original,
    ch.dia,
    ch.hora_inicio as hora_inicio_original,
    ch.hora_fin as hora_fin_original,
    ch.tipoclase as tipo_original,
    ch.nombre_profesor as profesor_original,
    oh.codigo_curso as curso_cruce,
    oh.nombre_curso as nombre_curso_cruce,
    oh.hora_inicio as hora_inicio_cruce,
    oh.hora_fin as hora_fin_cruce,
    oh.tipoclase as tipo_cruce,
    oh.nombre_profesor as profesor_cruce,
    ROUND(
        EXTRACT(EPOCH FROM (
            LEAST(ch.hora_fin::time, oh.hora_fin::time) - 
            GREATEST(ch.hora_inicio::time, oh.hora_inicio::time)
        )) / 3600, 2
    ) as horas_cruce,
    CASE 
        WHEN ch.tipoclase IN ('PRA', 'LAB') AND oh.tipoclase IN ('PRA', 'LAB') THEN 'Crítico'
        WHEN (ch.tipoclase = 'T' AND oh.tipoclase IN ('PRA', 'LAB')) OR (oh.tipoclase = 'T' AND ch.tipoclase IN ('PRA', 'LAB')) THEN
            CASE WHEN EXTRACT(EPOCH FROM (
                LEAST(ch.hora_fin::time, oh.hora_fin::time) - 
                GREATEST(ch.hora_inicio::time, oh.hora_inicio::time)
            )) / 3600 <= 2 THEN 'Peligroso' ELSE 'Crítico' END
        WHEN ch.tipoclase = 'T' AND oh.tipoclase = 'T' THEN
            CASE WHEN EXTRACT(EPOCH FROM (
                LEAST(ch.hora_fin::time, oh.hora_fin::time) - 
                GREATEST(ch.hora_inicio::time, oh.hora_inicio::time)
            )) / 3600 <= 4 THEN 'Teórico' ELSE 'Peligroso' END
        ELSE 'Teórico'
    END as tipo_cruce_clasificado
FROM curso_horarios ch
INNER JOIN otros_horarios oh ON ch.dia = oh.dia
    AND (
        (ch.hora_inicio < oh.hora_fin AND oh.hora_inicio < ch.hora_fin)
    )
ORDER BY ch.dia, ch.hora_inicio;

-- =====================================================
-- 4. CONSULTAS PARA ANÁLISIS POR PROFESOR
-- =====================================================

-- 4.1 Buscar profesor por nombre
SELECT '4.1 - Buscar profesor Juan García' as consulta;
SELECT 
    codprofesor,
    nombre,
    email,
    departamento
FROM profesor
WHERE nombre ILIKE '%Juan%García%' OR nombre ILIKE '%Juan García%';

-- 4.2 Cursos dictados por un profesor
SELECT '4.2 - Cursos dictados por profesor P001' as consulta;
SELECT DISTINCT
    c.codigo,
    c.nombre as nombre_curso,
    cs.relativo as ciclo,
    COUNT(DISTINCT cs.id) as total_secciones,
    COUNT(DISTINCT csp.id) as total_horarios
FROM curso c
INNER JOIN cursoseccion cs ON c.codigo = cs.codigo_curso
INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
WHERE csp.codprofesor = 'P001'
GROUP BY c.codigo, c.nombre, cs.relativo
ORDER BY cs.relativo DESC, c.codigo;

-- 4.3 Historial completo de cruces de un profesor
SELECT '4.3 - Historial de cruces del profesor P001' as consulta;
WITH profesor_horarios AS (
    SELECT 
        cs.codigo_curso,
        c.nombre as nombre_curso,
        cs.relativo as ciclo,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        p.nombre as nombre_profesor
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN curso c ON cs.codigo_curso = c.codigo
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE csp.codprofesor = 'P001'
),
todos_horarios AS (
    SELECT 
        cs.codigo_curso,
        c.nombre as nombre_curso,
        cs.relativo as ciclo,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        p.nombre as nombre_profesor
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN curso c ON cs.codigo_curso = c.codigo
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
)
SELECT 
    ph.codigo_curso as curso_profesor,
    ph.nombre_curso as nombre_curso_profesor,
    ph.ciclo,
    ph.dia,
    ph.hora_inicio as hora_inicio_profesor,
    ph.hora_fin as hora_fin_profesor,
    ph.tipoclase as tipo_profesor,
    th.codigo_curso as curso_cruce,
    th.nombre_curso as nombre_curso_cruce,
    th.hora_inicio as hora_inicio_cruce,
    th.hora_fin as hora_fin_cruce,
    th.tipoclase as tipo_cruce,
    th.nombre_profesor as profesor_cruce,
    ROUND(
        EXTRACT(EPOCH FROM (
            LEAST(ph.hora_fin::time, th.hora_fin::time) - 
            GREATEST(ph.hora_inicio::time, th.hora_inicio::time)
        )) / 3600, 2
    ) as horas_cruce,
    CASE 
        WHEN ph.tipoclase IN ('PRA', 'LAB') AND th.tipoclase IN ('PRA', 'LAB') THEN 'Crítico'
        WHEN (ph.tipoclase = 'T' AND th.tipoclase IN ('PRA', 'LAB')) OR (th.tipoclase = 'T' AND ph.tipoclase IN ('PRA', 'LAB')) THEN
            CASE WHEN EXTRACT(EPOCH FROM (
                LEAST(ph.hora_fin::time, th.hora_fin::time) - 
                GREATEST(ph.hora_inicio::time, th.hora_inicio::time)
            )) / 3600 <= 2 THEN 'Peligroso' ELSE 'Crítico' END
        WHEN ph.tipoclase = 'T' AND th.tipoclase = 'T' THEN
            CASE WHEN EXTRACT(EPOCH FROM (
                LEAST(ph.hora_fin::time, th.hora_fin::time) - 
                GREATEST(ph.hora_inicio::time, th.hora_inicio::time)
            )) / 3600 <= 4 THEN 'Teórico' ELSE 'Peligroso' END
        ELSE 'Teórico'
    END as tipo_cruce_clasificado
FROM profesor_horarios ph
INNER JOIN todos_horarios th ON ph.dia = th.dia
    AND ph.ciclo = th.ciclo
    AND ph.codigo_curso != th.codigo_curso
    AND (
        (ph.hora_inicio < th.hora_fin AND th.hora_inicio < ph.hora_fin)
    )
ORDER BY ph.ciclo DESC, ph.dia, ph.hora_inicio;

-- 4.4 Estadísticas acumuladas de cruces por profesor
SELECT '4.4 - Estadísticas acumuladas del profesor P001' as consulta;
WITH profesor_cruces AS (
    SELECT 
        cs.relativo as ciclo,
        COUNT(*) as total_cruces,
        COUNT(CASE WHEN h1.tipoclase IN ('PRA', 'LAB') AND h2.tipoclase IN ('PRA', 'LAB') THEN 1 END) as cruces_criticos,
        COUNT(CASE WHEN ((h1.tipoclase = 'T' AND h2.tipoclase IN ('PRA', 'LAB')) OR (h2.tipoclase = 'T' AND h1.tipoclase IN ('PRA', 'LAB'))) THEN 1 END) as cruces_peligrosos,
        COUNT(CASE WHEN h1.tipoclase = 'T' AND h2.tipoclase = 'T' THEN 1 END) as cruces_teoricos
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor h1 ON cs.id = h1.idcursoseccion
    INNER JOIN cursoseccionprofesor h2 ON h1.dia = h2.dia 
        AND h1.idcursoseccion < h2.idcursoseccion
        AND (
            (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
        )
    WHERE h1.codprofesor = 'P001'
    GROUP BY cs.relativo
)
SELECT 
    SUM(total_cruces) as total_cruces_acumulados,
    SUM(cruces_criticos) as total_cruces_criticos,
    SUM(cruces_peligrosos) as total_cruces_peligrosos,
    SUM(cruces_teoricos) as total_cruces_teoricos
FROM profesor_cruces;

-- =====================================================
-- 5. CONSULTAS PARA GRÁFICOS Y ESTADÍSTICAS AVANZADAS
-- =====================================================

-- 5.1 Distribución de cruces por día de la semana
SELECT '5.1 - Distribución de cruces por día de la semana' as consulta;
SELECT 
    csp.dia,
    COUNT(*) as total_cruces,
    COUNT(CASE WHEN h1.tipoclase IN ('PRA', 'LAB') AND h2.tipoclase IN ('PRA', 'LAB') THEN 1 END) as cruces_criticos,
    COUNT(CASE WHEN ((h1.tipoclase = 'T' AND h2.tipoclase IN ('PRA', 'LAB')) OR (h2.tipoclase = 'T' AND h1.tipoclase IN ('PRA', 'LAB'))) THEN 1 END) as cruces_peligrosos,
    COUNT(CASE WHEN h1.tipoclase = 'T' AND h2.tipoclase = 'T' THEN 1 END) as cruces_teoricos
FROM cursoseccion cs
INNER JOIN cursoseccionprofesor h1 ON cs.id = h1.idcursoseccion
INNER JOIN cursoseccionprofesor h2 ON h1.dia = h2.dia 
    AND h1.idcursoseccion < h2.idcursoseccion
    AND (
        (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
    )
INNER JOIN cursoseccionprofesor csp ON h1.idcursoseccion = csp.idcursoseccion
WHERE cs.relativo = '241'
GROUP BY csp.dia
ORDER BY 
    CASE csp.dia 
        WHEN 'Lunes' THEN 1
        WHEN 'Martes' THEN 2
        WHEN 'Miércoles' THEN 3
        WHEN 'Jueves' THEN 4
        WHEN 'Viernes' THEN 5
        WHEN 'Sábado' THEN 6
        WHEN 'Domingo' THEN 7
        ELSE 8
    END;

-- 5.2 Top 10 cursos con más cruces
SELECT '5.2 - Top 10 cursos con más cruces' as consulta;
SELECT 
    c.codigo,
    c.nombre,
    COUNT(*) as total_cruces,
    COUNT(CASE WHEN h1.tipoclase IN ('PRA', 'LAB') AND h2.tipoclase IN ('PRA', 'LAB') THEN 1 END) as cruces_criticos,
    COUNT(CASE WHEN ((h1.tipoclase = 'T' AND h2.tipoclase IN ('PRA', 'LAB')) OR (h2.tipoclase = 'T' AND h1.tipoclase IN ('PRA', 'LAB'))) THEN 1 END) as cruces_peligrosos,
    COUNT(CASE WHEN h1.tipoclase = 'T' AND h2.tipoclase = 'T' THEN 1 END) as cruces_teoricos
FROM cursoseccion cs
INNER JOIN cursoseccionprofesor h1 ON cs.id = h1.idcursoseccion
INNER JOIN cursoseccionprofesor h2 ON h1.dia = h2.dia 
    AND h1.idcursoseccion < h2.idcursoseccion
    AND (
        (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
    )
INNER JOIN curso c ON cs.codigo_curso = c.codigo
WHERE cs.relativo = '241'
GROUP BY c.codigo, c.nombre
ORDER BY total_cruces DESC
LIMIT 10;

-- 5.3 Top 10 profesores con más cruces
SELECT '5.3 - Top 10 profesores con más cruces' as consulta;
SELECT 
    p.codprofesor,
    p.nombre,
    COUNT(*) as total_cruces,
    COUNT(CASE WHEN h1.tipoclase IN ('PRA', 'LAB') AND h2.tipoclase IN ('PRA', 'LAB') THEN 1 END) as cruces_criticos,
    COUNT(CASE WHEN ((h1.tipoclase = 'T' AND h2.tipoclase IN ('PRA', 'LAB')) OR (h2.tipoclase = 'T' AND h1.tipoclase IN ('PRA', 'LAB'))) THEN 1 END) as cruces_peligrosos,
    COUNT(CASE WHEN h1.tipoclase = 'T' AND h2.tipoclase = 'T' THEN 1 END) as cruces_teoricos
FROM cursoseccion cs
INNER JOIN cursoseccionprofesor h1 ON cs.id = h1.idcursoseccion
INNER JOIN cursoseccionprofesor h2 ON h1.dia = h2.dia 
    AND h1.idcursoseccion < h2.idcursoseccion
    AND (
        (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
    )
INNER JOIN profesor p ON h1.codprofesor = p.codprofesor
WHERE cs.relativo = '241'
GROUP BY p.codprofesor, p.nombre
ORDER BY total_cruces DESC
LIMIT 10;

-- 5.4 Distribución de cruces por departamento
SELECT '5.4 - Distribución de cruces por departamento' as consulta;
SELECT 
    c.departamento,
    d.nombre as nombre_departamento,
    COUNT(*) as total_cruces,
    COUNT(CASE WHEN h1.tipoclase IN ('PRA', 'LAB') AND h2.tipoclase IN ('PRA', 'LAB') THEN 1 END) as cruces_criticos,
    COUNT(CASE WHEN ((h1.tipoclase = 'T' AND h2.tipoclase IN ('PRA', 'LAB')) OR (h2.tipoclase = 'T' AND h1.tipoclase IN ('PRA', 'LAB'))) THEN 1 END) as cruces_peligrosos,
    COUNT(CASE WHEN h1.tipoclase = 'T' AND h2.tipoclase = 'T' THEN 1 END) as cruces_teoricos
FROM cursoseccion cs
INNER JOIN cursoseccionprofesor h1 ON cs.id = h1.idcursoseccion
INNER JOIN cursoseccionprofesor h2 ON h1.dia = h2.dia 
    AND h1.idcursoseccion < h2.idcursoseccion
    AND (
        (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
    )
INNER JOIN curso c ON cs.codigo_curso = c.codigo
LEFT JOIN departamento d ON c.departamento = d.codigo
WHERE cs.relativo = '241'
GROUP BY c.departamento, d.nombre
ORDER BY total_cruces DESC;

-- =====================================================
-- 6. CONSULTAS PARA VALIDACIÓN Y DEBUGGING
-- =====================================================

-- 6.1 Verificar estructura de datos
SELECT '6.1 - Verificar estructura de datos' as consulta;
SELECT 
    'cursoseccion' as tabla,
    COUNT(*) as registros
FROM cursoseccion
WHERE relativo IN ('241', '242', '251', '252')

UNION ALL

SELECT 
    'cursoseccionprofesor' as tabla,
    COUNT(*) as registros
FROM cursoseccionprofesor csp
INNER JOIN cursoseccion cs ON csp.idcursoseccion = cs.id
WHERE cs.relativo IN ('241', '242', '251', '252')

UNION ALL

SELECT 
    'curso' as tabla,
    COUNT(*) as registros
FROM curso

UNION ALL

SELECT 
    'profesor' as tabla,
    COUNT(*) as registros
FROM profesor;

-- 6.2 Verificar formatos de hora
SELECT '6.2 - Verificar formatos de hora' as consulta;
SELECT DISTINCT
    hora_inicio,
    hora_fin,
    COUNT(*) as cantidad
FROM cursoseccionprofesor
GROUP BY hora_inicio, hora_fin
ORDER BY hora_inicio
LIMIT 10;

-- 6.3 Verificar días de la semana
SELECT '6.3 - Verificar días de la semana' as consulta;
SELECT DISTINCT
    dia,
    COUNT(*) as cantidad
FROM cursoseccionprofesor
GROUP BY dia
ORDER BY dia;

-- 6.4 Verificar tipos de clase
SELECT '6.4 - Verificar tipos de clase' as consulta;
SELECT DISTINCT
    tipoclase,
    COUNT(*) as cantidad
FROM cursoseccionprofesor
GROUP BY tipoclase
ORDER BY tipoclase;

-- =====================================================
-- FIN DE CONSULTAS
-- =====================================================
SELECT 'Todas las consultas han sido ejecutadas exitosamente' as resultado; 