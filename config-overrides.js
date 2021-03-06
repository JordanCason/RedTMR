const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');


module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    //config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#a02020",
            "@radio-size": "1px",
            "@table-selected-row-bg": "@primary-1",
        },

        })(config, env);
  // do stuff with the webpack config... I had to install @2.7.3 web3-1.0.0-beta.34  "^1.0.0-beta.26"
  return config;
};


// {
//   "name": "reactweb3",
//   "homepage": ".",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "antd": "^3.6.1",
//     "babel-plugin-import": "^1.7.0",
//     "buffer": "^5.1.0",
//     "draft-js": "^0.10.5",
//     "faker": "^4.1.0",
//     "ipfs-mini": "^1.1.2",
//     "jquery": "^3.3.1",
//     "less": "^3.0.4",
//     "purecss": "^1.0.0",
//     "react": "^16.3.2",
//     "react-app-rewire-less": "^2.1.1",
//     "react-app-rewired": "^1.5.2",
//     "react-dom": "^16.3.2",
//     "react-markdown": "^3.3.2",
//     "react-mde": "^5.5.1",
//     "react-redux": "^5.0.7",
//     "react-router-dom": "^4.2.2",
//     "react-router-redux": "^4.0.8",
//     "react-scripts": "1.1.4",
//     "redux": "^4.0.0",
//     "redux-devtools-extension": "^2.13.2",
//     "redux-logger": "^3.0.6",
//     "redux-promise-middleware": "^5.1.1",
//     "redux-thunk": "^2.2.0",
//     "serve": "^6.5.7",
//     "showdown": "^1.8.6",
//     "solc": "^0.4.24",
//     "solium": "^1.1.7",
//     "styled-components": "^3.2.6",
//     "web3": "^1.0.0-beta.26"
//   },
//   "scripts": {
//     "start": "react-app-rewired start",
//     "build": "react-app-rewired build",
//     "test": "react-app-rewired test --env=jsdom",
//     "eject": "react-scripts eject"
//   }
// }
