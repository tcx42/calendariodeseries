import express from "express";
import config from "./config";
import login from "./controllers/login";
import signIn from "./controllers/signIn";
import { apiErrorHandler } from "./errorHandling/apiErrorHandler";
import { loginReqSchema, signInReqSchema, validateDto } from "./validation/dto";

const app = express();
const router = express.Router();

router.get('/login', validateDto(loginReqSchema), login);
router.post('/signin', validateDto(signInReqSchema), signIn);

app.use(express.json());
app.use(router);
app.use(apiErrorHandler)
app.listen(config.app.port, () => { console.log('Running...') })