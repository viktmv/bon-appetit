require('dotenv').config();

console.log('PROCESS', process.env.DATABASE_URL)

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: postgres://sgqcnsontnagdd:02d9c85e5e0064f774c3a4a5762a865d8f1ea0f28641b1e75cbedb079332dad7@ec2-23-23-86-179.compute-1.amazonaws.com:5432/dep6qavmgaa590,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};
