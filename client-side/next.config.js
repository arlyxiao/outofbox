const withCSS = require('@zeit/next-css');
module.exports = withCSS();

// module.exports = withCSS(withSass({
//     cssModules: true,
//     cssLoaderOptions: {
//         importLoaders: 1,
//         localIdentName: "[local]___[hash:base64:5]",
//     },
//     devServer: {
//         historyApiFallback: true,
//         watchOptions: {aggregateTimeout: 300, poll: 1000},
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//             "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
//         }
//     }
// }));


// module.exports = {
//   webpack: (config, { defaultLoaders }) => {
//     config.module.rules.push({
//       test: /\.scss$/,
//       use: [
//         defaultLoaders.babel,
//         {
//           loader: require('styled-jsx/webpack').loader,
//           options: {
//             type: 'scoped'
//           }
//         },
//         'sass-loader'
//       ]
//     });
//
//     return config
//   }
// };
//
