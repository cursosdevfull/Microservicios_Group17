import { Request, Response } from "express";
import { Application, Appointment, Status } from "../application";
import z from "zod";
import { AppointmentDto } from "../application/dtos";
import { EnumCountry } from "../../core/enum";

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

    async update(req: Request, res: Response) {
        try {
            const scheme = z.object({
                id: z.number().min(1),
                status: z.string()
            })

            const validation = scheme.parse(req.body);

            const appointmentData = await this.application.retrieve(validation.id)

            if (appointmentData) {
                appointmentData.events = [...appointmentData.events, { status: validation.status as Status, timestamp: new Date() }];
                const appointment = AppointmentDto.fromDataToDomain(appointmentData) as Appointment;
                await this.application.update(appointment)

                res.status(201).json({ message: "Appointment created successfully" });
            } else {
                res.status(404).json({ message: "Appointment not found" });
            }
        } catch (error) {
            console.error("Error in AppointmentController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async receive() {
        await this.application.receiveMessage()
    }
}