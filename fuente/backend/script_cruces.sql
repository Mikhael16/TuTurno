-- Script para verificar y crear datos de prueba para el sistema de cruces
-- Autor: Sistema de Gestión de Cruces
-- Fecha: 2024

-- 1. Verificar estructura de tablas principales
SELECT 'Verificando estructura de tablas...' as info;

-- Verificar tabla curso
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'curso' 
ORDER BY ordinal_position;

-- Verificar tabla cursoseccion
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cursoseccion' 
ORDER BY ordinal_position;

-- Verificar tabla cursoseccionprofesor
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cursoseccionprofesor' 
ORDER BY ordinal_position;

-- Verificar tabla profesor
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profesor' 
ORDER BY ordinal_position;

-- 2. Verificar datos existentes
SELECT 'Verificando datos existentes...' as info;

-- Contar cursos
SELECT COUNT(*) as total_cursos FROM curso;

-- Contar secciones
SELECT COUNT(*) as total_secciones FROM cursoseccion;

-- Contar profesores
SELECT COUNT(*) as total_profesores FROM profesor;

-- Contar asignaciones profesor-sección
SELECT COUNT(*) as total_asignaciones FROM cursoseccionprofesor;

-- 3. Verificar horarios existentes
SELECT 'Verificando horarios existentes...' as info;

-- Mostrar algunos horarios de ejemplo
SELECT 
    cs.codigo_curso,
    c.nombre as nombre_curso,
    cs.letra_seccion,
    csp.dia,
    csp.hora_inicio,
    csp.hora_fin,
    csp.tipoclase,
    p.nombre as nombre_profesor,
    cs.relativo as ciclo
FROM cursoseccion cs
INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
INNER JOIN curso c ON cs.codigo_curso = c.codigo
INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
WHERE cs.relativo IN ('241', '242', '251', '252')
ORDER BY cs.relativo, csp.dia, csp.hora_inicio
LIMIT 20;

-- 4. Verificar tipos de clase
SELECT 'Verificando tipos de clase...' as info;

SELECT DISTINCT tipoclase, COUNT(*) as cantidad
FROM cursoseccionprofesor
GROUP BY tipoclase
ORDER BY tipoclase;

-- 5. Verificar días de la semana
SELECT 'Verificando días de la semana...' as info;

SELECT DISTINCT dia, COUNT(*) as cantidad
FROM cursoseccionprofesor
GROUP BY dia
ORDER BY dia;

-- 6. Crear datos de prueba si no existen suficientes
SELECT 'Creando datos de prueba...' as info;

-- Insertar profesores de prueba si no existen
INSERT INTO profesor (codprofesor, nombre, email, departamento)
SELECT 
    'P001', 'Dr. Juan García', 'juan.garcia@universidad.edu', 'MAT'
WHERE NOT EXISTS (SELECT 1 FROM profesor WHERE codprofesor = 'P001');

INSERT INTO profesor (codprofesor, nombre, email, departamento)
SELECT 
    'P002', 'Dra. María López', 'maria.lopez@universidad.edu', 'FIS'
WHERE NOT EXISTS (SELECT 1 FROM profesor WHERE codprofesor = 'P002');

INSERT INTO profesor (codprofesor, nombre, email, departamento)
SELECT 
    'P003', 'Prof. Carlos Rodríguez', 'carlos.rodriguez@universidad.edu', 'INF'
WHERE NOT EXISTS (SELECT 1 FROM profesor WHERE codprofesor = 'P003');

-- Insertar cursos de prueba si no existen
INSERT INTO curso (codigo, nombre, horas_teoria, horas_practica, horas_total, creditos, departamento, ciclo_sistemas, ciclo_industrial, ciclo_software)
SELECT 
    'MAT101', 'Matemáticas I', 4, 2, 6, 4, 'MAT', 1, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM curso WHERE codigo = 'MAT101');

INSERT INTO curso (codigo, nombre, horas_teoria, horas_practica, horas_total, creditos, departamento, ciclo_sistemas, ciclo_industrial, ciclo_software)
SELECT 
    'FIS101', 'Física I', 3, 3, 6, 4, 'FIS', 2, 2, 2
WHERE NOT EXISTS (SELECT 1 FROM curso WHERE codigo = 'FIS101');

INSERT INTO curso (codigo, nombre, horas_teoria, horas_practica, horas_total, creditos, departamento, ciclo_sistemas, ciclo_industrial, ciclo_software)
SELECT 
    'INF101', 'Programación I', 2, 4, 6, 4, 'INF', 1, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM curso WHERE codigo = 'INF101');

-- Insertar secciones de prueba
INSERT INTO cursoseccion (codigo_curso, letra_seccion, relativo)
SELECT 
    'MAT101', 'A', '241'
WHERE NOT EXISTS (SELECT 1 FROM cursoseccion WHERE codigo_curso = 'MAT101' AND letra_seccion = 'A' AND relativo = '241');

INSERT INTO cursoseccion (codigo_curso, letra_seccion, relativo)
SELECT 
    'MAT101', 'B', '241'
WHERE NOT EXISTS (SELECT 1 FROM cursoseccion WHERE codigo_curso = 'MAT101' AND letra_seccion = 'B' AND relativo = '241');

INSERT INTO cursoseccion (codigo_curso, letra_seccion, relativo)
SELECT 
    'FIS101', 'A', '241'
WHERE NOT EXISTS (SELECT 1 FROM cursoseccion WHERE codigo_curso = 'FIS101' AND letra_seccion = 'A' AND relativo = '241');

INSERT INTO cursoseccion (codigo_curso, letra_seccion, relativo)
SELECT 
    'INF101', 'A', '241'
WHERE NOT EXISTS (SELECT 1 FROM cursoseccion WHERE codigo_curso = 'INF101' AND letra_seccion = 'A' AND relativo = '241');

-- Insertar horarios de prueba (con cruces intencionales)
-- MAT101A - Lunes 8:00-10:00 (Teoría)
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P001', 'Lunes', '08:00', '10:00', 'T', 'A101'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'MAT101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Lunes' AND csp.hora_inicio = '08:00'
);

-- MAT101A - Miércoles 8:00-10:00 (Teoría)
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P001', 'Miércoles', '08:00', '10:00', 'T', 'A101'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'MAT101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Miércoles' AND csp.hora_inicio = '08:00'
);

-- MAT101A - Viernes 8:00-10:00 (Teoría)
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P001', 'Viernes', '08:00', '10:00', 'T', 'A101'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'MAT101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Viernes' AND csp.hora_inicio = '08:00'
);

-- FIS101A - Lunes 9:00-11:00 (Teoría) - CRUCE CON MAT101A
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P002', 'Lunes', '09:00', '11:00', 'T', 'A102'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'FIS101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Lunes' AND csp.hora_inicio = '09:00'
);

-- FIS101A - Miércoles 9:00-11:00 (Teoría) - CRUCE CON MAT101A
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P002', 'Miércoles', '09:00', '11:00', 'T', 'A102'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'FIS101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Miércoles' AND csp.hora_inicio = '09:00'
);

-- FIS101A - Viernes 9:00-11:00 (Teoría) - CRUCE CON MAT101A
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P002', 'Viernes', '09:00', '11:00', 'T', 'A102'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'FIS101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Viernes' AND csp.hora_inicio = '09:00'
);

-- INF101A - Lunes 10:00-12:00 (Práctica) - CRUCE CON MAT101A Y FIS101A
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P003', 'Lunes', '10:00', '12:00', 'PRA', 'LAB101'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'INF101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Lunes' AND csp.hora_inicio = '10:00'
);

-- INF101A - Miércoles 10:00-12:00 (Práctica) - CRUCE CON MAT101A Y FIS101A
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P003', 'Miércoles', '10:00', '12:00', 'PRA', 'LAB101'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'INF101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Miércoles' AND csp.hora_inicio = '10:00'
);

-- INF101A - Viernes 10:00-12:00 (Práctica) - CRUCE CON MAT101A Y FIS101A
INSERT INTO cursoseccionprofesor (idcursoseccion, codprofesor, dia, hora_inicio, hora_fin, tipoclase, aula)
SELECT 
    cs.id, 'P003', 'Viernes', '10:00', '12:00', 'PRA', 'LAB101'
FROM cursoseccion cs
WHERE cs.codigo_curso = 'INF101' AND cs.letra_seccion = 'A' AND cs.relativo = '241'
AND NOT EXISTS (
    SELECT 1 FROM cursoseccionprofesor csp 
    WHERE csp.idcursoseccion = cs.id AND csp.dia = 'Viernes' AND csp.hora_inicio = '10:00'
);

-- 7. Verificar cruces creados
SELECT 'Verificando cruces creados...' as info;

-- Mostrar todos los horarios del ciclo 241
SELECT 
    cs.codigo_curso,
    c.nombre as nombre_curso,
    cs.letra_seccion,
    csp.dia,
    csp.hora_inicio,
    csp.hora_fin,
    csp.tipoclase,
    p.nombre as nombre_profesor,
    cs.relativo as ciclo
FROM cursoseccion cs
INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
INNER JOIN curso c ON cs.codigo_curso = c.codigo
INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
WHERE cs.relativo = '241'
ORDER BY csp.dia, csp.hora_inicio;

-- 8. Detectar cruces automáticamente
SELECT 'Detectando cruces automáticamente...' as info;

-- Query para detectar cruces
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
        c.ciclo_software
    FROM cursoseccion cs
    INNER JOIN cursoseccionprofesor csp ON cs.id = csp.idcursoseccion
    INNER JOIN curso c ON cs.codigo_curso = c.codigo
    INNER JOIN profesor p ON csp.codprofesor = p.codprofesor
    WHERE cs.relativo = '241'
)
SELECT 
    h1.codigo_curso as curso1,
    h1.nombre_curso as nombre_curso1,
    h1.letra_seccion as seccion1,
    h1.nombre_profesor as profesor1,
    h1.tipoclase as tipo1,
    h2.codigo_curso as curso2,
    h2.nombre_curso as nombre_curso2,
    h2.letra_seccion as seccion2,
    h2.nombre_profesor as profesor2,
    h2.tipoclase as tipo2,
    h1.dia,
    h1.hora_inicio,
    h1.hora_fin,
    h2.hora_inicio as hora_inicio2,
    h2.hora_fin as hora_fin2,
    CASE 
        WHEN h1.tipoclase = 'T' AND h2.tipoclase = 'T' THEN 'Teórico'
        WHEN (h1.tipoclase = 'T' AND h2.tipoclase IN ('PRA', 'LAB')) OR 
             (h2.tipoclase = 'T' AND h1.tipoclase IN ('PRA', 'LAB')) THEN 'Peligroso'
        WHEN h1.tipoclase IN ('PRA', 'LAB') AND h2.tipoclase IN ('PRA', 'LAB') THEN 'Crítico'
        ELSE 'Otro'
    END as tipo_cruce
FROM horarios h1
INNER JOIN horarios h2 ON h1.dia = h2.dia 
    AND h1.codigo_curso < h2.codigo_curso
    AND (
        (h1.hora_inicio < h2.hora_fin AND h2.hora_inicio < h1.hora_fin)
    )
ORDER BY h1.dia, h1.hora_inicio;

-- 9. Resumen final
SELECT 'Resumen final de datos de prueba...' as info;

SELECT 
    'Cursos creados' as tipo,
    COUNT(*) as cantidad
FROM curso
WHERE codigo IN ('MAT101', 'FIS101', 'INF101')

UNION ALL

SELECT 
    'Secciones creadas' as tipo,
    COUNT(*) as cantidad
FROM cursoseccion
WHERE codigo_curso IN ('MAT101', 'FIS101', 'INF101') AND relativo = '241'

UNION ALL

SELECT 
    'Horarios creados' as tipo,
    COUNT(*) as cantidad
FROM cursoseccionprofesor csp
INNER JOIN cursoseccion cs ON csp.idcursoseccion = cs.id
WHERE cs.codigo_curso IN ('MAT101', 'FIS101', 'INF101') AND cs.relativo = '241'

UNION ALL

SELECT 
    'Profesores creados' as tipo,
    COUNT(*) as cantidad
FROM profesor
WHERE codprofesor IN ('P001', 'P002', 'P003');

SELECT 'Script completado exitosamente!' as resultado; 