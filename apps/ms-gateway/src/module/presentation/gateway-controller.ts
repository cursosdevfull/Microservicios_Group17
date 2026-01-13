import { Request, Response } from "express";
import { Application } from "../application";
import z from "zod";
import { EnumCountry } from "../../core/enum";

export class GatewayController {
    constructor(private application: Application) { }

    bookAppointment(req: Request, res: Response) {
        try {
            const scheme = z.object({
                slotId: z.number().min(1),
                patientId: z.number().min(1),
                country: z.enum(EnumCountry)
            })

            const validation = scheme.parse(req.body);

            this.application.bookAppointment(validation.slotId, validation.patientId, validation.country.toString())
            res.status(201).json({ message: "Appointment created successfully" });
        } catch (error) {
            console.error("Error in GatewayController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    createUser(req: Request, res: Response) {
        try {
            const scheme = z.object({
                name: z.string().min(3, "Name must be at least 3 characters long"),
                email: z.email("Invalid email format"),
                password: z.string().min(6, "Password must be at least 6 characters long")
            })

            const validation = scheme.parse(req.body);

            this.application.createUser(validation.name, validation.email, validation.password);
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error("Error in GatewayController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}