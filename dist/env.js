"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function env(val) {
    const NODE_ENV = process.env.NODE_ENV || process.env.env;
    const env = {
        development: {
            environment: 'development',
            gatewaySocketPort: 3003,
            gatewayPort: 3002,
            backendSocketUrl: 'http://localhost:3001',
            backendServerUrl: 'http://localhost:3000'
        },
        production: {
            environment: 'production',
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