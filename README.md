# Sistema de Gestión Fotográfica

<a href="https://idx.google.com/import?url=https%3A%2F%2Fgithub.com%2FHugo-GS%2Fsistema-fotografico">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://cdn.idx.dev/btn/open_dark_32.svg">
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://cdn.idx.dev/btn/open_light_32.svg">
    <img
      height="32"
      alt="Open in IDX"
      src="https://cdn.idx.dev/btn/open_purple_32.svg">
  </picture>
</a>

## Descripción
Sistema web de gestión para estudios fotográficos que permite administrar clientes, fotografías, servicios y pedidos de impresión. Diseñado para optimizar el flujo de trabajo de estudios fotográficos profesionales.

### Características Principales
- Gestión de clientes y sus sesiones fotográficas
- Administración de servicios fotográficos
- Control de pedidos de impresión
- Gestión de catálogo de fotografías
- Panel administrativo intuitivo

## Tecnologías
- Node.js
- Express.js
- TypeScript
- EJS (Template Engine)
- MySQL
- Webpack
- Express Session

## Requisitos Previos
- Node.js (v20 o superior)
- MySQL (v8.0 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Hugo-GS/sistema-fotografico.git
cd sistema-fotografico
```

2. Instala las dependencias:
```bash
npm ci
```

3. Configura la base de datos:
```bash
npm run db:init
```

## Credenciales de Prueba

Para acceder al sistema, puedes utilizar las siguientes credenciales de prueba:

### Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin`

### Encargado
- **Usuario:** `encargado`
- **Contraseña:** `encargado`

> **Nota:** Estas credenciales son únicamente para propósitos de prueba y desarrollo. En un ambiente de producción, asegúrate de cambiar estas credenciales y seguir las mejores prácticas de seguridad.

## Uso

### Desarrollo
Para ejecutar en modo desarrollo con recarga automática:
```bash
npm run dev
```

### Producción
Para construir y ejecutar en producción:
```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Estructura del Proyecto
```
sistema-fotografico/
├── .idx/                          # Configuración de Google IDX
├── backups_database/              # Respaldos de la base de datos
│   └── backup_sistventafoto_[fecha].sql
├── capa_acceso_datos/            # Capa de acceso a datos
│   ├── Cliente.ts
│   ├── configuracion_global.ts
│   ├── Foto.ts
│   ├── Impresion.ts
│   ├── Persona.ts
│   ├── Precio.ts
│   ├── Servicio.ts
│   └── Usuario.ts
├── capa_logica_negocio/         # Capa de lógica de negocio
│   ├── GestorCliente.ts
│   ├── GestorFotos.ts
│   ├── GestorImpresion.ts
│   ├── GestorPersona.ts
│   └── GestorServicio.ts
├── capa_presentacion/           # Capa de presentación
│   ├── public/                  # Archivos estáticos
│   ├── rutasAPI/               # Rutas de la API
│   │   ├── rutasAPIAdministrador.ts
│   │   └── rutasAPIEncargado.ts
│   ├── rutasWeb/               # Rutas web
│   │   ├── rutasWebAdministrador.ts
│   │   └── rutasWebEncargado.ts
│   └── views/                  # Vistas EJS
│       ├── vista_encargado/
│       ├── vistas_admin/
│       └── vistas_general/
├── configuracionesExpress.ts   # Configuración de Express
├── index.ts                    # Punto de entrada
└── package.json               # Dependencias y scripts
```

## Scripts Disponibles
- `npm run dev` - Inicia el servidor en modo desarrollo con hot-reload
- `npm start` - Inicia el servidor en modo producción
- `npm run build` - Construye el proyecto para producción

## Licencia
ISC - Ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto
Link del proyecto: [https://github.com/Hugo-GS/sistema-fotografico](https://github.com/Hugo-GS/sistema-fotografico)

## Despliegue y Desarrollo con Google IDX

> 💡 **¿Qué es IDX?**  
> IDX es un entorno de desarrollo basado en la nube que te permite comenzar a codificar instantáneamente sin configuración local.
