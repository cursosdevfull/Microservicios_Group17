import express from "express";
import { Application } from "../application";
import { AppointmentPort } from "../ports";
import { AppointmentAdapter } from "../adapters";
import { AppointmentController } from "./appointment-controller";


class AppointmentRoute {
    readonly router = express.Router()

    constructor(private controller: AppointmentController) {
    }

}

const port: AppointmentPort = new AppointmentAdapter()
const application = new Application(port)
const controller = new AppointmentController(application)
const route = new AppointmentRoute(controller)

export default route.router;