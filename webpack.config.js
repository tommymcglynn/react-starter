const webpack = require('webpack');
const path = require('path');

const SRC_ROOT = path.resolve(__dirname, 'src/main');
const SRC_JS = path.resolve(SRC_ROOT, 'web');
const RESOURCES_DIR = path.resolve(__dirname, 'src/main/resources');
const STATIC_DIR = path.resolve(RESOURCES_DIR, 'static');


const config = (env) => {
    const mode = env.prod ? 'production' : 'development';
    const devtool = env.prod ? 'source-map' : 'inline-source-map';

    const definitions = env.prod ? {
        __ENVIRONMENT_NAME__: JSON.stringify('PRODUCTION'),
    } : {
        __ENVIRONMENT_NAME__: JSON.stringify('DEV'),
    };

    return {
        config: {
            mode: mode,
            devtool: devtool,
            cache: true,
            plugins: [
                new webpack.DefinePlugin(definitions)
            ],
            module: {
                rules: [
                    {
                        test: path.join(__dirname, '.'),
                        exclude: /(node_modules)/,
                        use: [{
                            loader: 'babel-loader',
                            options: {
                                presets: ["@babel/preset-env"]
                            }
                        }]
                    },
                ]
            },
            devServer: {
                open: true,
                publicPath: '/dist/bundles/',
                contentBase: STATIC_DIR
            }
        },
        definitions
    };
};

const index = (env) => {
    const baseConfig = config(env);
    return Object.assign({}, baseConfig.config, {
        entry: {
            index: SRC_JS + '/index.js',
        },
        output: {
            path: STATIC_DIR + '/dist/bundles',
            filename: `[name]_bundle.js`,
            publicPath: '/dist/bundles'
        },
        plugins: [
            ...baseConfig.config.plugins,
        ],
        module: {
            rules: [
                {
                    test: path.join(__dirname, '.'),
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"]
                        }
                    }]
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: '/fonts/'
                            }
                        }
                    ]
                },
            ]
        }
    });
};

module.exports = (env = {}) => {
    return [index(env)];
};