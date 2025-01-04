import * as mysql from "mysql2/promise";
import * as fs from "fs";
import * as path from "path";

// Interfaces
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
    private dbName: string = 'sisventafoto';
    private sqlFilePath: string;
    private backupPath: string = '/home/user/sistema-fotografico/backups_database';

    constructor() {
        this.config = {
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
        };
        this.sqlFilePath = path.join(__dirname, 'sisventafoto_structure.sql');
        console.log('Ruta del archivo SQL:', this.sqlFilePath);
    }

    private async createConnection(config: ConnectionConfig): Promise<mysql.Connection> {
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
                bigNumberStrings: true
            });
            console.log("Conexión a MySQL establecida correctamente");
        } catch (error) {
            console.error("Error al conectar a MySQL:", error);
            throw error;
        } finally {
            if (connection) await connection.end();
        }
    }

    private async verificarBaseDatos(): Promise<boolean> {
        let connection: mysql.Connection | null = null;
        try {
            connection = await this.createConnection({
                ...this.config,
                multipleStatements: true,
                supportBigNumbers: true,
                bigNumberStrings: true
            });
            const [result]: any[] = await connection.query(
                `SHOW DATABASES LIKE '${this.dbName}'`
            );
            return result.length > 0;
        } catch (error) {
            console.error("Error al verificar la base de datos:", error);
            throw error;
        } finally {
            if (connection) await connection.end();
        }
    }

    private async crearBaseDatos(): Promise<void> {
        let connection: mysql.Connection | null = null;
        try {
            connection = await this.createConnection({
                ...this.config,
                multipleStatements: true,
                supportBigNumbers: true,
                bigNumberStrings: true
            });
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${this.dbName}`);
            console.log(`Base de datos ${this.dbName} creada correctamente`);
        } catch (error) {
            console.error("Error al crear la base de datos:", error);
            throw error;
        } finally {
            if (connection) await connection.end();
        }
    }

    private async leerArchivoSQL(): Promise<string> {
        try {
            if (!fs.existsSync(this.sqlFilePath)) {
                throw new Error(`El archivo SQL no existe en la ruta: ${this.sqlFilePath}`);
            }
            const contenido = fs.readFileSync(this.sqlFilePath, 'utf8');
            console.log('Archivo SQL encontrado y leído correctamente');
            return contenido;
        } catch (error) {
            console.error("Error al leer el archivo SQL:", error);
            throw error;
        }
    }

    private async ejecutarScript(sqlContent: string): Promise<void> {
        let connection: mysql.Connection | null = null;
        try {
            connection = await this.createConnection({
                ...this.config,
                database: this.dbName,
                multipleStatements: true,
                supportBigNumbers: true,
                bigNumberStrings: true
            });

            const statements = this.prepararStatements(sqlContent);

            console.log("Ejecutando script SQL...");
            
            for (const statement of statements) {
                try {
                    if (this.esStatementValido(statement)) {
                        await connection.query(statement);
                        console.log(`Statement ejecutado: ${statement.slice(0, 50)}...`);
                    }
                } catch (error) {
                    console.warn(`Advertencia en statement: ${statement.slice(0, 100)}...`, error);
                }
            }

            await connection.query('SET GLOBAL event_scheduler = ON');

            console.log("Script SQL ejecutado correctamente");
        } catch (error) {
            console.error("Error al ejecutar script SQL:", error);
            throw error;
        } finally {
            if (connection) await connection.end();
        }
    }

    private prepararStatements(sqlContent: string): string[] {
        return sqlContent
            .split(';')
            .map(statement => statement.trim())
            .filter(statement => statement.length > 0);
    }

    private esStatementValido(statement: string): boolean {
        const upperStatement = statement.toUpperCase();
        return !upperStatement.includes('DELIMITER') && 
               !upperStatement.includes('SYSTEM') &&
               statement.length > 0;
    }

    private async crearDirectorioBackups(): Promise<void> {
        try {
            if (!fs.existsSync(this.backupPath)) {
                fs.mkdirSync(this.backupPath, { recursive: true });
                console.log('Directorio de backups creado correctamente');
            }
        } catch (error) {
            console.warn('Advertencia al crear directorio de backups:', error);
        }
    }

    async inicializarBaseDatos(): Promise<void> {
        try {
            console.log('Iniciando proceso de inicialización...');
            
            await this.verificarConexion();
            const existeDB = await this.verificarBaseDatos();
            
            if (!existeDB) {
                console.log(`La base de datos ${this.dbName} no existe. Creando...`);
                await this.crearBaseDatos();
            } else {
                console.log(`La base de datos ${this.dbName} ya existe`);
            }
    
            const sqlContent = await this.leerArchivoSQL();
            await this.ejecutarScript(sqlContent);
    
            const triggersContent = await fs.readFileSync(
                path.join(__dirname, 'sisventafoto_triggers.sql'), 
                'utf8'
            );
            await this.ejecutarScript(triggersContent);
    
            const proceduresContent = await fs.readFileSync(
                path.join(__dirname, 'sisventafoto_procedures.sql'), 
                'utf8'
            );
            await this.ejecutarScript(proceduresContent);
            
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