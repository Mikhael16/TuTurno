CREATE TABLE CursoSeccionProfesor (
  IDCURSOSECCIONPROFESOR SERIAL PRIMARY KEY,
  IDCursoSeccion           INTEGER NOT NULL
                            REFERENCES CursoSeccion(ID),
  SistemaEvaluacion        VARCHAR(50) NOT NULL,
  CodProfesor              INTEGER NOT NULL
                            REFERENCES Profesor(CodProfesor),
  Tipo                     VARCHAR(50),
  Aula                     VARCHAR(50),
  Dia                      VARCHAR(20),
  Hora_Inicio              TIME,
  Hora_Fin                 TIME,
  UNIQUE (IDCursoSeccion, CodProfesor, Dia, Hora_Inicio)  
);


INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (1, 'D', 1, 'T', 'S4-205', 'SA', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (1, 'D', 1, 'P', 'S4-205', 'SA', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (2, 'D', 1, 'T', 'S4-205', 'SA', '12:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (2, 'D', 1, 'P', 'S4-205', 'SA', '13:00:00', '15:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (3, 'D', 2, 'T', 'S4-209', 'VI', '16:00:00', '17:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (3, 'D', 2, 'P', 'S4-209', 'VI', '17:00:00', '19:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (4, 'D', 2, 'T', 'AUDIOV', 'VI', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (4, 'D', 2, 'P', 'AUDIOV', 'VI', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (5, 'D', 3, 'T', 'S4-205', 'JU', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (5, 'D', 3, 'P', 'S4-205', 'JU', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (6, 'F', 4, 'T', 'S4-109', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (6, 'F', 4, 'P', 'S4-109', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (7, 'F', 5, 'T', 'S4-210', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (7, 'F', 5, 'P', 'S4-210', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (8, 'F', 6, 'T', 'S4-202', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (8, 'F', 6, 'P', 'S4-201', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (9, 'F', 5, 'T', 'S4-203', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (9, 'F', 5, 'P', 'S4-210', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (10, 'F', 7, 'T', 'S4-111', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (10, 'F', 7, 'P', 'S4-111', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (11, 'F', 8, 'T', 'S4-210', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (11, 'F', 8, 'T', 'S4-110', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (11, 'F', 10, 'P', 'S4-209', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (11, 'F', 9, 'Lab', 'LAB-FISI', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (12, 'F', 11, 'T', 'S4-209', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (12, 'F', 11, 'T', 'S4-211', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (12, 'F', 10, 'P', 'S4-214', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (12, 'F', 12, 'Lab', 'LAB-FISI', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (13, 'F', 9, 'T', 'S4-216', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (13, 'F', 9, 'T', 'S4-216', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (13, 'F', 10, 'P', 'S4-203', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (13, 'F', 13, 'Lab', 'LAB-FISI', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (14, 'F', 9, 'T', 'S4-216', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (14, 'F', 9, 'T', 'S4-216', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (14, 'F', 10, 'P', 'S4-203', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (14, 'F', 12, 'Lab', 'LAB-FISI', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (15, 'F', 11, 'T', 'S4-211', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (15, 'F', 11, 'T', 'S4-211', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (15, 'F', 10, 'P', 'S4-216', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (15, 'F', 9, 'Lab', 'LAB-FISI', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (16, 'F', 13, 'T', 'S4-206', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (16, 'F', 13, 'T', 'S4-206', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (16, 'F', 14, 'P', 'S4-214', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (16, 'F', 13, 'Lab', 'LAB-FISI', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (17, 'F', 15, 'T', 'LAB-O', 'SA', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (17, 'F', 15, 'P', 'LAB-O', 'SA', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (18, 'F', 16, 'T', 'LAB-O', 'MA', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (18, 'F', 16, 'P', 'LAB-O', 'MA', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (19, 'F', 17, 'T', 'S1-229', 'MI', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (19, 'F', 17, 'P', 'S1-229', 'MI', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (20, 'F', 17, 'T', 'LAB-O', 'MI', '11:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (20, 'F', 17, 'P', 'LAB-O', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (21, 'F', 18, 'T', 'LAB-O', 'MI', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (21, 'F', 18, 'P', 'LAB-O', 'MI', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (22, 'F', 16, 'T', 'LAB-O', 'SA', '11:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (22, 'F', 16, 'P', 'LAB-O', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (23, 'G', 19, 'T', 'S4-213', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (23, 'G', 19, 'T', 'S4-211', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (23, 'G', 19, 'P', 'S4-212', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (24, 'G', 20, 'T', 'S4-216', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (24, 'G', 20, 'T', 'S4-210', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (24, 'G', 20, 'P', 'S4-208', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (25, 'G', 21, 'T', 'S4-112', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (25, 'G', 21, 'T', 'S4-105', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (25, 'G', 21, 'P', 'S4-105', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (26, 'G', 22, 'T', 'S4-206', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (26, 'G', 22, 'T', 'S4-206', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (26, 'G', 22, 'P', 'S4-206', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (27, 'G', 23, 'T', 'S4-214', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (27, 'G', 23, 'T', 'S4-215', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (27, 'G', 23, 'P', 'S4-215', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (28, 'G', 24, 'T', 'S4-204', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (28, 'G', 24, 'T', 'S4-205', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (28, 'G', 24, 'P', 'S4-203', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (29, 'G', 25, 'T', 'S4-211', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (29, 'G', 25, 'T', 'S4-211', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (29, 'G', 25, 'P', 'S4-211', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (30, 'G', 26, 'T', 'S4-208', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (30, 'G', 26, 'T', 'S4-206', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (30, 'G', 26, 'P', 'S4-208', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (31, 'G', 24, 'T', 'S4-212', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (31, 'G', 24, 'T', 'S4-112', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (31, 'G', 24, 'P', 'S4-204', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (32, 'G', 27, 'T', 'S4-213', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (32, 'G', 27, 'T', 'S4-216', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (32, 'G', 27, 'P', 'S4-214', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (33, 'G', 28, 'T', 'S4-110', 'MA', '10:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (33, 'G', 28, 'P', 'S4-110', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (34, 'G', 21, 'T', 'S4-205', 'MA', '14:00:00', '17:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (34, 'G', 21, 'P', 'S4-212', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (35, 'G', 28, 'T', 'S4-110', 'LU', '10:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (35, 'G', 28, 'P', 'S4-110', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (36, 'G', 23, 'T', 'S4-207', 'LU', '10:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (36, 'G', 23, 'P', 'S4-207', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (37, 'G', 29, 'T', 'S4-215', 'LU', '15:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (37, 'G', 29, 'P', 'S4-111', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (38, 'G', 29, 'P', 'S4-214', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (38, 'G', 29, 'T', 'S4-214', 'SA', '08:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (39, 'F', 30, 'T', 'S4-212', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (39, 'F', 30, 'T', 'S4-212', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (39, 'F', 31, 'Lab', 'LAB-QUIM', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (39, 'F', 30, 'P', 'S4-205', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (40, 'F', 32, 'T', 'S4-112', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (40, 'F', 32, 'T', 'S4-203', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (40, 'F', 37, 'P', 'S4-204', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (40, 'F', 33, 'Lab', 'LAB-QUIM', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (41, 'F', 30, 'T', 'S4-204', 'MA', '11:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (41, 'F', 30, 'T', 'S4-204', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (41, 'F', 34, 'P', 'S4-206', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (41, 'F', 33, 'Lab', 'LAB-QUIM', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (42, 'F', 35, 'T', 'S4-105', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (42, 'F', 35, 'T', 'S4-105', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (42, 'F', 31, 'P', 'S4-214', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (42, 'F', 34, 'Lab', 'LAB-QUIM', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (43, 'F', 32, 'T', 'S4-203', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (43, 'F', 32, 'T', 'S4-215', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (43, 'F', 33, 'P', 'S2-135', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (43, 'F', 37, 'Lab', 'LAB-QUIM', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (44, 'F', 36, 'T', 'S4-201', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (44, 'F', 36, 'T', 'S4-110', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (44, 'F', 33, 'P', 'S4-112', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (44, 'F', 34, 'Lab', 'LAB-QUIM', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (45, 'F', 31, 'T', 'S4-206', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (45, 'F', 31, 'T', 'S4-112', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (45, 'F', 32, 'P', 'S4-112', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (45, 'F', 37, 'Lab', 'LAB-QUIM', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (46, 'D', 38, 'T', 'S4-109', 'MA', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (46, 'D', 38, 'P', 'S4-109', 'MA', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (47, 'D', 39, 'T', 'S4-207', 'LU', '13:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (47, 'D', 39, 'P', 'S4-207', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (48, 'D', 39, 'T', 'S4-205', 'LU', '09:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (48, 'D', 39, 'P', 'S4-205', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (49, 'D', 38, 'T', 'S4-109', 'JU', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (49, 'D', 38, 'P', 'S4-109', 'JU', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (50, 'D', 1, 'T', 'S4-202', 'VI', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (50, 'D', 1, 'P', 'S4-202', 'VI', '09:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (51, 'D', 40, 'T', 'S4-111', 'VI', '15:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (51, 'D', 40, 'P', 'S4-111', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (52, 'D', 41, 'T', 'S4-112', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (52, 'D', 41, 'P', 'S4-112', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (53, 'D', 6, 'T', 'S4-201', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (53, 'D', 6, 'P', 'S4-201', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (54, 'D', 6, 'T', 'S4-205', 'MA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (54, 'D', 6, 'P', 'S4-201', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (55, 'D', 42, 'T', 'S4-110', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (55, 'D', 42, 'P', 'S4-110', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (56, 'G', 43, 'T', 'S4-203', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (56, 'G', 43, 'P', 'S4-210', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (57, 'G', 44, 'T', 'S4-212', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (57, 'G', 44, 'P', 'S4-212', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (58, 'G', 20, 'T', 'S4-216', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (58, 'G', 20, 'P', 'S4-216', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (59, 'G', 44, 'T', 'S4-212', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (59, 'G', 44, 'P', 'S4-212', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (60, 'G', 20, 'T', 'S4-212', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (60, 'G', 45, 'P', 'S4-207', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (61, 'G', 43, 'T', 'S4-206', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (61, 'G', 43, 'P', 'S4-212', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (62, 'G', 46, 'T', 'S4-214', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (62, 'G', 46, 'P', 'S2-140', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (63, 'F', 47, 'T', 'AUDIOV', 'JU', '16:00:00', '19:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (63, 'F', 47, 'P', 'S4-112', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (63, 'F', 32, 'Lab', 'LAB-QUIM', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (64, 'F', 30, 'T', 'S4-210', 'LU', '08:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (64, 'F', 37, 'P', 'S2-135', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (64, 'F', 47, 'Lab', 'LAB-QUIM', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (65, 'F', 36, 'T', 'S4-209', 'MA', '08:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (65, 'F', 47, 'P', 'S4-206', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (65, 'F', 37, 'Lab', 'LAB-QUIM', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (66, 'G', 48, 'T', 'S4-201', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (66, 'G', 48, 'P', 'S4-203', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (67, 'G', 49, 'T', 'S4-201', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (67, 'G', 49, 'P', 'S4-201', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (68, 'G', 48, 'T', 'S4-203', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (68, 'G', 48, 'P', 'S4-215', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (69, 'G', 43, 'T', 'S4-202', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (69, 'G', 43, 'P', 'S4-209', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (70, 'G', 49, 'T', 'S4-213', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (70, 'G', 49, 'P', 'S4-213', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (71, 'G', 50, 'T', 'S4-111', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (71, 'G', 50, 'T', 'S4-111', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (71, 'G', 50, 'P', 'S4-110', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (72, 'G', 46, 'T', 'S4-202', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (72, 'G', 46, 'T', 'S4-215', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (72, 'G', 28, 'P', 'S4-105', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (73, 'G', 50, 'T', 'S4-110', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (73, 'G', 50, 'T', 'S4-111', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (73, 'G', 19, 'P', 'S4-203', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (74, 'G', 22, 'T', 'S4-215', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (74, 'G', 22, 'T', 'S4-216', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (74, 'G', 22, 'P', 'S4-215', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (75, 'G', 51, 'T', 'S4-213', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (75, 'G', 51, 'T', 'S4-205', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (75, 'G', 51, 'P', 'S4-205', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (76, 'G', 52, 'T', 'S4-210', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (76, 'G', 52, 'P', 'S4-210', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (77, 'G', 53, 'T', 'S4-208', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (77, 'G', 53, 'P', 'S4-208', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (78, 'G', 52, 'T', 'S4-207', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (78, 'G', 52, 'P', 'S4-211', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (79, 'G', 53, 'T', 'S4-208', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (79, 'G', 53, 'P', 'S4-208', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (80, 'G', 26, 'T', 'S4-211', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (80, 'G', 26, 'P', 'S4-206', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (81, 'G', 12, 'T', 'S4-207', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (81, 'G', 12, 'T', 'S4-205', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (81, 'G', 10, 'P', 'S4-207', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (81, 'G', 12, 'Lab', 'LAB-FISI', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (82, 'G', 14, 'T', 'S4-112', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (82, 'G', 14, 'T', 'S4-112', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (82, 'G', 10, 'P', 'S4-214', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (82, 'G', 12, 'Lab', 'LAB-FISI', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (83, 'G', 11, 'T', 'S4-213', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (83, 'G', 11, 'T', 'S4-212', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (83, 'G', 14, 'P', 'S4-214', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (83, 'G', 54, 'Lab', 'LAB-FISI', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (84, 'G', 8, 'T', 'S4-203', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (84, 'G', 8, 'T', 'S4-203', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (84, 'G', 54, 'P', 'S4-214', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (84, 'G', 14, 'Lab', 'LAB-FISI', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (85, 'G', 13, 'T', 'S4-207', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (85, 'G', 13, 'T', 'S4-207', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (85, 'G', 10, 'P', 'S2-135', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (85, 'G', 14, 'Lab', 'LAB-FISI', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (86, 'G', 12, 'T', 'S4-215', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (86, 'G', 12, 'T', 'S4-216', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (86, 'G', 54, 'P', 'S4-206', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (86, 'G', 13, 'Lab', 'LAB-FISI', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (87, 'G', 55, 'T', 'S4-111', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (87, 'G', 55, 'T', 'S4-110', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (87, 'G', 54, 'P', 'S4-214', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (87, 'G', 55, 'Lab', 'LAB-FISI', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (88, 'G', 56, 'T', 'S4-105', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (88, 'G', 56, 'P', 'S4-110', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (89, 'G', 54, 'T', 'S4-207', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (89, 'G', 54, 'P', 'S4-207', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (90, 'G', 26, 'T', 'S4-212', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (90, 'G', 26, 'P', 'S4-212', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (91, 'G', 25, 'T', 'S4-211', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (91, 'G', 25, 'T', 'S4-211', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (91, 'G', 25, 'P', 'S4-211', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (92, 'G', 27, 'T', 'S4-213', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (92, 'G', 27, 'T', 'S4-201', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (92, 'G', 27, 'P', 'S4-215', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (93, 'G', 19, 'T', 'S4-111', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (93, 'G', 19, 'T', 'S4-209', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (93, 'G', 19, 'P', 'S4-209', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (94, 'G', 57, 'T', 'S4-105', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (94, 'G', 57, 'T', 'S4-105', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (94, 'G', 57, 'P', 'S4-203', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (95, 'G', 52, 'T', 'S4-105', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (95, 'G', 52, 'P', 'S4-105', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (96, 'G', 53, 'T', 'S4-208', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (96, 'G', 53, 'P', 'S4-208', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (97, 'G', 49, 'T', 'S1-126', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (97, 'G', 49, 'P', 'S4-201', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (98, 'G', 58, 'T', 'S4-213', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (98, 'G', 58, 'P', 'S1-124', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (102, 'D', 62, 'P', 'S4-206', 'LU', '16:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (103, 'D', 63, 'P', 'S1-226', 'MA', '16:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (104, 'D', 64, 'P', 'S4-205', 'MA', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (105, 'D', 65, 'P', 'S4-205', 'MI', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (106, 'F', 66, 'T', 'S4-105', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (106, 'F', 66, 'P', 'S4-105', 'MA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (107, 'F', 67, 'T', 'S4-105', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (107, 'F', 67, 'P', 'S4-110', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (108, 'G', 68, 'T', 'S4-203', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (108, 'G', 68, 'P', 'S4-203', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (109, 'D', 69, 'T', 'S1-227', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (109, 'D', 69, 'P', 'S1-227', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (110, 'F', 70, 'T', 'S4-204', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (110, 'F', 70, 'P', 'LAB-O', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (111, 'F', 66, 'T', 'S1-227', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (111, 'F', 66, 'P', 'S1-227', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (112, 'F', 71, 'T', 'S4-204', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (112, 'F', 71, 'P', 'S4-204', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (113, 'F', 63, 'T', 'S4-109', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (113, 'F', 63, 'P', 'S4-109', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (114, 'F', 72, 'T', 'S4-201', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (114, 'F', 72, 'P', 'S4-201', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (115, 'F', 59, 'T', 'S4-202', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (115, 'F', 59, 'P', 'S4-202', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (116, 'F', 62, 'T', 'S4-111', 'MI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (116, 'F', 73, 'P', 'S4-213', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (117, 'F', 62, 'T', 'S4-111', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (117, 'F', 73, 'P', 'S4-213', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (118, 'F', 70, 'T', 'S4-204', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (118, 'F', 70, 'P', 'S4-204', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (119, 'F', 74, 'T', 'S4-207', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (119, 'F', 74, 'P', 'S4-207', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (120, 'F', 42, 'T', 'AUDIOV', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (120, 'F', 42, 'P', 'AUDIOV', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (121, 'F', 75, 'T', 'S4-111', 'SA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (121, 'F', 75, 'P', 'S4-111', 'SA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (122, 'F', 76, 'T', 'S4-105', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (122, 'F', 76, 'P', 'S4-105', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (123, 'F', 64, 'T', 'S4-205', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (123, 'F', 64, 'P', 'S4-205', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (124, 'F', 67, 'T', 'S4-105', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (124, 'F', 67, 'P', 'S4-105', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (125, 'F', 4, 'T', 'AUDIOV', 'MA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (125, 'F', 4, 'P', 'AUDIOV', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (126, 'F', 77, 'T', 'S4-202', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (126, 'F', 77, 'P', 'S4-202', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (127, 'F', 78, 'T', 'S4-209', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (127, 'F', 78, 'P', 'S4-209', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (128, 'F', 65, 'T', 'S4-208', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (128, 'F', 65, 'P', 'S4-208', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (129, 'F', 79, 'T', 'S4-105', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (129, 'F', 79, 'P', 'S4-105', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (130, 'F', 5, 'T', 'S4-210', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (130, 'F', 69, 'P', 'LAB-O', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (131, 'F', 5, 'T', 'S4-210', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (131, 'F', 69, 'P', 'S1-124', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (132, 'F', 80, 'T', 'S4-201', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (132, 'F', 80, 'P', 'S4-201', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (133, 'F', 81, 'T', 'S4-111', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (133, 'F', 81, 'P', 'S4-111', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (134, 'F', 74, 'T', 'S4-201', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (134, 'F', 74, 'P', 'S4-207', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (135, 'F', 70, 'T', 'S4-204', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (135, 'F', 70, 'P', 'S4-206', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (136, 'F', 77, 'T', 'S4-202', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (136, 'F', 77, 'P', 'S4-202', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (137, 'F', 82, 'T', 'S4-112', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (137, 'F', 82, 'P', 'S4-112', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (138, 'F', 83, 'T', 'S4-112', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (138, 'F', 83, 'P', 'S4-112', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (139, 'F', 64, 'T', 'S4-205', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (139, 'F', 64, 'P', 'S4-205', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (140, 'F', 4, 'T', 'S4-109', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (140, 'F', 4, 'P', 'S4-109', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (141, 'F', 83, 'T', 'S4-112', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (141, 'F', 83, 'P', 'S4-112', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (142, 'F', 80, 'T', 'S4-213', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (142, 'F', 80, 'P', 'S4-213', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (143, 'D', 79, 'P', 'AUDIOV', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (143, 'D', 79, 'P', 'AUDIOV', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (144, 'D', 77, 'P', 'S4-202', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (144, 'D', 77, 'P', 'S1-224', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (145, 'F', 84, 'T', 'S4-111', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (145, 'F', 84, 'P', 'S4-111', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (146, 'F', 80, 'T', 'S4-213', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (146, 'F', 80, 'P', 'S4-213', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (147, 'F', 71, 'T', 'AUDIOV', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (147, 'F', 71, 'P', 'AUDIOV', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (148, 'F', 66, 'T', 'S4-211', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (148, 'F', 66, 'P', 'S4-212', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (149, 'F', 85, 'T', 'S4-213', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (149, 'F', 85, 'P', 'S4-213', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (150, 'F', 86, 'T', 'S4-105', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (150, 'F', 86, 'P', 'S4-214', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (151, 'F', 87, 'T', 'S1-124', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (151, 'F', 87, 'P', 'S1-124', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (152, 'F', 60, 'T', 'S4-105', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (152, 'F', 60, 'P', 'S4-110', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (153, 'F', 67, 'T', 'S4-110', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (153, 'F', 67, 'P', 'S4-110', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (99, 'D', 59, 'P', 'S4-202', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (99, 'D', 59, 'P', 'S4-202', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (100, 'D', 60, 'P', 'S4-110', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (100, 'D', 60, 'P', 'S4-110', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (101, 'D', 61, 'P', 'S4-109', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (101, 'D', 61, 'P', 'S4-109', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (154, 'F', 78, 'T', 'S4-210', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (154, 'F', 78, 'P', 'S1-226', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (155, 'F', 88, 'T', 'S1-126', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (155, 'F', 88, 'P', 'S1-126', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (156, 'F', 86, 'T', 'S4-216', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (156, 'F', 86, 'P', 'S4-216', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (157, 'F', 89, 'T', 'S4-105', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (157, 'F', 89, 'P', 'S4-105', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (163, 'D', 38, 'P', 'S4-109', 'LU', '08:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (164, 'D', 1, 'P', 'S4-204', 'JU', '08:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (165, 'D', 90, 'P', 'S4-202', 'VI', '14:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (166, 'D', 63, 'P', 'S4-109', 'MI', '14:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (167, 'D', 91, 'P', 'S4-112', 'MI', '08:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (168, 'D', 91, 'P', 'S4-109', 'VI', '08:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (169, 'B', 41, 'T', 'S4-112', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (170, 'B', 41, 'T', 'S4-112', 'SA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (171, 'B', 92, 'T', 'S4-204', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (172, 'D', 61, 'T', 'S4-111', 'LU', '16:00:00', '17:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (172, 'D', 61, 'P', 'S4-111', 'LU', '17:00:00', '19:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (173, 'B', 38, 'T', 'S4-110', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (174, 'B', 3, 'T', 'S4-201', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (175, 'B', 2, 'T', 'S4-208', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (176, 'D', 93, 'T', 'S4-216', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (176, 'D', 93, 'P', 'S4-216', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (177, 'D', 85, 'T', 'S4-213', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (177, 'D', 85, 'P', 'S4-213', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (178, 'D', 47, 'T', 'S4-214', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (178, 'D', 47, 'P', 'S4-111', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (179, 'D', 65, 'T', 'S4-201', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (179, 'D', 65, 'P', 'S4-202', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (180, 'D', 74, 'T', 'S4-202', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (180, 'D', 74, 'P', 'S4-202', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (181, 'D', 94, 'P', 'S1-329', 'VI', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (182, 'D', 95, 'P', 'S1-224', 'VI', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (183, 'D', 94, 'P', 'S1-329', 'JU', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (184, 'D', 65, 'P', 'S4-111', 'VI', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (185, 'D', 96, 'P', 'S4-208', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (185, 'D', 96, 'P', 'S4-208', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (186, 'D', 97, 'P', 'S4-209', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (186, 'D', 97, 'P', 'S4-209', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (187, 'F', 98, 'T', 'S4-209', 'SA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (187, 'F', 98, 'P', 'S4-209', 'SA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (188, 'G', 99, 'T', 'S1-229', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (188, 'G', 99, 'P', 'S1-229', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (189, 'F', 100, 'T', 'S1-124', 'SA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (189, 'F', 100, 'P', 'S1-124', 'SA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (190, 'F', 100, 'T', 'S4-112', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (190, 'F', 100, 'P', 'S4-112', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (191, 'F', 101, 'T', 'S2-140', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (191, 'F', 101, 'P', 'S2-140', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (192, 'F', 102, 'T', 'S4-203', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (192, 'F', 102, 'P', 'S4-203', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (193, 'F', 103, 'T', 'S4-110', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (193, 'F', 103, 'P', 'S4-110', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (194, 'F', 97, 'T', 'S4-205', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (194, 'F', 97, 'P', 'S4-205', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (195, 'F', 104, 'T', 'LAB-O', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (195, 'F', 104, 'P', 'LAB-O', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (196, 'F', 105, 'T', 'S4-216', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (196, 'F', 105, 'P', 'S4-216', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (197, 'F', 106, 'T', 'LAB-O', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (197, 'F', 106, 'P', 'LAB-O', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (198, 'F', 97, 'T', 'S4-203', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (198, 'F', 97, 'P', 'S4-204', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (199, 'F', 95, 'T', 'S1-227', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (199, 'F', 95, 'P', 'S1-227', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (200, 'F', 107, 'T', 'S1-229', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (200, 'F', 107, 'P', 'S1-229', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (201, 'F', 108, 'T', 'S1-126', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (201, 'F', 108, 'P', 'S1-126', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (202, 'G', 109, 'T', 'AUDIOV', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (202, 'G', 109, 'P', 'AUDIOV', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (203, 'G', 110, 'T', 'AUDIOV', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (203, 'G', 110, 'P', 'AUDIOV', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (204, 'F', 96, 'T', 'S4-214', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (204, 'F', 96, 'P', 'S4-214', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (205, 'F', 101, 'T', 'S2-140', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (205, 'F', 101, 'P', 'S2-140', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (206, 'F', 111, 'T', 'S4-206', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (206, 'F', 111, 'P', 'S4-202', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (207, 'F', 112, 'T', 'S4-109', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (207, 'F', 112, 'P', 'S4-109', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (208, 'F', 92, 'T', 'S4-207', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (209, 'F', 113, 'T', 'S4-205', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (210, 'F', 114, 'T', 'S1-126', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (210, 'F', 114, 'P', 'S1-126', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (211, 'F', 44, 'T', 'S1-227', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (211, 'F', 44, 'P', 'S1-227', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (212, 'F', 15, 'T', 'S1-226', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (212, 'F', 15, 'P', 'S1-226', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (213, 'F', 15, 'T', 'S1-226', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (213, 'F', 15, 'P', 'S1-226', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (214, 'F', 99, 'T', 'S1-229', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (214, 'F', 99, 'P', 'S1-229', 'MA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (215, 'G', 115, 'T', 'S4-214', 'VI', '09:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (215, 'G', 115, 'P', 'S4-214', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (216, 'G', 116, 'T', 'AUDIOV', 'LU', '15:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (216, 'G', 116, 'P', 'AUDIOV', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (217, 'G', 92, 'T', 'S4-207', 'MI', '10:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (217, 'G', 92, 'P', 'S4-207', 'MI', '11:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (218, 'G', 111, 'T', 'S4-201', 'VI', '15:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (218, 'G', 111, 'P', 'S4-201', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (219, 'G', 111, 'T', 'S4-210', 'LU', '15:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (219, 'G', 111, 'P', 'S4-210', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (220, 'F', 117, 'T', 'S1-126', 'MI', '10:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (220, 'F', 118, 'P', 'S1-126', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (220, 'F', 117, 'P', 'S1-126', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (221, 'F', 119, 'T', 'S1-226', 'MA', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (221, 'F', 119, 'P', 'S1-226', 'MA', '09:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (222, 'F', 119, 'T', 'S1-226', 'VI', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (222, 'F', 119, 'P', 'S1-226', 'VI', '09:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (223, 'F', 117, 'T', 'LAB-O', 'JU', '08:00:00', '09:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (223, 'F', 117, 'P', 'LAB-O', 'JU', '09:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (224, 'F', 120, 'T', 'LAB-O', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (224, 'F', 120, 'P', 'LAB-O', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (225, 'F', 104, 'T', 'S1-124', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (225, 'F', 117, 'P', 'S1-124', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (226, 'F', 120, 'T', 'LAB-O', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (226, 'F', 120, 'P', 'LAB-O', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (227, 'G', 92, 'T', 'S4-209', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (227, 'G', 92, 'P', 'S4-209', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (228, 'G', 121, 'T', 'S2-140', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (228, 'G', 121, 'P', 'S2-140', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (229, 'F', 122, 'T', 'S4-207', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (229, 'F', 122, 'P', 'S4-207', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (230, 'F', 118, 'T', 'AUDIOV', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (230, 'F', 118, 'P', 'AUDIOV', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (231, 'F', 122, 'T', 'S4-201', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (231, 'F', 122, 'P', 'S4-201', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (232, 'F', 105, 'T', 'S4-110', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (232, 'F', 105, 'P', 'S4-206', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (233, 'F', 123, 'T', 'S4-111', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (233, 'F', 123, 'P', 'S4-211', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (234, 'F', 123, 'T', 'S4-204', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (234, 'F', 123, 'P', 'AUDIOV', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (235, 'F', 107, 'T', 'S4-216', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (235, 'F', 107, 'P', 'S4-216', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (236, 'F', 124, 'T', 'LAB-O', 'SA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (236, 'F', 124, 'P', 'LAB-O', 'SA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (237, 'F', 125, 'T', 'S4-212', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (237, 'F', 125, 'P', 'S4-212', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (238, 'F', 72, 'T', 'S4-112', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (238, 'F', 72, 'P', 'S4-112', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (239, 'F', 126, 'T', 'S4-206', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (239, 'F', 126, 'P', 'S4-206', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (240, 'F', 127, 'T', 'S4-205', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (240, 'F', 127, 'P', 'S4-205', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (241, 'F', 122, 'T', 'S4-206', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (241, 'F', 122, 'P', 'S4-206', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (242, 'F', 128, 'T', 'AUDIOV', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (242, 'F', 128, 'P', 'LAB-O', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (243, 'F', 105, 'T', 'S4-209', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (243, 'F', 105, 'P', 'S4-109', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (244, 'F', 104, 'T', 'LAB-O', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (244, 'F', 104, 'P', 'LAB-O', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (245, 'F', 123, 'T', 'S4-215', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (245, 'F', 123, 'P', 'S4-215', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (246, 'D', 129, 'T', 'S1-229', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (246, 'D', 129, 'P', 'S1-126', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (247, 'D', 101, 'T', 'S2-140', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (247, 'D', 101, 'P', 'S2-140', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (248, 'D', 129, 'T', 'S4-204', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (248, 'D', 129, 'P', 'LAB-O', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (249, 'F', 102, 'T', 'S4-213', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (249, 'F', 102, 'P', 'S4-213', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (250, 'F', 112, 'T', 'S4-211', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (250, 'F', 112, 'P', 'S4-211', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (251, 'F', 113, 'T', 'S1-329', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (251, 'F', 113, 'P', 'S1-329', 'MI', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (252, 'F', 18, 'T', 'S1-124', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (252, 'F', 18, 'P', 'S1-124', 'JU', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (253, 'F', 130, 'T', 'S1-124', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (253, 'F', 130, 'P', 'S1-124', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (254, 'F', 131, 'T', 'S4-210', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (254, 'F', 131, 'P', 'S4-210', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (255, 'F', 108, 'T', 'S1-126', 'SA', '08:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (255, 'F', 108, 'P', 'S1-126', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (256, 'F', 108, 'T', 'S1-126', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (256, 'F', 108, 'P', 'S1-126', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (257, 'F', 114, 'T', 'S1-124', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (257, 'F', 114, 'P', 'S1-124', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (258, 'F', 132, 'T', 'LAB-O', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (258, 'F', 132, 'P', 'LAB-O', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (259, 'F', 16, 'T', 'S1-229', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (259, 'F', 16, 'P', 'S1-229', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (260, 'D', 120, 'P', 'S1-226', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (260, 'D', 120, 'P', 'S1-226', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (261, 'D', 129, 'P', 'S1-229', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (261, 'D', 129, 'P', 'S1-229', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (262, 'F', 133, 'T', 'S4-209', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (262, 'F', 133, 'P', 'S4-209', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (263, 'F', 134, 'T', 'S4-208', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (263, 'F', 134, 'P', 'S4-208', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (264, 'F', 18, 'T', 'S4-213', 'LU', '16:00:00', '17:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (264, 'F', 18, 'P', 'S4-213', 'LU', '17:00:00', '19:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (265, 'F', 121, 'T', '-', '-', NULL, NULL);
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (265, 'F', 121, 'P', '-', '-', NULL, NULL);
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (266, 'F', 106, 'T', 'S1-227', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (266, 'F', 106, 'P', 'S1-227', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (267, 'F', 15, 'T', 'S1-226', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (267, 'F', 15, 'P', 'S1-226', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (268, 'F', 112, 'T', 'S4-216', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (268, 'F', 112, 'P', 'S4-216', 'VI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (269, 'F', 96, 'T', 'S4-210', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (269, 'F', 96, 'P', 'S4-210', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (270, 'F', 135, 'P', 'S4-111', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (270, 'F', 135, 'P', 'S4-111', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (271, 'D', 136, 'P', 'S1-226', 'SA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (271, 'D', 136, 'P', 'S1-226', 'SA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (272, 'D', 137, 'P', 'S1-227', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (272, 'D', 137, 'P', 'S1-227', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (273, 'G', 95, 'T', 'S4-209', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (273, 'G', 95, 'P', 'S4-209', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (279, 'D', 114, 'P', 'S4-109', 'VI', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (280, 'D', 118, 'P', 'S4-109', 'MA', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (281, 'D', 94, 'P', 'S1-329', 'MA', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (282, 'D', 107, 'P', 'S4-214', 'VI', '18:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (274, 'F', 138, 'T', 'S4-215', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (274, 'F', 138, 'P', 'S4-215', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (275, 'F', 102, 'T', 'S4-206', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (275, 'F', 102, 'P', 'S4-206', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (276, 'G', 82, 'T', 'S4-111', 'LU', '19:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (276, 'G', 82, 'P', 'S4-111', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (277, 'F', 139, 'T', 'LAB-O', 'MA', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (277, 'F', 139, 'P', 'LAB-O', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (278, 'F', 140, 'T', 'S1-229', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (278, 'F', 140, 'P', 'S1-229', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (293, 'F', 106, 'T', 'S1-124', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (293, 'F', 106, 'P', 'S1-124', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (294, 'F', 113, 'T', 'S1-226', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (294, 'F', 113, 'P', 'S1-226', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (295, 'G', 141, 'T', 'S1-126', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (295, 'G', 141, 'P', 'S1-126', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (296, 'F', 142, 'T', 'S1-126', 'JU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (296, 'F', 142, 'P', 'S1-126', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (296, 'F', 142, 'P', 'S1-126', 'SA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (297, 'F', 143, 'T', 'S1-126', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (297, 'F', 143, 'P', 'S1-329', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (298, 'F', 144, 'T', 'S4-112', 'VI', '18:00:00', '21:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (298, 'F', 144, 'P', 'S1-124', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (299, 'F', 145, 'T', 'S1-224', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (299, 'F', 145, 'P', 'S1-224', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (300, 'F', 146, 'T', 'S1-224', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (300, 'F', 146, 'P', 'S1-224', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (301, 'G', 137, 'T', 'S1-224', 'MA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (301, 'G', 137, 'P', 'S1-224', 'JU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (302, 'D', 147, 'P', 'S4-209', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (302, 'D', 147, 'P', 'S4-209', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (303, 'D', 147, 'P', 'S4-211', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (303, 'D', 147, 'P', 'S4-209', 'SA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (304, 'D', 45, 'P', 'S4-209', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (304, 'D', 45, 'P', 'S4-208', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (305, 'G', 148, 'T', 'S4-206', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (305, 'G', 148, 'P', 'S4-206', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (306, 'F', 93, 'T', 'S4-209', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (306, 'F', 93, 'P', 'S4-209', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (307, 'F', 149, 'T', 'S4-214', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (307, 'F', 149, 'P', 'S4-205', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (308, 'F', 150, 'T', 'LAB-O', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (308, 'F', 150, 'P', 'S1-226', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (309, 'F', 61, 'T', 'S4-112', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (309, 'F', 61, 'P', 'S4-112', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (310, 'D', 147, 'T', 'S4-211', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (310, 'D', 147, 'P', 'S4-209', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (311, 'D', 151, 'T', 'S4-211', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (311, 'D', 45, 'P', 'S4-209', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (312, 'F', 149, 'T', 'S4-201', 'MI', '08:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (312, 'F', 149, 'P', 'S4-209', 'LU', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (313, 'F', 31, 'T', 'S4-206', 'VI', '10:00:00', '13:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (313, 'F', 31, 'P', 'S4-204', 'MI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (314, 'F', 34, 'T', 'S4-211', 'MI', '14:00:00', '17:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (314, 'F', 34, 'P', 'S4-105', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (315, 'D', 152, 'T', 'S1-126', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (315, 'D', 152, 'P', 'S1-126', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (316, 'D', 153, 'T', 'S1-226', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (316, 'D', 153, 'P', 'S1-226', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (317, 'D', 153, 'T', 'S1-226', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (317, 'D', 153, 'P', 'S1-226', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (318, 'F', 154, 'T', 'S4-210', 'MI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (318, 'F', 154, 'P', 'S4-207', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (319, 'F', 36, 'T', 'S4-215', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (319, 'F', 36, 'P', 'S4-204', 'VI', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (320, 'F', 154, 'T', 'S4-105', 'MA', '08:00:00', '11:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (320, 'F', 154, 'P', 'S4-202', 'LU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (321, 'F', 48, 'T', 'S4-213', 'VI', '18:00:00', '21:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (321, 'F', 48, 'P', 'S4-213', 'MA', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (322, 'F', 149, 'T', 'S4-111', 'LU', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (322, 'F', 33, 'P', 'S4-203', 'VI', '08:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (323, 'F', 35, 'T', 'S4-111', 'VI', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (323, 'F', 35, 'P', 'S4-111', 'MI', '08:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (324, 'F', 155, 'T', 'S4-213', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (324, 'F', 155, 'P', 'S4-213', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (325, 'F', 156, 'T', 'S4-208', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (325, 'F', 156, 'P', 'S4-208', 'MI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (326, 'F', 155, 'T', 'S4-111', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (326, 'F', 155, 'P', 'S4-213', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (327, 'F', 152, 'T', 'S4-202', 'JU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (327, 'F', 152, 'P', 'S4-214', 'MI', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (328, 'F', 155, 'T', 'S4-109', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (328, 'F', 155, 'P', 'S4-207', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (329, 'F', 156, 'T', 'S4-207', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (329, 'F', 156, 'P', 'S4-207', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (330, 'F', 62, 'T', 'S4-111', 'LU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (330, 'F', 62, 'P', 'S4-111', 'VI', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (331, 'F', 157, 'T', 'S1-329', 'SA', '08:00:00', '10:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (331, 'F', 157, 'P', 'S1-329', 'SA', '10:00:00', '12:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (332, 'F', 158, 'T', 'AUTOMAT', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (332, 'F', 158, 'P', 'AUTOMAT', 'MI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (333, 'F', 158, 'T', 'S4-105', 'MA', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (333, 'F', 158, 'P', 'S4-109', 'JU', '12:00:00', '14:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (334, 'F', 156, 'T', 'S4-112', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (334, 'F', 156, 'P', 'S4-109', 'VI', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (335, 'F', 156, 'T', 'S4-208', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (335, 'F', 156, 'P', 'S4-208', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (336, 'F', 152, 'T', 'AUTOMAT', 'JU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (336, 'F', 152, 'P', 'AUTOMAT', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (337, 'F', 158, 'T', 'AUTOMAT', 'LU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (337, 'F', 158, 'P', 'AUTOMAT', 'LU', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (338, 'F', 153, 'T', 'S4-213', 'LU', '20:00:00', '22:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (338, 'F', 45, 'P', 'S1-126', 'VI', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (339, 'F', 153, 'T', 'S4-111', 'MI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (339, 'F', 45, 'P', 'S4-112', 'VI', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (340, 'F', 93, 'T', 'S4-215', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (340, 'F', 93, 'P', 'S4-215', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (341, 'F', 59, 'T', 'S4-202', 'MA', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (341, 'F', 59, 'P', 'S4-202', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (342, 'F', 151, 'T', 'LAB-O', 'JU', '14:00:00', '16:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (342, 'F', 151, 'P', 'S2-140', 'JU', '16:00:00', '18:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (343, 'F', 151, 'T', 'S4-105', 'MA', '18:00:00', '20:00:00');
INSERT INTO CursoSeccionProfesor (IDCursoSeccion, SistemaEvaluacion, CodProfesor, Tipo, Aula, Dia, Hora_Inicio, Hora_Fin)
VALUES (343, 'F', 151, 'P', 'S4-105', 'MA', '20:00:00', '22:00:00');
