
--- Reporte 1: 

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


-- Reporte 2: 

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



----- Consultas
SELECT 
  f.id, 
  f.descripcion, 
  f.fecha_hr, 
  f.imagen_bin
FROM fotos f
JOIN cliente c ON f.id_cliente = c.id
WHERE c.id = 1;

SELECT v.id, v.estado, v.fecha_hr, v.total_general,
       CONCAT(p_cliente.nombre, ' ', p_cliente.apellido_paterno, ' ', p_cliente.apellido_materno) AS cliente,
       CONCAT(p_encargado.nombre, ' ', p_encargado.apellido_paterno, ' ', p_encargado.apellido_materno) AS encargado
FROM venta v
JOIN cliente c ON v.id_cliente = c.id
JOIN encargado e ON v.id_encargado = e.id
JOIN persona p_cliente ON c.id = p_cliente.id
JOIN persona p_encargado ON e.id = p_encargado.id;


