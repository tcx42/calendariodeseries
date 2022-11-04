import express from "express";
import config from "./config";
import login from "./controllers/login";
import register from "./controllers/register";
import { apiErrorHandler } from "./errorHandling/apiErrorHandler";
import { loginReqSchema, registerReqSchema, validateDto } from "./validation/dto";

const app = express();
const router = express.Router();

router.get('/login', validateDto(loginReqSchema), login);
router.post('/signin', validateDto(registerReqSchema), register);

app.use(express.json());
app.use(router);
app.use(apiErrorHandler)
app.listen(config.app.port, () => { console.log('Running...') })