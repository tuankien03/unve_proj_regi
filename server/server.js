const http = require("http");
const app = require("./app");
const port =  5050;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
