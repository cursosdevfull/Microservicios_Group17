import express from "express";
import { Application } from "../application";
import { AuthController } from "./auth-controller";
import { AuthAdapter } from "../adapters";
import { AuthPort } from "../ports";

class AuthRoute {
    readonly router = express.Router()

    constructor(private controller: AuthController) {
        this.mountRoutes()
    }

    private mountRoutes() {
        this.router.post("/login", this.controller.login.bind(this.controller))
        this.router.post("/validate-access-token", this.controller.validateAccessToken.bind(this.controller))
    }
}

const port: AuthPort = new AuthAdapter()
const application = new Application(port)
const controller = new AuthController(application)
const route = new AuthRoute(controller)

export default route.router;