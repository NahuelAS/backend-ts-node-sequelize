import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import morgan from "morgan"
import cors, { CorsOptions } from "cors"
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync()
        // console.log(colors.green.bold("Connected to database"));
    } catch (err) {
        // console.log(err);
        console.log(colors.red.bold('Failed to connect to database'));
    }
}
connectDB();

const server = express();

//Permitir Conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONT_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    }
}

server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan('dev'));

server.use('/api/products', router);

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;