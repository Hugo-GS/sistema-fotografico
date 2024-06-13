CREATE DATABASE IF NOT EXISTS sisventafoto;
USE sisventafoto;

CREATE TABLE IF NOT EXISTS persona (
    id AUTO_INCREMENT INT PRIMARY KEY,
    nombre VARCHAR(12),
    apellido_paterno VARCHAR(12),
    apellido_materno VARCHAR(12)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(12),
    contrasena VARCHAR(255),
    id_persona INT,
    id_tipousuario INT,
    FOREIGN KEY (id_tipousuario) REFERENCES tipousuario (id),
    FOREIGN KEY (id_persona) REFERENCES persona (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tipousuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(12)
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
    nombre VARCHAR(12),
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

CREATE TABLE venta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL,
    fecha_hr DATETIME,
    total_general DECIMAL(10, 2) NOT NULL id_encargado int not null,
    id_cliente int not null,
    FOREIGN KEY (id_encargado) REFERENCES encargado (id),
    FOREIGN KEY (id_cliente) REFERENCES cliente (id)
) ENGINE = InnoDB;

CREATE TABLE entregatrabajo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado CHAR(1) NOT NULL,
    fecha_entrega DATETIME,
    id_venta INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta (id)
) ENGINE = InnoDB;

CREATE TABLE impresion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(25) not null,
    descripciondetalleproducto varchar(50) not null,
    estado char(1) not null
) ENGINE = InnoDB;

CREATE TABLE precio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fech_hr_inicio datetime not null,
    fecha_hr_fin datetime not null,
    valor decimal(10, 2) not null,
    id_impresion int not null,
    FOREIGN KEY (id_impresion) REFERENCES impresion (id)
) ENGINE = InnoDB;

CREATE TABLE detalleventa (
    id_venta INT,
    id_impresion INT,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    id_foto INT NOT NULL,
    PRIMARY KEY (id_venta, id_impresion),
    FOREIGN KEY (id_venta) REFERENCES venta (id),
    FOREIGN KEY (id_impresion) REFERENCES impresion (id),
    FOREIGN KEY (id_foto) REFERENCES foto (id)
) ENGINE = InnoDB;

CREATE TABLE conceptobonodescuento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    concepto varchar(50) not null,
    valor decimal(10, 2) not null
) ENGINE = InnoDB;

CREATE TABLE bonodescuento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_detalleventa int not null,
    id_conceptodescuento not null,
    FOREIGN KEY (id_detalleventa) REFERENCES detalleventa (id),
    FOREIGN KEY (id_conceptodescuento) REFERENCES conceptobonodescuento (id)
) ENGINE = InnoDB;

CREATE TABLE conceptoservicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    concepto varchar(50) not null,
    valor decimal(10, 2) not null
) ENGINE = InnoDB;

CREATE TABLE servicioagregado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_detalleventa int not null,
    id_conceptoservicio int not null,
    FOREIGN KEY (id_detalleventa) REFERENCES detalleventa (id) FOREIGN KEY (id_conceptoservicio) REFERENCES conceptoservicio (id)
) ENGINE = InnoDB;