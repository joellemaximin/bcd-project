// Update with your config settings.

module.exports = {

  development: {
    client: "mysql",
      connection: {
        database: "bcd_managment",
        host: "127.0.01",
        user: "root",
        password: ""
      },
      debug: true
  },

  staging: {
    client: "mysql",
      connection: {
        database: "bcd_managment",
        host: "127.0.01",
        user: "root",
        password: ""
      },
      pool: {
        min: 2,
        max: 10
      },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: "mysql",
      connection: {
        database: "bcd_managment",
        host: "127.0.01",
        user: "root",
        password: ""
      },
      pool: {
        min: 2,
        max: 10
      },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
