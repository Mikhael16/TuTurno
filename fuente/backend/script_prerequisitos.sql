-- Script para verificar prerrequisitos en la base de datos

-- 1. Verificar la estructura de la tabla cursoprerrequisito
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cursoprerrequisito' 
ORDER BY ordinal_position;

-- 2. Verificar algunos registros de ejemplo
SELECT 
    codigo_curso,
    codigoprerrequisito_1,
    codigoprerrequisito_2,
    codigoprerrequisito_3,
    carrera
FROM cursoprerrequisito 
LIMIT 10;

-- 3. Contar registros por carrera
SELECT 
    carrera,
    COUNT(*) as total_registros
FROM cursoprerrequisito 
GROUP BY carrera
ORDER BY carrera;

-- 4. Buscar cursos que tengan prerrequisitos específicos
SELECT 
    cp.codigo_curso,
    cp.carrera,
    cp.codigoprerrequisito_1,
    c1.nombre as nombre_prereq_1,
    cp.codigoprerrequisito_2,
    c2.nombre as nombre_prereq_2,
    cp.codigoprerrequisito_3,
    c3.nombre as nombre_prereq_3
FROM cursoprerrequisito cp
LEFT JOIN curso c1 ON cp.codigoprerrequisito_1 = c1.codigo
LEFT JOIN curso c2 ON cp.codigoprerrequisito_2 = c2.codigo
LEFT JOIN curso c3 ON cp.codigoprerrequisito_3 = c3.codigo
WHERE cp.codigoprerrequisito_1 IS NOT NULL
ORDER BY cp.codigo_curso
LIMIT 5;

-- 5. Script específico para obtener prerrequisitos de un curso (igual al del endpoint)
-- Reemplaza 'BMA02' con el código del curso que quieras consultar
SELECT 
    cp.codigoprerrequisito_1,
    cp.codigoprerrequisito_2,
    cp.codigoprerrequisito_3,
    cp.carrera,
    c1.nombre as nombre_prereq_1,
    c2.nombre as nombre_prereq_2,
    c3.nombre as nombre_prereq_3
FROM cursoprerrequisito cp
LEFT JOIN curso c1 ON cp.codigoprerrequisito_1 = c1.codigo
LEFT JOIN curso c2 ON cp.codigoprerrequisito_2 = c2.codigo
LEFT JOIN curso c3 ON cp.codigoprerrequisito_3 = c3.codigo
WHERE cp.codigo_curso = 'BMA02';

-- 6. Script con filtro por carrera
SELECT 
    cp.codigoprerrequisito_1,
    cp.codigoprerrequisito_2,
    cp.codigoprerrequisito_3,
    cp.carrera,
    c1.nombre as nombre_prereq_1,
    c2.nombre as nombre_prereq_2,
    c3.nombre as nombre_prereq_3
FROM cursoprerrequisito cp
LEFT JOIN curso c1 ON cp.codigoprerrequisito_1 = c1.codigo
LEFT JOIN curso c2 ON cp.codigoprerrequisito_2 = c2.codigo
LEFT JOIN curso c3 ON cp.codigoprerrequisito_3 = c3.codigo
WHERE cp.codigo_curso = 'BMA02' 
  AND cp.carrera = 'I1'; 