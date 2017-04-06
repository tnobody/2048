const  webpack = require('webpack')

const baseConfig = {
// Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"}
        ]
    }
}
const mergeArray = function(a1,a2) {
    return [...a1, ...a2]
}
const merge = function(base, extension) {
    for(let prop in extension) {
        if(extension.hasOwnProperty(prop)) {
            switch(typeof base[prop]) {
                case 'object':
                    if(Array.isArray(base[prop])) {
                        base[prop] = mergeArray(base[prop], extension[prop])
                    } else {
                        base[prop] = merge(base[prop], extension[prop])
                    }
                    break;
                default:
                    base[prop] = extension[prop];
            }
        }
    }
    return base;
}

const mergeConf = function(extension) {
    return merge(baseConfig, extension);
}

module.exports = { baseConfig, mergeConf }
