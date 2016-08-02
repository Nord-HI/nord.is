import getBabelRelayPlugin from 'babel-relay-plugin';

let babelRelayPlugin = null

// If we are running a script, don't enable the relay plugin. Return empty object
if (process.env.NODE_ENV === 'script') {
  babelRelayPlugin = () => ({})
} else {
  const schema =  require('./schema.json');
  babelRelayPlugin = getBabelRelayPlugin(schema.data, {
    debug: true,
    suppressWarnings: false,
    enforceSchema: true,
  })
}

export default babelRelayPlugin
