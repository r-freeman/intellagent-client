export const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1/'
    : 'https://intellagent-server.herokuapp.com/api/v1/';