DELIMITER //
CREATE TRIGGER trg_before_insert_usuario
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM usuario WHERE nombre_usuario = NEW.nombre_usuario) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este nombre_usuario ya está en uso.';
    END IF;
END //

CREATE TRIGGER trg_before_update_usuario
BEFORE UPDATE ON usuario
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM usuario WHERE nombre_usuario = NEW.nombre_usuario AND id != OLD.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este nombre_usuario ya está en uso.';
    END IF;
END //

DELIMITER ;



DELIMITER //

CREATE TRIGGER trg_before_insert_persona
BEFORE INSERT ON persona
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM persona WHERE nombre = NEW.nombre AND apellido_paterno = NEW.apellido_paterno AND apellido_materno = NEW.apellido_materno) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'esta persona ya está registrada.';
    END IF;
END //

CREATE TRIGGER trg_before_update_persona
BEFORE UPDATE ON persona
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM persona WHERE nombre = NEW.nombre AND apellido_paterno = NEW.apellido_paterno AND apellido_materno = NEW.apellido_materno AND id != OLD.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'esta persona ya está registrada.';
    END IF;
END //

DELIMITER ;



DELIMITER //

CREATE TRIGGER trg_before_insert_sucursal
BEFORE INSERT ON sucursal
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM sucursal WHERE nombre = NEW.nombre AND direccion = NEW.direccion) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta sucursal ya está registrada';
    END IF;
END //

CREATE TRIGGER trg_before_update_sucursal
BEFORE UPDATE ON sucursal
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM sucursal WHERE nombre = NEW.nombre AND direccion = NEW.direccion AND id != OLD.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta sucursal ya está registrada';
    END IF;
END //

DELIMITER ;



DELIMITER //

CREATE TRIGGER trg_before_insert_impresion
BEFORE INSERT ON impresion
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM impresion WHERE nombre = NEW.nombre OR descripciondetalleproducto = NEW.descripciondetalleproducto) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este tipo de impresion ya está registrada.';
    END IF;
END //

CREATE TRIGGER trg_before_update_impresion
BEFORE UPDATE ON impresion
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM impresion WHERE (nombre = NEW.nombre OR descripciondetalleproducto = NEW.descripciondetalleproducto) AND id != OLD.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este tipo de impresion ya está registrada.';
    END IF;
END //

DELIMITER ;



DELIMITER //

CREATE TRIGGER trg_before_insert_conceptoservicio
BEFORE INSERT ON conceptoservicio
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM conceptoservicio WHERE concepto = NEW.concepto) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este conceptoservicio ya existe en la base de datos.';
    END IF;
END //

CREATE TRIGGER trg_before_update_conceptoservicio
BEFORE UPDATE ON conceptoservicio
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM conceptoservicio WHERE concepto = NEW.concepto AND id != OLD.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este conceptoservicio ya existe en la base de datos.';
    END IF;
END //

DELIMITER ;




DELIMITER //

CREATE TRIGGER trg_before_insert_conceptobonodescuento
BEFORE INSERT ON conceptobonodescuento
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM conceptobonodescuento WHERE concepto = NEW.concepto) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este conceptobonodescuento ya existe en la base de datos.';
    END IF;
END //

CREATE TRIGGER trg_before_update_conceptobonodescuento
BEFORE UPDATE ON conceptobonodescuento
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM conceptobonodescuento WHERE concepto = NEW.concepto AND id != OLD.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este conceptobonodescuento ya existe en la base de datos.';
    END IF;
END //

DELIMITER ;
