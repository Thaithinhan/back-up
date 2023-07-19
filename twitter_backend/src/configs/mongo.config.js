const dev = {
  db: {
    port: process.env.NODE_ENV_DEV_DB_PORT || 27017,
    host: process.env.NODE_ENV_DEV_DB_HOST || '127.0.0.1',
    name: process.env.NODE_ENV_DEV_DB_NAME || 'devTwitter',
  },
};
const pro = {
  db: {
    port: process.env.NODE_ENV_PRO_DB_PORT || 27017,
    host: process.env.NODE_ENV_PRO_DB_HOST || 'localhost',
    name: process.env.NODE_ENV_PRO_DB_NAME || 'proEcome',
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
