{ pkgs, ... }: {
  channel = "stable-24.05";

  services.mysql = {
    enable = true;
    package = pkgs.mysql;
  };

  packages = [
    pkgs.nodejs_20
    pkgs.mysql
    pkgs.sudo
    pkgs.nodePackages.typescript
  ];

  env = {
    DB_HOST = "localhost";
    DB_USER = "root";
    DB_PASSWORD = "";
  };

  idx = {
    extensions = [
      "esbenp.prettier-vscode"
      "cweijan.vscode-mysql-client2"
      "dbaeumer.vscode-typescript-tslint-plugin"
      "cweijan.dbclient-jdbc"
      "cweijan.vscode-database-client2"
    ];

    workspace = {
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
        init-db = "ts-node capa_acceso_datos/database/DatabaseInit.ts";
      };

      onStart = {
        start-dev = "npm run dev -- --port $PORT";
        init-db = "ts-node capa_acceso_datos/database/DatabaseInit.ts";
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
  };
}