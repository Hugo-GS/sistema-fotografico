CREATE DATABASE sisventafoto;

USE sisventafoto;

-- db: sisventafoto
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

CREATE TABLE IF NOT EXISTS fotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagen_bin BLOB,
    descripcion VARCHAR(255),
    fecha_hr DATETIME NULL,
    estado CHAR(1),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS sucursal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    direccion VARCHAR(255)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS encargadosucursal (
    id_sucursal INT,
    id_encargado INT,
    estado CHAR(1),
    PRIMARY KEY (id_sucursal, id_encargado),
    FOREIGN KEY (id_sucursal) REFERENCES sucursal (id),
    FOREIGN KEY (id_encargado) REFERENCES encargado (id)
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

CREATE TABLE IF NOT EXISTS impresion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) not null,
    descripciondetalleproducto VARCHAR(255) not null,
    estado char(1) not null
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS precio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hr_inicio datetime not null,
    fecha_hr_fin datetime NULL,
    valor decimal(10, 2) not null,
    id_impresion int not null,
    FOREIGN KEY (id_impresion) REFERENCES impresion (id)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS detalleventa (
    id_venta INT,
    id_impresion INT,
    cantidad INT NOT NULL,
    precio_impresion DECIMAL(10, 2) NOT NULL,
    precio_servicio DECIMAL(10, 2) NOT NULL,
    id_foto INT NOT NULL,
    PRIMARY KEY (id_venta, id_impresion),
    FOREIGN KEY (id_venta) REFERENCES venta (id),
    FOREIGN KEY (id_impresion) REFERENCES impresion (id),
    FOREIGN KEY (id_foto) REFERENCES fotos(id)
) ENGINE = InnoDB;

ALTER TABLE IF NOT EXISTS conceptobonodescuento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    concepto varchar(50) not null,
    tipo char(1),
    valor decimal(10, 2) not null
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

CREATE TABLE IF NOT EXISTS conceptoservicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    concepto varchar(50) not null,
    valor decimal(10, 2) not null
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
