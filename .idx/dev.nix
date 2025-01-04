{ pkgs, ... }: {
  channel = "stable-23.11";
  services.mysql.enable = true; 
  packages = [
    pkgs.nodejs_20
    pkgs.mysql
    pkgs.sudo
  ];
  env = {};
  idx = {
    extensions = [
      # "vscodevim.vim"
      "esbenp.prettier-vscode"
      "cweijan.vscode-mysql-client2"
    ];
    workspace = {
      onCreate = {
        install = "npm install"; 
      };
      onStart = {
        startDev = "npm run dev -- --port $PORT";
      };
    };
    previews = {
      enable = true;
      previews = {
        default = { 
          command = [ "npm" "run" "dev" "--" "--port" "$PORT" ]; 
          manager = "web"; 
        };
      };
    };
  };
}