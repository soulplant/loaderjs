System.config({
    paths: {
        'systemjs': 'node_modules/systemjs/dist/system.js'
    },

    // This means we don't have to add .js extensions to our imports.
    // Note: The supposed right way to do this is with a 'packages' clause [1],
    // but that seems much more complex.
    // https://github.com/systemjs/systemjs/blob/master/docs/config-api.md#packages
    defaultJSExtensions: true
});