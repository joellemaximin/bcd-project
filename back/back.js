const server = require("./api/server.js");

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`server on port ${port}`));

// "proxy":"http://localhost:3001",
