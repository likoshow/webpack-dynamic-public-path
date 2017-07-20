const fs = require('fs');

function DynamicPublicPathPlugin(options) {
  this.publicPath = options.publicPath;
  this.placeholder = options.placeholder;
  this.outputPath = options.outputPath;
}

DynamicPublicPathPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', params => {
    
    Object.keys(params.compilation.assets)
      .filter(name => name.includes('.js') && !name.includes('.js.map'))
      .forEach(name => {
        fs.readFile(`${this.outputPath}/${name}`, (err, data) => {
          if (err) throw err;
          const newBundle = data
            .toString()
            .replace(new RegExp(`[\"\']${this.placeholder}[\"\']`), `${this.publicPath}`);

          fs.writeFile(`${this.outputPath}/${name}`, newBundle, err => {
            if (err) throw err
          });
        });
      });
  });
};

module.exports = DynamicPublicPathPlugin;
