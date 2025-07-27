-- ===========================================
-- CRUCES DE CLASES DE UN PROFESOR CON CURSOS DE INTERÉS POR CICLO Y CARRERA
-- ===========================================

-- Cambia el nombre del profesor según lo requieras

WITH clases_profesor AS (
    SELECT
        cs.id AS idcursoseccion,
        cs.codigo_curso,
        cs.letra_seccion,
        c.nombre AS nombre_curso,
        c.ciclo_sistemas,
        c.ciclo_industrial,
        c.ciclo_software,
        -- Determinar la carrera basándose en qué ciclo tiene valor
        CASE 
            WHEN c.ciclo_sistemas IS NOT NULL THEN 'SISTEMAS'
            WHEN c.ciclo_industrial IS NOT NULL THEN 'INDUSTRIAL'
            WHEN c.ciclo_software IS NOT NULL THEN 'SOFTWARE'
            ELSE 'GENERAL'
        END AS carrera,
        p.codprofesor,
        p.nombre AS nombre_profesor,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        csp.aula
    FROM cursoseccion cs
    JOIN curso c ON cs.codigo_curso = c.codigo
    JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE p.nombre ILIKE '%VALDIVIA MENDOZA, HECTOR GIOVANNY%'
),
clases_interes AS (
    SELECT
        cs.id AS idcursoseccion,
        cs.codigo_curso,
        cs.letra_seccion,
        c.nombre AS nombre_curso,
        c.ciclo_sistemas,
        c.ciclo_industrial,
        c.ciclo_software,
        -- Determinar la carrera basándose en qué ciclo tiene valor
        CASE 
            WHEN c.ciclo_sistemas IS NOT NULL THEN 'SISTEMAS'
            WHEN c.ciclo_industrial IS NOT NULL THEN 'INDUSTRIAL'
            WHEN c.ciclo_software IS NOT NULL THEN 'SOFTWARE'
            ELSE 'GENERAL'
        END AS carrera,
        p.codprofesor,
        p.nombre AS nombre_profesor,
        csp.dia,
        csp.hora_inicio,
        csp.hora_fin,
        csp.tipoclase,
        csp.aula
    FROM cursoseccion cs
    JOIN curso c ON cs.codigo_curso = c.codigo
    JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    JOIN profesor p ON csp.codprofesor = p.codprofesor
),
cruces AS (
    SELECT
        cp.codigo_curso AS curso_profesor,
        cp.letra_seccion AS seccion_profesor,
        cp.nombre_curso AS nombre_curso_profesor,
        cp.ciclo_sistemas AS ciclo_sistemas_profesor,
        cp.ciclo_industrial AS ciclo_industrial_profesor,
        cp.ciclo_software AS ciclo_software_profesor,
        cp.carrera AS carrera_profesor,
        cp.dia,
        cp.hora_inicio AS hora_inicio_profesor,
        cp.hora_fin AS hora_fin_profesor,
        cp.tipoclase AS tipo_profesor,
        cp.aula AS aula_profesor,
        ci.codigo_curso AS curso_interes,
        ci.letra_seccion AS seccion_interes,
        ci.nombre_curso AS nombre_curso_interes,
        ci.ciclo_sistemas AS ciclo_sistemas_interes,
        ci.ciclo_industrial AS ciclo_industrial_interes,
        ci.ciclo_software AS ciclo_software_interes,
        ci.carrera AS carrera_interes,
        ci.nombre_profesor AS profesor_interes,
        ci.hora_inicio AS hora_inicio_interes,
        ci.hora_fin AS hora_fin_interes,
        ci.tipoclase AS tipo_interes,
        ci.aula AS aula_interes,
        EXTRACT(EPOCH FROM (
            LEAST(cp.hora_fin::time, ci.hora_fin::time) - 
            GREATEST(cp.hora_inicio::time, ci.hora_inicio::time)
        )) / 3600 AS horas_cruce
    FROM clases_profesor cp
    JOIN clases_interes ci
      ON cp.dia = ci.dia
     AND cp.idcursoseccion <> ci.idcursoseccion
     -- Determinar cursos de interés según la carrera del profesor
     AND (
        -- Para SISTEMAS: comparar con ciclos -2, -1, +1, +2
        (cp.carrera = 'SISTEMAS' AND ci.carrera = 'SISTEMAS'
            AND ci.ciclo_sistemas IS NOT NULL
            AND ci.ciclo_sistemas IN (
                cp.ciclo_sistemas - 2, cp.ciclo_sistemas - 1, 
                cp.ciclo_sistemas + 1, cp.ciclo_sistemas + 2
            )
        )
        OR
        -- Para INDUSTRIAL: comparar con ciclos -2, -1, +1, +2
        (cp.carrera = 'INDUSTRIAL' AND ci.carrera = 'INDUSTRIAL'
            AND ci.ciclo_industrial IS NOT NULL
            AND ci.ciclo_industrial IN (
                cp.ciclo_industrial - 2, cp.ciclo_industrial - 1, 
                cp.ciclo_industrial + 1, cp.ciclo_industrial + 2
            )
        )
        OR
        -- Para SOFTWARE: comparar con ciclos -2, -1, +1, +2
        (cp.carrera = 'SOFTWARE' AND ci.carrera = 'SOFTWARE'
            AND ci.ciclo_software IS NOT NULL
            AND ci.ciclo_software IN (
                cp.ciclo_software - 2, cp.ciclo_software - 1, 
                cp.ciclo_software + 1, cp.ciclo_software + 2
            )
        )
     )
     AND (cp.hora_inicio < ci.hora_fin AND ci.hora_inicio < cp.hora_fin)
)
SELECT
    curso_profesor, 
    seccion_profesor, 
    nombre_curso_profesor, 
    ciclo_sistemas_profesor, 
    ciclo_industrial_profesor, 
    ciclo_software_profesor,
    carrera_profesor,
    dia, 
    hora_inicio_profesor, 
    hora_fin_profesor, 
    tipo_profesor, 
    aula_profesor,
    curso_interes, 
    seccion_interes, 
    nombre_curso_interes, 
    ciclo_sistemas_interes, 
    ciclo_industrial_interes, 
    ciclo_software_interes,
    carrera_interes,
    profesor_interes, 
    hora_inicio_interes, 
    hora_fin_interes, 
    tipo_interes, 
    aula_interes,
    ROUND(horas_cruce, 2) AS horas_cruce
FROM cruces
ORDER BY dia, hora_inicio_profesor, curso_profesor, seccion_profesor; 