// updateTsconfig.js
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo tsconfig.json
const tsconfigPath = path.join(__dirname, 'tsconfig.json');

// Ler o arquivo tsconfig.json
fs.readFile(tsconfigPath, 'utf8', function(err, data) {
  if (err) {
    console.error(`Erro ao ler o arquivo tsconfig.json: ${err}`);
    return;
  }

  // Parse do conteúdo do arquivo para um objeto JavaScript
  let tsconfig = JSON.parse(data);

  // Adicionar ou modificar a propriedade "paths"
  tsconfig.compilerOptions.paths = {
    "@clerk/*": ["node_modules/@clerk/nextjs/server/*"]
  };

  // Converter o objeto JavaScript de volta para uma string JSON
  let updatedTsconfig = JSON.stringify(tsconfig, null, 2);

  // Escrever a string JSON de volta para o arquivo tsconfig.json
  fs.writeFile(tsconfigPath, updatedTsconfig, 'utf8', function(err) {
    if (err) {
      console.error(`Erro ao escrever no arquivo tsconfig.json: ${err}`);
    } else {
      console.log('tsconfig.json atualizado com sucesso.');
    }
  });
});
