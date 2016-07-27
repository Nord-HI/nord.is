require('dotenv').config()

const { PORT, GRAPHQL_PORT } = process.env

export default {
  PORT: PORT || 8080,
  GRAPHQL_PORT: GRAPHQL_PORT || 5000,
}
