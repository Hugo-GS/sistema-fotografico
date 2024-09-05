-- Active: 1718896990540@@127.0.0.1@3306@sisventafoto
-- Seccion Hugo====
-- Insertar en la tabla `tipousuario`
INSERT INTO tipousuario (tipo) VALUES ('A');
INSERT INTO tipousuario (tipo) VALUES ('E');

-- Personas - clientes
INSERT INTO persona (nombre, apellido_paterno, apellido_materno, ci) VALUES ('Juan', 'Pérez', 'Gómez', '111');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci) VALUES ('María', 'López', 'Fernández', '112');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci) VALUES ('Carlos', 'García', 'Martínez', '113');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci) VALUES ('Ana', 'Rodríguez', 'Sánchez', '114');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci) VALUES ('Luis', 'Hernández', 'Ruiz', '115');

-- Personas -- Encargados
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Pedro', 'González', 'López');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Sofía', 'Martínez', 'Díaz');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Diego', 'Hernández', 'Castro');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Laura', 'Fernández', 'Méndez');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Jorge', 'Ramírez', 'Pérez');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Camila', 'Rodríguez', 'García');

-- Insertando datos en la tabla encargado
INSERT INTO encargado (id, telefono) VALUES (6, '1111111111');
INSERT INTO encargado (id, telefono) VALUES (7, '3333333333');
INSERT INTO encargado (id, telefono) VALUES (8, '5555555555');
INSERT INTO encargado (id, telefono) VALUES (9, '2222222222');
INSERT INTO encargado (id, telefono) VALUES (10, '4444444444');
INSERT INTO encargado (id, telefono) VALUES (11, '6666666666');

-- Usuarios para Encargados
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('pedrog', 'clave123', 6, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('sofam', 'clave456', 7, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('diegh', 'clave789', 8, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('laurf', 'clave101', 9, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('jorger', 'clave112', 10, 2);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('camilr', 'clave113', 11, 2);


-- Insertar en la tabla `cliente`
INSERT INTO cliente (id) VALUES (1);
INSERT INTO cliente (id) VALUES (2);
INSERT INTO cliente (id) VALUES (3);
INSERT INTO cliente (id) VALUES (4);
INSERT INTO cliente (id) VALUES (5);

-- Insertar en la tabla `fotos`
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de la playa', '2020-01-01 10:00:00', 'A', 1);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del bosque', '2020-01-03 12:00:00', 'C', 1);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del desierto', '2020-01-05 14:00:00', 'B', 1);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del río', '2020-01-04 13:00:00', 'A', 2);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de la montaña', '2020-01-02 11:00:00', 'B', 2);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del desierto', '2020-01-04 13:00:00', 'A', 2);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del bosque', '2020-01-03 12:00:00', 'C', 3);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del río', '2020-01-03 12:00:00', 'C', 3);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del desierto', '2020-01-05 14:00:00', 'B', 3);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del río', '2023-01-04 13:00:00', 'A', 4);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de la montaña', '2023-01-02 11:00:00', 'B', 4);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de la playa', '2023-01-01 10:00:00', 'A', 4);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto del desierto', '2024-01-05 14:00:00', 'B', 5);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de la playa', '2024-01-01 10:00:00', 'A', 5);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de la montaña', '2024-01-02 11:00:00', 'B', 5);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de paisaje montañoso', '2023-02-01 09:00:00', 'A', 1);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de retrato familiar', '2023-03-01 10:00:00', 'A', 2);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de evento corporativo', '2023-04-01 11:00:00', 'A', 3);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de producto artesanal', '2023-05-01 12:00:00', 'A', 4);
INSERT INTO fotos (imagen_bin, descripcion, fecha_hr, estado, id_cliente) VALUES (NULL, 'Foto de boda en playa', '2023-06-01 13:00:00', 'A', 5);


-- Insertar en la tabla `sucursal`
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal A', 'Calle 123, Av. A');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal B', 'Calle 456, Av. B');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal C', 'Calle 789, Av. C');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal D', 'Calle 101, Av. D');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal E', 'Calle 102, Av. F');

-- Insertando datos en la tabla encargadosucursal
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (1, 6, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (1, 7, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (1, 8, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (2, 9, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (2, 10, 'A');
INSERT INTO encargadosucursal (id_sucursal, id_encargado, estado) VALUES (3, 11, 'A');

-- Insertar en la tabla `impresion`
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión E', 'Hoja pequeña 9x13 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión D', 'Hoja pequeña 11x17 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión C', 'Hoja mediana 13x20 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión B', 'Hoja grande 18x26 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión A', 'Hoja grande 20x27 cm', 'A');

-- Insertar en la tabla `precio`
INSERT INTO precio (fecha_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2019-04-01 00:00:00', NULL, 10.00, 1);
INSERT INTO precio (fecha_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2019-04-01 00:00:00', NULL, 20.00, 2);
INSERT INTO precio (fecha_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2019-04-01 00:00:00', NULL, 30.00, 3);
INSERT INTO precio (fecha_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2019-04-01 00:00:00', NULL, 50.00, 4);
INSERT INTO precio (fecha_hr_inicio, fecha_hr_fin, valor, id_impresion) VALUES ('2019-04-01 00:00:00', NULL, 60.00, 5);

-- Insertar en la tabla `conceptobonodescuento`
INSERT INTO conceptobonodescuento (concepto, tipo, valor) VALUES ('Descuento Antiguedad Marqueteria', 'P', 10.00);-- P Porcentual


-- Insertar en la tabla `conceptoservicio`
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Enmarcado', 10.00);
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Retoque Fotográfico', 20.00);
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Marqueteria', 50.00);


-- Insertar en la tabla `venta`
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('C', '2020-02-05 19:00:00', 10.00, 6, 1);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('C', '2020-02-01 15:00:00', 40.00, 7, 2);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('C', '2020-02-04 18:00:00', 90.00, 10, 3);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('C', '2023-02-02 16:00:00', 200.00, 8, 4);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('C', '2024-02-03 17:00:00', 300.00, 9, 5);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('C', '2024-02-05 19:00:00', 180.00, 6, 1);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('C', '2024-02-01 15:00:00', 245.00, 7, 2);
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES ('C', '2024-02-02 16:00:00', 300.00, 8, 4);

--

-- Insertar en la tabla `entregatrabajo`
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2020-03-01 10:00:00', 1);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2020-03-02 11:00:00', 2);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2020-03-03 12:00:00', 3);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2023-03-04 13:00:00', 4);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2024-03-05 14:00:00', 5);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2024-03-01 10:00:00', 1);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2024-03-01 10:00:00', 2);
INSERT INTO entregatrabajo (estado, fecha_entrega, id_venta) VALUES ('C', '2024-03-01 10:00:00', 4);
--

-- Insertar en la tabla `detalleventa`
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (1, 1, 1, 10.00, 0.00, 1);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (2, 2, 2, 20.00, 0.00, 2);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (3, 3, 3, 30.00, 0.00, 2);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (4, 4, 4, 50.00, 0.00, 4);
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (5, 5, 5, 60.00, 0.00, 1);--
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (6, 3, 3, 30.00, 90.00, 2);-- Cliente 1 
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (7, 4, 4, 50.00, 45.00, 4);-- Cliente 2
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (8, 5, 5, 60.00, 0.00, 1);-- Cliente 4

---+-------------------------------------------------+
---| (cantidad * precio_impresion) + precio_servicio |
---+-------------------------------------------------+
---| 50*2         100   100 - (100*0.10)  90         |
---+-------------------------------------------------+


-- Insertar en la tabla `bonodescuento`
INSERT INTO bonodescuento (id_detalleventa_venta, id_detalleventa_impresion, id_conceptodescuento) VALUES (6, 3, 1);
INSERT INTO bonodescuento (id_detalleventa_venta, id_detalleventa_impresion, id_conceptodescuento) VALUES (7, 4, 1);


-- Insertar en la tabla `servicioagregado`
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio, cantidad) VALUES (6, 3, 3, 2); 
INSERT INTO servicioagregado (id_detalleventa_venta, id_detalleventa_impresion, id_conceptoservicio, cantidad) VALUES (7, 4, 3, 1);



---+-----------------------------------------------+
---| 50   50-(50*0.10) 45    45*2         90       |
---| 50*2         100   100 - (100*0.10)  90       |
---+-----------------------------------------------+
---+-----------------------------------------------+
---| 50   50-(50*0.10) 45    45*1         45       |
---| 50*1         50   50  - (50*0.10)    45       |
---+-----------------------------------------------+