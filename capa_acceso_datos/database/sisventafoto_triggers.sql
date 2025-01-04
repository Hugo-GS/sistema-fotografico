DELIMITER //

CREATE TRIGGER trg_antes_de_insertar_persona
BEFORE INSERT ON persona
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM persona 
               WHERE nombre = NEW.nombre 
               AND apellido_paterno = NEW.apellido_paterno 
               AND apellido_materno = NEW.apellido_materno) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta persona ya está registrada.';
    END IF;

    IF EXISTS (SELECT 1 FROM persona 
               WHERE ci = NEW.ci) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El CI ya está registrado.';
    END IF;
END//

CREATE TRIGGER trg_antes_de_actualizar_persona
BEFORE UPDATE ON persona
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM persona 
               WHERE nombre = NEW.nombre 
               AND apellido_paterno = NEW.apellido_paterno 
               AND apellido_materno = NEW.apellido_materno 
               AND id != OLD.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Esta persona ya está registrada.';
    END IF;

    IF EXISTS (SELECT 1 FROM persona 
               WHERE ci = NEW.ci 
               AND id != OLD.id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El CI ya está registrado.';
    END IF;
END//

DELIMITER ;