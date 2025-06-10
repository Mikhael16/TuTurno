drop table if exists alumno
drop table if exists Matricula
CREATE TABLE alumno (
    id_alumno serial PRIMARY KEY,
    codigo_alumno VARCHAR(20) UNIQUE,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    especialidad VARCHAR(20)); 
	
CREATE TABLE Matricula (
    id_matricula serial  PRIMARY KEY ,
    codigo_alumno VARCHAR(20),
    codigo_curso VARCHAR(10),
    letra_seccion CHAR(1),
    ciclo VARCHAR(10),  -- Ej: '2025-1'
	turno VARCHAR(50),
    FOREIGN KEY (codigo_alumno) REFERENCES alumno(codigo_alumno),
    FOREIGN KEY (codigo_curso) REFERENCES Curso(Codigo),
    FOREIGN KEY (letra_seccion) REFERENCES Seccion(Letra)
);
