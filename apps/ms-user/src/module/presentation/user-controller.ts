import { Request, Response } from "express";
import { Application, User } from "../application";
import z from "zod";
import { CypherService } from "../../core/services";

export class UserController {
    constructor(private application: Application) { }

    async create(req: Request, res: Response) {
        try {
            const scheme = z.object({
                name: z.string().min(1, "Name is required"),
                email: z.email("Invalid email address"),
                password: z.string().min(6, "Password must be at least 6 characters long")
            })

            const validation = scheme.parse(req.body);

            const user = new User({
                name: validation.name,
                email: validation.email,
                password: await CypherService.hash(validation.password)
            });

            await this.application.save(user);

            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error("Error in UserController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async findByEmail(req: Request, res: Response) {
        try {
            const scheme = z.object({
                email: z.email("Invalid email address")
            })

            const validation = scheme.parse(req.body);

            const user = await this.application.findByEmail(validation.email);

            res.status(201).json(user);
        } catch (error) {
            console.error("Error in UserController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async findByRefreshToken(req: Request, res: Response) {
        try {
            const scheme = z.object({
                refreshToken: z.string().min(1, "Refresh token is required")
            })

            const validation = scheme.parse(req.body);

            const user = await this.application.findByRefreshToken(validation.refreshToken);

            res.status(201).json(user);
        } catch (error) {
            console.error("Error in UserController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const scheme = z.object({
                email: z.email("Invalid email address"),
                password: z.string().min(1, "Password is required")
            })

            const validation = scheme.parse(req.body);

            const user = await this.application.login(validation.email, validation.password);

            if (!user) {
                res.status(401).json({ error: "Invalid email or password" });
            } else {
                res.json(user)
            }
        } catch (error) {
            console.error("Error in UserController:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}