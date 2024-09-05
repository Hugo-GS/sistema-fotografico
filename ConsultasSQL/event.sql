DROP PROCEDURE IF EXISTS BackupDatabase;


/* Crear el procedimiento que realice la accion de backup Completo*/
DELIMITER //

CREATE PROCEDURE BackupDatabase()
BEGIN
    DECLARE backup_file VARCHAR(255);
    DECLARE backup_dir VARCHAR(255) DEFAULT '/home/user/sistema-fotografico/backups_database';
    DECLARE db_name VARCHAR(255) DEFAULT 'sisventafoto';
    DECLARE user_name VARCHAR(255) DEFAULT 'root';
    DECLARE user_pass VARCHAR(255) DEFAULT '';
    DECLARE cmd VARCHAR(1000);
    
    -- Crear el nombre del archivo de backup con la fecha y hora actuales
    SET backup_file = CONCAT(backup_dir, '/backup_', db_name, '_', DATE_FORMAT(NOW(), '%Y%m%d_%H%i%s'), '.sql.gz');
    
    -- Crear el comando para realizar el backup y comprimirlo
    SET cmd = CONCAT('mysqldump -h localhost -u ', user_name, ' ', IF(user_pass != '', CONCAT('-p', user_pass, ' '), ''), db_name, ' | gzip > ', backup_file);
    
    -- Ejecutar el comando del sistema
    CALL sys_exec(cmd);
END //

DELIMITER ;


/*Creamos un evento el caul realice la accion del backup Para que se realice a las 3 30 PM*/
CREATE EVENT IF NOT EXISTS BackupDatabaseEvent
ON SCHEDULE EVERY 1 DAY
STARTS '2024-06-29 15:30:00'
DO
CALL BackupDatabase();
