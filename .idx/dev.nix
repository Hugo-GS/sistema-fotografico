{ pkgs, ... }: {
  channel = "stable-24.05";
  services.mysql.enable = true; 
  
  packages = [
    pkgs.nodejs_20
    pkgs.mysql
    pkgs.sudo
    pkgs.nodePackages.typescript
  ];
  
  env = {};
  idx = {
    extensions = [
      "esbenp.prettier-vscode"
      "cweijan.vscode-mysql-client2"
      "dbaeumer.vscode-typescript-tslint-plugin"
    ];
  
    workspace = {
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
      };
      
      onStart = {
        start-dev = "npm run dev -- --port $PORT";
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