import express from "express";
import { Application } from "../application";
import { GatewayAdapter } from "../adapters";
import { GatewayController } from "./gateway-controller";
import { GatewayPort } from "../ports";

class GatewayRoute {
    readonly router = express.Router()

    constructor(private controller: GatewayController) {
        this.mountRoutes()
    }

    private mountRoutes() {
        this.router.post("/appointment", this.controller.bookAppointment.bind(this.controller))
        this.router.post("/user", this.controller.createUser.bind(this.controller))
    }
}

const port: GatewayPort = new GatewayAdapter()
const application = new Application(port)
const controller = new GatewayController(application)
const route = new GatewayRoute(controller)

export default route.router;