import express from "express";
import { Application } from "../application";
import { UserPort } from "../ports";
import { UserAdapter } from "../adapters";
import { UserController } from "./user-controller";

class UserRoute {
    readonly router = express.Router()

    constructor(private controller: UserController) {
        this.mountRoutes()
    }

    private mountRoutes() {
        this.router.post("/", this.controller.create.bind(this.controller))
        this.router.get("/search/email/:email", this.controller.findByEmail.bind(this.controller))
        this.router.get("/search/refresh-token/:refreshToken", this.controller.findByRefreshToken.bind(this.controller))
        this.router.post("/login", this.controller.login.bind(this.controller))
    }
}

const port: UserPort = new UserAdapter()
const application = new Application(port)
const controller = new UserController(application)
const route = new UserRoute(controller)

export default route.router;