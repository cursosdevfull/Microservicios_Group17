import { Request, Response } from "express";
import { Application, Appointment, Status } from "../application";
import z from "zod";
import { AppointmentDto } from "../application/dtos";
import { EnumCountry } from "src/core/enum";

export class AppointmentController {
    constructor(private application: Application) { }

    create(req: Request, res: Response) {
        try {
            const scheme = z.object({
                slotId: z.number().min(1),
                patientId: z.number().min(1),
                country: z.enum(EnumCountry)
            })

            const validation = scheme.parse(req.body);

            const appointment = new Appointment({
                slotId: validation.slotId,
                patientId: validation.patientId,
                country: validation.country
            })

            this.application.processAppointment(appointment)

            res.status(201).json({ message: "Appointment created successfully" });
        } catch (error) {
            console.error("Error in AppointmentController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}