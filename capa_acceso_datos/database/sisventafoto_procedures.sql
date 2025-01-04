CREATE PROCEDURE ObtenerVentasPorAño(
    IN año_inicio INT
)
BEGIN
    SELECT YEAR(fecha_hr) AS año,
           SUM(total_general) AS total_ventas
    FROM venta
    WHERE YEAR(fecha_hr) = año_inicio
    GROUP BY año
    ORDER BY año;
END;

CREATE PROCEDURE ObtenerVentasPorMes(
    IN mes_inicio INT,
    IN año_inicio INT
)
BEGIN
    SELECT MONTH(fecha_hr) AS mes,
           YEAR(fecha_hr) AS año,
           SUM(total_general) AS total_ventas
    FROM venta
    WHERE MONTH(fecha_hr) = mes_inicio
        AND YEAR(fecha_hr) = año_inicio
    GROUP BY mes, año
    ORDER BY año, mes;
END;

CREATE PROCEDURE ObtenerVentasPorRangoAños(
    IN año_inicio INT,
    IN año_fin INT
)
BEGIN
    SELECT YEAR(fecha_hr) AS año,
           SUM(total_general) AS total_ventas
    FROM venta
    WHERE YEAR(fecha_hr) BETWEEN año_inicio AND año_fin
    GROUP BY año
    ORDER BY año;
END;

CREATE PROCEDURE ObtenerVentasPorRangoMeses(
    IN mes_inicio INT,
    IN mes_fin INT,
    IN año_inicio INT
)
BEGIN
    SELECT MONTH(fecha_hr) AS mes,
           YEAR(fecha_hr) AS año,
           SUM(total_general) AS total_ventas
    FROM venta
    WHERE MONTH(fecha_hr) BETWEEN mes_inicio AND mes_fin
      AND YEAR(fecha_hr) = año_inicio
    GROUP BY mes, año
    ORDER BY año, mes;
END;