-- Active: 1718478180683@@127.0.0.1@3306@sisventafoto


-- Reporte 2: •	Consolidado de descuentos a clientes antiguos por mes.
SELECT 
    DATE_FORMAT(v.fecha_hr, '%Y-%m') AS mes_venta,
    cb.concepto AS tipo_servicio,
    COUNT(cb.id) AS cantidad_descuentos_usados,
    TRUNCATE(SUM(
        CASE 
            WHEN cb.tipo = 'P' THEN (cs.valor * sa.cantidad * (cb.valor / 100))
            ELSE cb.valor * sa.cantidad
        END),2) AS monto_descontado
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



--- Reporte 1: •Consolidado de las ventas diarias por tipo de servicio fotográfico
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
JOIN persona p ON c.id = p.id
WHERE c.id = 1;

-- Lista de ventas a clientes con Encargado
SELECT v.id as id_venta, v.estado, v.fecha_hr, v.total_general,
       CONCAT(p_cliente.nombre, ' ', p_cliente.apellido_paterno, ' ', p_cliente.apellido_materno) AS cliente,
       CONCAT(p_encargado.nombre, ' ', p_encargado.apellido_paterno, ' ', p_encargado.apellido_materno) AS encargado
FROM venta v
JOIN cliente c ON v.id_cliente = c.id
JOIN encargado e ON v.id_encargado = e.id
JOIN persona p_cliente ON c.id = p_cliente.id
JOIN persona p_encargado ON e.id = p_encargado.id;




--la cantidad de ventas por encargado
SELECT s.nombre AS sucursal, p_e.nombre AS encargado_nombre, COUNT(v.id) AS total_ventas
FROM sucursal s
JOIN encargadosucursal es ON s.id = es.id_sucursal
JOIN encargado e ON es.id_encargado = e.id
JOIN persona p_e ON e.id = p_e.id
JOIN venta v ON e.id = v.id_encargado
GROUP BY s.nombre, p_e.nombre
HAVING total_ventas > 5;
