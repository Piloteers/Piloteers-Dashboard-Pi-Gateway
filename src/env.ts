export function env(val) {
  const NODE_ENV = process.env.NODE_ENV;
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
      backendSocketUrl: 'http://localhost:3001',
      backendServerUrl: 'http://localhost:3000'
    }
  };
  console.log(process.env.NODE_ENV);
  return env[NODE_ENV][val];
}
