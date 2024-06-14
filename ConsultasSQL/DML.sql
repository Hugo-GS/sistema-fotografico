-- Seccion Hugo====
-- Insertar en la tabla `tipousuario`
INSERT INTO tipousuario (nombre) VALUES ('Admin');
INSERT INTO tipousuario (nombre) VALUES ('Encargado');

-- Insertar en la tabla `persona`
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Juan', 'Pérez', 'Gómez');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('María', 'López', 'Fernández');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Carlos', 'García', 'Martínez');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Ana', 'Rodríguez', 'Sánchez');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Luis', 'Hernández', 'Ruiz');


-- Insertar en la tabla `cliente`
INSERT INTO cliente (id) VALUES (2);
INSERT INTO cliente (id) VALUES (4);
INSERT INTO cliente (id) VALUES (5);
INSERT INTO cliente (id) VALUES (3);
INSERT INTO cliente (id) VALUES (1);

-- Insertar en la tabla `encargado`

-- Insertar en la tabla `sucursal`
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal A', 'Calle 123, Ciudad A');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal B', 'Calle 456, Ciudad B');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal C', 'Calle 789, Ciudad C');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal D', 'Calle 101, Ciudad D');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal E', 'Calle 102, Ciudad E');

-- Insertar en la tabla `fotos`
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de la playa', '2024-01-01 10:00:00', 'A', 2);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de la montaña', '2024-01-02 11:00:00', 'B', 4);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del bosque', '2024-01-03 12:00:00', 'C', 5);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del río', '2024-01-04 13:00:00', 'A', 3);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del desierto', '2024-01-05 14:00:00', 'B', 1);

-- Insertar en la tabla `encargadosucursal`

-- Insertar en la tabla `venta`
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Completada', '2024-02-01 15:00:00', 100.00, 3, 2);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Pendiente', '2024-02-02 16:00:00', 200.00, 1, 4);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Cancelada', '2024-02-03 17:00:00', 300.00, 4, 5);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Completada', '2024-02-04 18:00:00', 400.00, 5, 3);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Pendiente', '2024-02-05 19:00:00', 500.00, 2, 1);

-- Insertar en la tabla `entregatrabajo`
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('A', '2024-03-01 10:00:00', 1);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('B', '2024-03-02 11:00:00', 2);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2024-03-03 12:00:00', 3);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('A', '2024-03-04 13:00:00', 4);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('B', '2024-03-05 14:00:00', 5);

-- Insertar en la tabla `impresion`
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión A', 'Hoja pequeña 20x27 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión B', 'Hoja pequeña 18x26 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión C', 'Hoja pequeña 13x20 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión D', 'Hoja pequeña 11x17 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión E', 'Hoja pequeña 9x13 cm', 'A');

-- Insertar en la tabla `precio`
INSERT INTO precio (fech_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2024-04-01 00:00:00', '2024-04-30 23:59:59', 10.00, 1);
INSERT INTO precio (fech_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2024-04-01 00:00:00', '2024-04-30 23:59:59', 20.00, 2);
INSERT INTO precio (fech_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2024-04-01 00:00:00', '2024-04-30 23:59:59', 30.00, 3);
INSERT INTO precio (fech_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2024-04-01 00:00:00', '2024-04-30 23:59:59', 40.00, 4);
INSERT INTO precio (fech_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2024-04-01 00:00:00', '2024-04-30 23:59:59', 50.00, 5);

-- Insertar en la tabla `detalleventa`
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (1, 1, 1, 10.00, 1);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (2, 2, 2, 20.00, 2);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (3, 3, 3, 30.00, 3);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (4, 4, 4, 40.00, 4);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (5, 5, 5, 50.00, 5);

-- Insertar en la tabla `conceptobonodescuento`
INSERT INTO conceptobonodescuento (concepto, valor) VALUES ('Descuento Antiguedad Enmarcado', 20.00);


-- Insertar en la tabla `bonodescuento`
INSERT INTO bonodescuento (id_detalleventa_venta, id_detalleventa_impresion, id_conceptodescuento) VALUES (1, 1, 1);
INSERT INTO bonodescuento (id_detalleventa_venta, id_detalleventa_impresion, id_conceptodescuento) VALUES (2, 2, 2);
INSERT INTO bonodescuento (id_detalleventa_venta, id_detalleventa_impresion, id_conceptodescuento) VALUES (3, 3, 3);
INSERT INTO bonodescuento (id_detalleventa_venta, id_detalleventa_impresion, id_conceptodescuento) VALUES (4, 4, 4);
INSERT INTO bonodescuento (id_detalleventa_venta, id_detalleventa_impresion, id_conceptodescuento) VALUES (5, 5, 5);

-- Insertar en la tabla `conceptoservicio`
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Servicio Enmarcado', 20.00);


-- Insertar en la tabla `servicioagregado`
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (1, 1, 1);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (2, 2, 2);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (3, 3, 3);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (4, 4, 4);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (5, 5, 5);

--=====================================================================================================================
--=====================================================================================================================
--=====================================================================================================================


-- Seccion Clever

-- Insertando datos en la tabla persona
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Pedro', 'González', 'López');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Sofía', 'Martínez', 'Díaz');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Diego', 'Hernández', 'Castro');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Laura', 'Fernández', 'Méndez');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Jorge', 'Ramírez', 'Pérez');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Camila', 'Rodríguez', 'García');



-- Insertando datos en la tabla usuario
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('pedrog', 'clave123', 6, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('sofam', 'clave456', 7, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('diegh', 'clave789', 8, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('laurf', 'clave101', 9, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('jorger', 'clave112', 10, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('camilr', 'clave113', 11, 2);


-- Insertando datos en la tabla encargado
INSERT INTO encargado (id, telefono) VALUES (6, '1111111111');
INSERT INTO encargado (id, telefono) VALUES (7, '3333333333');
INSERT INTO encargado (id, telefono) VALUES (8, '5555555555');
INSERT INTO encargado (id, telefono) VALUES (9, '2222222222');
INSERT INTO encargado (id, telefono) VALUES (10, '4444444444');
INSERT INTO encargado (id, telefono) VALUES (11, '6666666666');

-- Insertando datos en la tabla sucursal
INSERT INTO sucursal (nombre, direccion) VALUES ('Centro', 'Avenida Central 100');
INSERT INTO sucursal (nombre, direccion) VALUES ('Norte', 'Calle Norte 200');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sur', 'Calle Sur 300');
INSERT INTO sucursal (nombre, direccion) VALUES ('Este', 'Calle Este 400');
INSERT INTO sucursal (nombre, direccion) VALUES ('Oeste', 'Calle Oeste 500');
INSERT INTO sucursal (nombre, direccion) VALUES ('Centro 2', 'Avenida Central 200');

-- Insertando datos en la tabla encargadosucursal
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (1, 6, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (1, 7, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (1, 8, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (2, 9, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (2, 10, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (3, 11, 'A');

-- Insertando datos en la tabla fotos
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de paisaje montañoso', '2023-02-01 09:00:00', 'A', 1);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de retrato familiar', '2023-03-01 10:00:00', 'A', 2);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de evento corporativo', '2023-04-01 11:00:00', 'A', 3);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de producto artesanal', '2023-05-01 12:00:00', 'A', 4);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de boda en playa', '2023-06-01 13:00:00', 'A', 5);


-- Insertando datos en la tabla venta
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Pendiente', '2023-08-01 15:00:00', 120.00, 6, 1);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Completada', '2023-09-01 16:00:00', 220.00, 6, 2);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Pendiente', '2023-10-01 17:00:00', 320.00, 7, 3);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Completada', '2023-11-01 18:00:00', 420.00, 8, 4);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Pendiente', '2023-12-01 19:00:00', 520.00, 9, 5);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('Completada', '2024-01-01 20:00:00', 620.00, 10, 3);

-- Insertando datos en la tabla entregatrabajo
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('A', '2023-08-02 15:00:00', 2);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('A', '2023-09-02 16:00:00', 3);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('A', '2023-10-02 17:00:00', 4);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('A', '2023-11-02 18:00:00', 5);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('A', '2023-12-02 19:00:00', 6);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('A', '2024-01-02 20:00:00', 8);



-- Insertando datos en la tabla detalleventa
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (2, 1, 1, 5.00, 1);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (3, 2, 2, 10.00, 2);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (4, 3, 3, 15.00, 3);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (5, 4, 4, 20.00, 4);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto) VALUES (6, 5, 5, 25.00, 5);



-- Insertando datos en la tabla conceptoservicio
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Enmarcado', 50.00);
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Edición Digital', 30.00);
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Retoque Fotográfico', 20.00);
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Impresión Rápida', 40.00);
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Transporte', 25.00);


-- Insertando datos en la tabla servicioagregado
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (1, 1, 1);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (2, 2, 2);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (3, 3, 3);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (4, 4, 4);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (5, 5, 5);
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio) VALUES (6, 6, 6);


--=================