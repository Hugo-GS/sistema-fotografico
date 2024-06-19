
-- Reportes Caso

-- Hugo============================
/*Reporte de Listado de ventas con detalles del cliente y del encargado*/
SELECT v.id, v.estado, v.fecha_hr, v.total_general,
       CONCAT(p_cliente.nombre, ' ', p_cliente.apellido_paterno, ' ', p_cliente.apellido_materno) AS cliente,
       CONCAT(p_encargado.nombre, ' ', p_encargado.apellido_paterno, ' ', p_encargado.apellido_materno) AS encargado
FROM venta v
JOIN cliente c ON v.id_cliente = c.id
JOIN encargado e ON v.id_encargado = e.id
JOIN persona p_cliente ON c.id = p_cliente.id
JOIN persona p_encargado ON e.id = p_encargado.id;

/* Consulta del listado de fotos de un cliente en especifico: */
SELECT 
  f.id, 
  f.descripcion, 
  f.fecha_hr, 
  f.imagen_bin
FROM fotos f
JOIN cliente c ON f.id_cliente = c.id
WHERE c.id = 1;


-- Reporte de descuentos por ventas cliente
SELECT 
    c.id AS id_cliente,
    DATE_FORMAT(v.fecha_hr, '%Y-%m-%d') AS fecha,
    cb.concepto AS nombre_concepto_descuento,
    cb.tipo AS tipo_descuento,
    cb.valor AS valor_descuento,
    CASE 
        WHEN cb.tipo = 'P' THEN (cs.valor * (cb.valor / 100))
        ELSE cb.valor
    END AS monto_descontado
FROM 
    bonodescuento bd
JOIN 
    detalleventa dv ON bd.id_detalleventa_venta = dv.id_venta AND bd.id_detalleventa_impresion = dv.id_impresion
JOIN 
    venta v ON dv.id_venta = v.id
JOIN 
    cliente c ON v.id_cliente = c.id
JOIN 
    conceptobonodescuento cb ON bd.id_conceptodescuento = cb.id
JOIN 
    conceptoservicio cs ON cs.id = 3
WHERE 
    c.id IN (
        SELECT c.id
        FROM cliente c
        JOIN venta v ON c.id = v.id_cliente
        GROUP BY c.id
        HAVING MIN(v.fecha_hr) < DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
    )
GROUP BY 
    c.id, DATE_FORMAT(v.fecha_hr, '%Y-%m-%d'), cb.concepto, cb.tipo, cb.valor, cs.valor
ORDER BY 
    c.id, fecha;


SELECT 
    DATE_FORMAT(v.fecha_hr, '%Y-%m') AS mes_venta,
    cb.concepto AS tipo_servicio,
    COUNT(cb.id) AS cantidad_descuentos_usados,
    SUM(
        CASE 
            WHEN cb.tipo = 'P' THEN (cs.valor * sa.cantidad * (cb.valor / 100))
            ELSE cb.valor * sa.cantidad
        END) AS monto_descontado
FROM 
    venta v
JOIN 
    detalleventa dv ON v.id = dv.id_venta
JOIN 
    servicioagregado sa ON dv.id_venta = sa.id_detalleventa_venta AND dv.id_impresion = sa.id_detalleventa_impresion
JOIN 
    conceptoservicio cs ON sa.id_conceptoservicio = cs.id
JOIN 
    bonodescuento bd ON dv.id_venta = bd.id_detalleventa_venta AND dv.id_impresion = bd.id_detalleventa_impresion
JOIN 
    conceptobonodescuento cb ON bd.id_conceptodescuento = cb.id
GROUP BY 
    mes_venta, cs.concepto
ORDER BY 
    mes_venta;




----
-- Consolidado de servicios adicionales (si se requieren servicios adicionales en el consolidado)
SELECT 
    DATE(v.fecha_hr) AS fecha_venta,
    cs.concepto AS tipo_servicio,
    SUM(sa.cantidad) AS total_cantidad,
    SUM(cs.valor * sa.cantidad) AS total_ventas_servicio
FROM 
    venta v
JOIN 
    detalleventa dv ON v.id = dv.id_venta
JOIN 
    servicioagregado sa ON dv.id_venta = sa.id_detalleventa_venta AND dv.id_impresion = sa.id_detalleventa_impresion
JOIN 
    conceptoservicio cs ON sa.id_conceptoservicio = cs.id
GROUP BY 
    DATE(v.fecha_hr), cs.concepto
ORDER BY 
    fecha_venta, tipo_servicio;


---


SELECT 
    c.id AS id_cliente,
    DATE_FORMAT(v.fecha_hr, '%Y-%m-%d') AS fecha,
    cb.concepto AS nombre_concepto_descuento,
    cb.tipo AS tipo_descuento,
    cb.valor AS valor_descuento,
    CASE 
        WHEN cb.tipo = 'P' THEN (cs.valor * (cb.valor / 100))
        ELSE cb.valor
    END AS monto_descontado
FROM 
    bonodescuento bd
JOIN 
    detalleventa dv ON bd.id_detalleventa_venta = dv.id_venta AND bd.id_detalleventa_impresion = dv.id_impresion
JOIN 
    venta v ON dv.id_venta = v.id
JOIN 
    cliente c ON v.id_cliente = c.id
JOIN 
    conceptobonodescuento cb ON bd.id_conceptodescuento = cb.id
JOIN 
    conceptoservicio cs ON cs.id = 3
GROUP BY 
    c.id, DATE_FORMAT(v.fecha_hr, '%Y-%m-%d'), cb.concepto, cb.tipo, cb.valor, cs.valor
ORDER BY 
    c.id, fecha;


/*                         */

----Realizar conjunto de cossuntas para consolidar una venta venta

-- Inserción en la tabla venta (asegúrate de que id_encargado e id_cliente existan)
INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente)
VALUES ('completado', '2023-05-15 10:30:00', 10.00, 7, 1);

-- Inserción en la tabla detalleventa (asegúrate de que id_foto exista)
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto)
VALUES (10, 2, 1, 10.00, 1); -- Esta tiene descuento
INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio, id_foto)
VALUES (10, 1, 1, 10.00, 1);



-- Clever==========================


SELECT 
    p.nombre AS nombre_encargado, 
    p.apellido_paterno AS apellido_encargado,
    SUM(v.total_general) AS total_vendido
FROM 
    persona p
INNER JOIN 
    encargado e ON p.id = e.id
INNER JOIN 
    venta v ON e.id = v.id_encargado
GROUP BY 
    p.nombre, p.apellido_paterno
ORDER BY 
    total_vendido DESC;
/*    
ORDER BY 
    p.nombre, p.apellido_paterno;*/








----------------Alternativas---------------------------------------------------------------------------------------------

--Consultar detalles de ventas, impresiones, descuentos y servicios adicionales
SELECT v.id AS venta_id, i.nombre AS impresion_nombre, dv.cantidad, dv.precio_impresion, dv.precio_servicio, 
       c.concepto AS descuento_concepto, cs.concepto AS servicio_concepto, sa.cantidad AS servicio_cantidad
FROM detalleventa dv
JOIN venta v ON dv.id_venta = v.id
JOIN impresion i ON dv.id_impresion = i.id
LEFT JOIN bonodescuento bd ON dv.id_venta = bd.id_detalleventa_venta AND dv.id_impresion = bd.id_detalleventa_impresion
LEFT JOIN conceptobonodescuento c ON bd.id_conceptodescuento = c.id
LEFT JOIN servicioagregado sa ON dv.id_venta = sa.id_detalleventa_venta AND dv.id_impresion = sa.id_detalleventa_impresion
LEFT JOIN conceptoservicio cs ON sa.id_conceptoservicio = cs.id;


--Listado sucursales con sus encargados y las ventas realizadas en cada una

SELECT s.nombre AS sucursal, p_e.nombre AS encargado_nombre, COUNT(v.id) AS total_ventas
FROM sucursal s
JOIN encargadosucursal es ON s.id = es.id_sucursal
JOIN encargado e ON es.id_encargado = e.id
JOIN persona p_e ON e.id = p_e.id
JOIN venta v ON e.id = v.id_encargado
GROUP BY s.nombre, p_e.nombre;



--Listar servicios adicionales aplicados a ventas con detalles de impresión y cliente
SELECT v.id AS venta_id, cs.concepto, sa.cantidad, cs.valor, 
       i.nombre AS impresion_nombre, p_c.nombre AS cliente_nombre
FROM servicioagregado sa
JOIN detalleventa dv ON sa.id_detalleventa_venta = dv.id_venta AND sa.id_detalleventa_impresion = dv.id_impresion
JOIN venta v ON dv.id_venta = v.id
JOIN conceptoservicio cs ON sa.id_conceptoservicio = cs.id
JOIN impresion i ON dv.id_impresion = i.id
JOIN cliente cl ON v.id_cliente = cl.id
JOIN persona p_c ON cl.id = p_c.id;









-- Consolidado de ventas diarias por tipo de impresión
SELECT 
    DATE(v.fecha_hr) AS fecha_venta,
    i.nombre AS tipo_servicio,
    SUM(dv.cantidad) AS total_cantidad,
    SUM(dv.precio_impresion * dv.cantidad) AS total_ventas_impresion
FROM 
    venta v
JOIN 
    detalleventa dv ON v.id = dv.id_venta
JOIN 
    impresion i ON dv.id_impresion = i.id
GROUP BY 
    DATE(v.fecha_hr), i.nombre
ORDER BY 
    fecha_venta, tipo_servicio;

-- Consolidado de servicios adicionales (opcional, si se requieren servicios adicionales en el consolidado)




SELECT 
    DATE(v.fecha_hr) AS fecha_venta,
    cs.concepto AS tipo_servicio,
    SUM(sa.cantidad) AS total_cantidad,
    SUM(cs.valor * sa.cantidad) AS total_ventas_servicio
FROM 
    venta v
JOIN 
    detalleventa dv ON v.id = dv.id_venta
JOIN 
    servicioagregado sa ON dv.id_venta = sa.id_detalleventa_venta AND dv.id_impresion = sa.id_detalleventa_impresion
JOIN 
    conceptoservicio cs ON sa.id_conceptoservicio = cs.id
GROUP BY 
    DATE(v.fecha_hr), cs.concepto
ORDER BY 
    fecha_venta, tipo_servicio;
