import getBabelRelayPlugin from 'babel-relay-plugin';
import schema from './schema.json';

export default getBabelRelayPlugin(schema.data, {
  debug: true,
  suppressWarnings: false,
  enforceSchema: true,
});
