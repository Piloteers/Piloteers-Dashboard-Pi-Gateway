"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function env(val) {
    console.log('bla');
    console.log(process.env);
    const NODE_ENV = process.env.env || process.env.NODE_ENV;
    const env = {
        development: {
            gatewaySocketPort: 3003,
            gatewayPort: 3002,
            backendSocketUrl: 'http://localhost:3001',
            backendServerUrl: 'http://localhost:3000'
        },
        production: {
            gatewaySocketPort: 3003,
            gatewayPort: 3002,
            backendSocketUrl: 'http://3.121.254.53:3001',
            backendServerUrl: 'http://3.121.254.53:3000'
        }
    };
    return env[NODE_ENV][val];
}
exports.env = env;
//# sourceMappingURL=env.js.map