# Webpack Dynamic Public Path Plugin

The purpose of this plugin is to assign to webpack public path a value that isn't known at build time.

It is extremely helpful when you prepare a build for Salesforce Visualforce page because in this case developer don't know path to static resource until it is downloaded to SLDC.

## Usage

Installation is easy with npm:

    npm install webpack-dynamic-public-path-plugin

Then require it in your webpack config and add it to a plugins section:

```javascript

const PUBLIC_PATH = 'XXXYYYZZZ'
output: {
    // 这里只是设置了一个占位符，构建的时候会用 window.publicPath + "/" 替换掉的
    // Set a string placeholder
    publicPath: PUBLIC_PATH,
},
plugins: [
    new DynamicPublicPathPlugin({
        placeholder: PUBLIC_PATH,
        publicPath: 'window.publicPath + "/"',
        outputPath: 'bundle'
    })
]
```

where `publicPath` option stores expression that will evaluate to actual public path in runtime and `outputPath` is a folder where your bundle is saved to.

