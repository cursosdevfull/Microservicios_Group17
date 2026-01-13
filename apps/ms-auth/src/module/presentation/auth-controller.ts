import { Request, Response } from "express";
import { Application } from "../application";
import z from "zod";

export class AuthController {
    constructor(private application: Application) { }

    async login(req: Request, res: Response) {
        try {
            const scheme = z.object({
                email: z.email("Invalid email address"),
                password: z.string().min(6, "Password must be at least 6 characters long")
            })

            const validation = scheme.parse(req.body);

            const tokens = await this.application.login(validation.email, validation.password);
            res.status(201).json(tokens);
        } catch (error) {
            console.error("Error in AuthController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async validateAccessToken(req: Request, res: Response) {
        try {
            const scheme = z.object({
                accessToken: z.string().min(1, "Access token is required")
            })

            const validation = scheme.parse(req.body);

            const user = this.application.validateAccessToken(validation.accessToken);
            res.json({ isValid: user ? true : false })
        } catch (error) {
            console.error("Error in AuthController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}