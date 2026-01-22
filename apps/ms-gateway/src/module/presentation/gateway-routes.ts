import express from "express";
import { Application } from "../application";
import { GatewayAdapter } from "../adapters";
import { GatewayController } from "./gateway-controller";
import { GatewayPort } from "../ports";
import { isAuthenticated } from "../../core/guards/authentication";
import { protectionDataPersonal } from "../../core/middleware/protection-data-personal";

class GatewayRoute {
    readonly router = express.Router()

    constructor(private controller: GatewayController) {
        this.mountRoutes()
    }

    private mountRoutes() {
        this.router.post("/appointment", isAuthenticated, protectionDataPersonal(), this.controller.bookAppointment.bind(this.controller))
        this.router.post("/user", protectionDataPersonal(), this.controller.createUser.bind(this.controller))
        this.router.post("/login", protectionDataPersonal(), this.controller.login.bind(this.controller))
    }
}

const port: GatewayPort = new GatewayAdapter()
const application = new Application(port)
const controller = new GatewayController(application)
const route = new GatewayRoute(controller)

export default route.router;