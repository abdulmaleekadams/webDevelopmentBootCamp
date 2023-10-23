const http = require('http');
require('./config/dbConnect')

const app = require('./app/app');


const PORT = process.env.PORT || 3000;

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`App is connected on PORT ${PORT}`);
});

