-- Script para modificar la tabla curso
-- Eliminar el campo ciclo y agregar 3 nuevos campos de ciclo específicos

-- 1. Eliminar el campo ciclo existente
ALTER TABLE curso DROP COLUMN IF EXISTS ciclo;

-- 2. Agregar los nuevos campos de ciclo
ALTER TABLE curso ADD COLUMN ciclo_sistemas INTEGER;
ALTER TABLE curso ADD COLUMN ciclo_industrial INTEGER;
ALTER TABLE curso ADD COLUMN ciclo_software INTEGER;

-- 3. Agregar comentarios para documentar los campos
COMMENT ON COLUMN curso.ciclo_sistemas IS 'Ciclo del curso para la carrera de Sistemas y Telemática';
COMMENT ON COLUMN curso.ciclo_industrial IS 'Ciclo del curso para la carrera de Gestión de la Producción';
COMMENT ON COLUMN curso.ciclo_software IS 'Ciclo del curso para la carrera de Software';

-- 4. Verificar que los cambios se aplicaron correctamente
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'curso' 
AND column_name IN ('ciclo_sistemas', 'ciclo_industrial', 'ciclo_software')
ORDER BY column_name; 