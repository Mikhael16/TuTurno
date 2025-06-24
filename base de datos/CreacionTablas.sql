-- public.departamento definition

-- Drop table

-- DROP TABLE public.departamento;

CREATE TABLE public.departamento (
	codigo varchar(4) NOT NULL,
	nombre varchar(255) NOT NULL,
	CONSTRAINT departamento_pkey PRIMARY KEY (codigo)
);



-- public.seccion definition

-- Drop table

-- DROP TABLE public.seccion;

CREATE TABLE public.seccion (
	letra bpchar(1) NOT NULL,
	CONSTRAINT seccion_pkey PRIMARY KEY (letra)
);





-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	id serial4 NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(255) NOT NULL,
	email varchar(100) NULL,
	rol varchar(20) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT usuarios_email_key UNIQUE (email),
	CONSTRAINT usuarios_pkey PRIMARY KEY (id),
	CONSTRAINT usuarios_username_key UNIQUE (username)
);




-- public.reset_pins definition

-- Drop table

-- DROP TABLE public.reset_pins;

CREATE TABLE public.reset_pins (
	id serial4 NOT NULL,
	email varchar(100) NOT NULL,
	pin varchar(6) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	expires_at timestamp NOT NULL,
	used bool DEFAULT false NOT NULL,
	CONSTRAINT reset_pins_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_reset_pins_email ON public.reset_pins USING btree (email);
CREATE INDEX idx_reset_pins_expires ON public.reset_pins USING btree (expires_at);




-- public.profesor definition

-- Drop table

-- DROP TABLE public.profesor;

CREATE TABLE public.profesor (
	codprofesor int4 NOT NULL,
	nombre varchar(255) NOT NULL,
	CONSTRAINT profesor_nuevo_pkey PRIMARY KEY (codprofesor)
);




-- public.curso definition

-- Drop table

-- DROP TABLE public.curso;

CREATE TABLE public.curso (
	codigo varchar(10) NOT NULL,
	nombre varchar(255) NOT NULL,
	horas_teoria int4 NULL,
	horas_practica int4 NULL,
	horas_total int4 NULL,
	creditos int4 NULL,
	departamento varchar(4) NULL,
	ciclo_sistemas int4 NULL,
	ciclo_industrial int4 NULL,
	ciclo_software int4 NULL,
	CONSTRAINT curso_pkey PRIMARY KEY (codigo)
);


-- public.curso foreign keys

ALTER TABLE public.curso ADD CONSTRAINT fk_curso_departamento FOREIGN KEY (departamento) REFERENCES public.departamento(codigo);




-- public.cursoprerrequisito definition

-- Drop table

-- DROP TABLE public.cursoprerrequisito;

CREATE TABLE public.cursoprerrequisito (
	codigo_curso varchar(10) NOT NULL,
	codigoprerrequisito_1 varchar(10) NULL,
	codigoprerrequisito_2 varchar(10) NULL,
	codigoprerrequisito_3 varchar(10) NULL,
	carrera varchar(100) NULL
);


-- public.cursoprerrequisito foreign keys

ALTER TABLE public.cursoprerrequisito ADD CONSTRAINT fk_curso_pp FOREIGN KEY (codigo_curso) REFERENCES public.curso(codigo);
ALTER TABLE public.cursoprerrequisito ADD CONSTRAINT fk_prerreq_1 FOREIGN KEY (codigoprerrequisito_1) REFERENCES public.curso(codigo);
ALTER TABLE public.cursoprerrequisito ADD CONSTRAINT fk_prerreq_2 FOREIGN KEY (codigoprerrequisito_2) REFERENCES public.curso(codigo);
ALTER TABLE public.cursoprerrequisito ADD CONSTRAINT fk_prerreq_3 FOREIGN KEY (codigoprerrequisito_3) REFERENCES public.curso(codigo);




-- public.cursoseccion definition

-- Drop table

-- DROP TABLE public.cursoseccion;

CREATE TABLE public.cursoseccion (
	id int4 NOT NULL,
	codigo_curso varchar(10) NULL,
	letra_seccion bpchar(1) NULL,
	relativo varchar(10) NOT NULL,
	CONSTRAINT cursoseccion_pkey PRIMARY KEY (id),
	CONSTRAINT uniq_curseseccion_curso_seccion_ciclo UNIQUE (codigo_curso, letra_seccion, relativo)
);


-- public.cursoseccion foreign keys

ALTER TABLE public.cursoseccion ADD CONSTRAINT cursoseccion_codigo_curso_fkey FOREIGN KEY (codigo_curso) REFERENCES public.curso(codigo);
ALTER TABLE public.cursoseccion ADD CONSTRAINT cursoseccion_letra_seccion_fkey FOREIGN KEY (letra_seccion) REFERENCES public.seccion(letra);




-- public.cursoseccionprofesor definition

-- Drop table

-- DROP TABLE public.cursoseccionprofesor;

CREATE TABLE public.cursoseccionprofesor (
	idcursoseccionprofesor int4 NOT NULL,
	idcursoseccion int4 NOT NULL,
	codprofesor int4 NOT NULL,
	tipoclase varchar(50) NULL,
	aula varchar(50) NULL,
	dia varchar(20) NULL,
	hora_inicio time NULL,
	hora_fin time NULL,
	CONSTRAINT cursoseccionprofesor_idcursoseccion_codprofesor_dia_hora_in_key UNIQUE (idcursoseccion, codprofesor, dia, hora_inicio),
	CONSTRAINT cursoseccionprofesor_pkey PRIMARY KEY (idcursoseccionprofesor)
);