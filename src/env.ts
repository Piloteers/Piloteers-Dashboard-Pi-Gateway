export function env(val) {
  console.log(process.env);
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
  return env[NODE_ENV][val];
}
