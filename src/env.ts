export function env(val) {
  console.log('bla4');
  console.log(process.env.NODE_ENV);
  const NODE_ENV = typeof process.env.env == 'string' ? process.env.env : process.env.NODE_ENV;
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
