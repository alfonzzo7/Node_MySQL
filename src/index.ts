import Server from "./server/server";
import router from "./router/router";
// import MySQL from "./mysql/mysql";

const port = 3000;

const server = Server.init(port);

server.app.use(router);

// MySQL.instance;

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})