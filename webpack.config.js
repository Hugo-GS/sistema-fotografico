module.exports = {
  mode: 'development',
  entry: {
    bundle: [
      './capa_presentacion/public/scripts/Hola1.ts',
      './capa_presentacion/public/scripts/manejadorRutas.ts',
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/capa_presentacion/public/js'
  }
};