DROP DATABASE IF EXISTS sisventafoto;
CREATE DATABASE sisventafoto;
USE sisventafoto;

-- Tablas base (sin foreign keys)
CREATE TABLE IF NOT EXISTS persona (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido_paterno VARCHAR(50),
    apellido_materno VARCHAR(50),
    ci VARCHAR(13)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tipousuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo CHAR(1)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS sucursal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    direccion VARCHAR(255)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS impresion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) not null,
    descripciondetalleproducto VARCHAR(255) not null,
    estado char(1) not null
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS conceptobonodescuento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    concepto varchar(50) not null,
    tipo char(1),
    valor decimal(10, 2) not null
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS conceptoservicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    concepto varchar(50) not null,
    valor decimal(10, 2) not null
) ENGINE = InnoDB;

-- Tablas con una foreign key
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(16),
    contrasena BLOB,
    id_persona INT,
    id_tipousuario INT,
    FOREIGN KEY (id_tipousuario) REFERENCES tipousuario (id),
    FOREIGN KEY (id_persona) REFERENCES persona (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS cliente (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES persona (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS encargado (
    id INT PRIMARY KEY,
    telefono VARCHAR(15),
    FOREIGN KEY (id) REFERENCES persona (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS precio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hr_inicio datetime not null,
    fecha_hr_fin datetime NULL,
    valor decimal(10, 2) not null,
    id_impresion int not null,
    FOREIGN KEY (id_impresion) REFERENCES impresion (id)
) ENGINE = InnoDB;

-- Tablas con múltiples foreign keys
CREATE TABLE IF NOT EXISTS encargadosucursal (
    id_sucursal INT,
    id_encargado INT,
    estado CHAR(1),
    PRIMARY KEY (id_sucursal, id_encargado),
    FOREIGN KEY (id_sucursal) REFERENCES sucursal (id),
    FOREIGN KEY (id_encargado) REFERENCES encargado (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS fotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagen_bin LONGBLOB,
    descripcion VARCHAR(255),
    fecha_hr DATETIME NULL,
    estado CHAR(1),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS venta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado CHAR(1) NOT NULL,
    fecha_hr DATETIME,
    total_general DECIMAL(10, 2) NOT NULL,
    id_encargado int not null,
    id_cliente int not null,
    FOREIGN KEY (id_encargado) REFERENCES encargado (id),
    FOREIGN KEY (id_cliente) REFERENCES cliente (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS entregatrabajo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado CHAR(1) NOT NULL,
    fecha_entrega DATETIME,
    id_venta INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS detalleventa (
    id_venta INT,
    id_impresion INT,
    cantidad INT NOT NULL,
    precio_impresion DECIMAL(10, 2) NOT NULL,
    precio_servicio DECIMAL(10, 2) NOT NULL,
    id_foto INT NOT NULL,
    PRIMARY KEY (id_venta, id_impresion, id_foto),
    FOREIGN KEY (id_venta) REFERENCES venta (id),
    FOREIGN KEY (id_impresion) REFERENCES impresion (id),
    FOREIGN KEY (id_foto) REFERENCES fotos(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS bonodescuento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_detalleventa_venta INT NOT NULL,
    id_detalleventa_impresion INT NOT NULL,
    id_conceptodescuento INT NOT NULL,
    FOREIGN KEY(id_detalleventa_impresion) REFERENCES detalleventa(id_impresion),
    FOREIGN KEY(id_detalleventa_venta) REFERENCES detalleventa(id_venta),
    FOREIGN KEY (id_conceptodescuento) REFERENCES conceptobonodescuento(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS servicioagregado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_detalleventa_venta INT NOT NULL,
    id_detalleventa_impresion INT NOT NULL,
    id_conceptoservicio int not null,
    cantidad INT,
    FOREIGN KEY(id_detalleventa_impresion) REFERENCES detalleventa(id_impresion),
    FOREIGN KEY(id_detalleventa_venta) REFERENCES detalleventa(id_venta),
    FOREIGN KEY (id_conceptoservicio) REFERENCES conceptoservicio (id)
) ENGINE = InnoDB;

-- Inserciones iniciales
INSERT INTO tipousuario (tipo) VALUES ('A');
INSERT INTO tipousuario (tipo) VALUES ('E');

-- Insertar en la tabla `sucursal`
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal A', 'Calle 123, Av. A');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal B', 'Calle 456, Av. B');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal C', 'Calle 789, Av. C');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal D', 'Calle 101, Av. D');
INSERT INTO sucursal (nombre, direccion) VALUES ('Sucursal E', 'Calle 102, Av. F');

-- Insertar en la tabla `impresion`
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión E', 'Hoja pequeña 9x13 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión D', 'Hoja pequeña 11x17 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión C', 'Hoja mediana 13x20 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión B', 'Hoja grande 18x26 cm', 'A');
INSERT INTO impresion (nombre, descripciondetalleproducto, estado) VALUES ('Impresión A', 'Hoja grande 20x27 cm', 'A');

-- Insertar en la tabla `conceptobonodescuento`
INSERT INTO conceptobonodescuento (concepto, tipo, valor) VALUES ('Descuento Antiguedad Marqueteria', 'P', 10.00);

-- Insertar en la tabla `conceptoservicio`
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Enmarcado', 10.00);
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Retoque Fotográfico', 20.00);
INSERT INTO conceptoservicio (concepto, valor) VALUES ('Marqueteria', 50.00);

-- Persona - encargado y admin
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Encargado', '', '');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno) VALUES ('Administrador', '', '');

-- Personas - clientes
INSERT INTO persona (nombre, apellido_paterno, apellido_materno, ci) VALUES ('Juan', 'Pérez', 'Gómez', '111');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci) VALUES ('María', 'López', 'Fernández', '112');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci) VALUES ('Carlos', 'García', 'Martínez', '113');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci) VALUES ('Ana', 'Rodríguez', 'Sánchez', '114');
INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci) VALUES ('Luis', 'Hernández', 'Ruiz', '115');

-- Insertar usuarios
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('admin', 'admin', 2, 1);
INSERT INTO usuario (nombre_usuario, contrasena, id_persona, id_tipousuario) VALUES ('encargado', 'encargado', 1, 2);

-- Asignar roles
INSERT INTO encargado (id, telefono) VALUES (1, '123456789');
INSERT INTO cliente (id) VALUES (3);
INSERT INTO cliente (id) VALUES (4);
INSERT INTO cliente (id) VALUES (5);
INSERT INTO cliente (id) VALUES (6);
INSERT INTO cliente (id) VALUES (7);