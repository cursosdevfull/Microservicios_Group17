import express, { Request, Response } from 'express';
import { RegistryService } from '../core/services/registry';
import { z } from 'zod';

const router = express.Router();

export const createRoutes = (registry: RegistryService) => {

    router.post("/services", (req: Request, res: Response) => {
        try {
            const schema = z.object({
                name: z.string().min(3),
                host: z.string().min(3),
                port: z.number().int().positive().min(1).max(65535),
                healthCheckUrl: z.url()
            })

            const validateRegistry = schema.parse(req.body)
            const serviceInstance = registry.register(validateRegistry)

            res.status(201).json(serviceInstance);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    })

    router.put("/services/:id/heartbeat", (req: Request, res: Response) => {
        try {
            const schema = z.object({
                id: z.uuidv4()
            })

            const validatedParams = schema.parse(req.params)

            const success = registry.heartbeat(validatedParams.id)

            if (!success) {
                res.status(404).json({ error: "Service not found" });
            } else {
                res.json({ message: "Heartbeat received", timestamp: new Date() });
            }


        } catch (error) {
            console.error("Error processing heartbeat:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.delete("/services/:id", (req: Request, res: Response) => {
        try {
            const schema = z.object({
                id: z.uuidv4()
            })

            const validatedParams = schema.parse(req.params)

            const success = registry.unregister(validatedParams.id)

            if (!success) {
                res.status(404).json({ error: "Service not found" });
            } else {
                res.json({ message: "Service unregistered" });
            }

        } catch (error) {
            console.error("Error unregistering service:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

    });

    router.get("/services", (req: Request, res: Response) => {
        try {
            const services = registry.getServicesByName("")

            res.json(services);
        }
        catch (error) {
        }
    })


    return router
}