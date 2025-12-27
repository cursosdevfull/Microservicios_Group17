import { Request, Response } from "express";
import { Application, Appointment } from "../application";
import z from "zod";

export class AppointmentController {
    constructor(private application: Application) { }

    handle(req: Request, res: Response) {
        console.log("Received appointment request:", req.body);

        try {
            const scheme = z.object({
                id: z.number(),
                slotId: z.number().min(1),
                patientId: z.number().min(1)
            })

            const validation = scheme.parse(req.body);

            const appointment = new Appointment({
                id: validation.id,
                slotId: validation.slotId,
                patientId: validation.patientId,
            })

            this.application.processAppointment(appointment)

            res.status(201).json({ message: "Appointment created successfully" });
        } catch (error) {
            console.error("Error in AppointmentController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }


}