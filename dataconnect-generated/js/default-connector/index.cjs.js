const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'tugas uas',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

