import * as mysql from "mysql2/promise";
import * as fs from "fs";
import * as path from "path";

interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  port: number;
}

interface ConnectionConfig extends DatabaseConfig {
  database?: string;
  multipleStatements: boolean;
  supportBigNumbers: boolean;
  bigNumberStrings: boolean;
}

class DatabaseInit {
  private config: DatabaseConfig;
  private dbName: string = "sisventafoto";
  private sqlFilePath: string;

  constructor() {
    this.config = {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
    };
    this.sqlFilePath = path.join(__dirname, "sisventafoto_structure.sql");
    console.log("Ruta del archivo SQL:", this.sqlFilePath);
  }

  private async createConnection(
    config: ConnectionConfig
  ): Promise<mysql.Connection> {
    try {
      return await mysql.createConnection(config);
    } catch (error) {
      console.error("Error creating connection:", error);
      throw error;
    }
  }

  private async verificarConexion(): Promise<void> {
    let connection: mysql.Connection | null = null;
    try {
      connection = await this.createConnection({
        ...this.config,
        multipleStatements: true,
        supportBigNumbers: true,
        bigNumberStrings: true,
      });
      console.log("Conexión a MySQL establecida correctamente");
    } catch (error) {
      console.error("Error al conectar a MySQL:", error);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  private async ejecutarArchivo(filePath: string): Promise<void> {
    try {
      if (!fs.existsSync(filePath)) {
        console.warn(`El archivo ${filePath} no existe, saltando...`);
        return;
      }

      const sqlContent = fs.readFileSync(filePath, "utf8");
      let connection: mysql.Connection | null = null;

      try {
        connection = await this.createConnection({
          ...this.config,
          database: this.dbName,
          multipleStatements: true,
          supportBigNumbers: true,
          bigNumberStrings: true,
        });

        console.log(`Ejecutando archivo: ${path.basename(filePath)}`);
        await connection.query(sqlContent);
        console.log(
          `Archivo ${path.basename(filePath)} ejecutado correctamente`
        );
      } finally {
        if (connection) await connection.end();
      }
    } catch (error) {
      console.error(`Error ejecutando archivo ${filePath}:`, error);
      throw error;
    }
  }

  private async verificarProcedimiento(
    nombreProcedimiento: string
  ): Promise<boolean> {
    let connection: mysql.Connection | null = null;
    try {
      connection = await this.createConnection({
        ...this.config,
        database: this.dbName,
        multipleStatements: true,
        supportBigNumbers: true,
        bigNumberStrings: true,
      });

      const [rows]: any = await connection.query(
        `
                SELECT COUNT(*) as count 
                FROM information_schema.routines 
                WHERE routine_schema = ? 
                AND routine_name = ?
                AND routine_type = 'PROCEDURE'
            `,
        [this.dbName, nombreProcedimiento]
      );

      return rows[0].count > 0;
    } catch (error) {
      console.error(
        `Error verificando procedimiento ${nombreProcedimiento}:`,
        error
      );
      return false;
    } finally {
      if (connection) await connection.end();
    }
  }

  private async ejecutarProcedimientos(): Promise<void> {
    let connection: mysql.Connection | null = null;
    try {
      connection = await this.createConnection({
        ...this.config,
        database: this.dbName,
        multipleStatements: true,
        supportBigNumbers: true,
        bigNumberStrings: true,
      });

      // Lista de procedimientos a verificar
      const procedimientos = [
        "ObtenerVentasPorAño",
        "ObtenerVentasPorMes",
        "ObtenerVentasPorRangoAños",
        "ObtenerVentasPorRangoMeses",
      ];

      // Verificar cada procedimiento
      for (const proc of procedimientos) {
        const exists = await this.verificarProcedimiento(proc);
        if (!exists) {
          console.log(`El procedimiento ${proc} no existe. Creando...`);
        } else {
          console.log(`El procedimiento ${proc} ya existe. Actualizando...`);
          // Eliminar el procedimiento existente
          await connection.query(`DROP PROCEDURE IF EXISTS ${proc}`);
        }
      }

      // Cambiar configuración para permitir crear procedures
      await connection.query("SET GLOBAL log_bin_trust_function_creators = 1;");

      const proceduresPath = path.join(
        __dirname,
        "sisventafoto_procedures.sql"
      );
      if (!fs.existsSync(proceduresPath)) {
        throw new Error(
          `Archivo de procedimientos no encontrado en: ${proceduresPath}`
        );
      }

      const sqlContent = fs.readFileSync(proceduresPath, "utf8");

      console.log("Ejecutando procedimientos almacenados...");
      await connection.query(sqlContent);
      console.log("Procedimientos almacenados ejecutados correctamente");
    } catch (error) {
      console.error("Error al ejecutar procedimientos:", error);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  private async ejecutarEstructuraInicial(): Promise<void> {
    let connection: mysql.Connection | null = null;
    try {
      connection = await this.createConnection({
        ...this.config,
        multipleStatements: true,
        supportBigNumbers: true,
        bigNumberStrings: true,
      });

      const sqlContent = fs.readFileSync(this.sqlFilePath, "utf8");
      console.log("Ejecutando estructura inicial...");
      await connection.query(sqlContent);
      console.log("Estructura inicial ejecutada correctamente");
    } catch (error) {
      console.error("Error al ejecutar estructura inicial:", error);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  }

  private async habilitarEventScheduler(): Promise<void> {
    let connection: mysql.Connection | null = null;
    try {
      connection = await this.createConnection({
        ...this.config,
        database: this.dbName,
        multipleStatements: true,
        supportBigNumbers: true,
        bigNumberStrings: true,
      });
      await connection.query("SET GLOBAL event_scheduler = ON");
      console.log("Event Scheduler habilitado");
    } catch (error) {
      console.warn("No se pudo habilitar el Event Scheduler:", error);
    } finally {
      if (connection) await connection.end();
    }
  }

  async inicializarBaseDatos(): Promise<void> {
    try {
      console.log("Iniciando proceso de inicialización...");

      await this.verificarConexion();

      await this.ejecutarEstructuraInicial();

      await this.ejecutarProcedimientos();

      await this.habilitarEventScheduler();

      console.log("Proceso de inicialización completado correctamente");
    } catch (error) {
      console.error("Error en el proceso de inicialización:", error);
      throw error;
    }
  }
}

async function main() {
  const dbInit = new DatabaseInit();

  try {
    await dbInit.inicializarBaseDatos();
    console.log("Inicialización completada exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("Error en el proceso de inicialización:", error);
    process.exit(1);
  }
}

main();
