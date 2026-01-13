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

    router.get("/services", (req: Request, res: Response) => {
        try {
            const services = registry.getServicesByName("")

            res.json(services);
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    })

    router.get("/services/name/:name", (req: Request, res: Response) => {
        try {
            const paramSchema = z.object({
                name: z.string().min(3)
            })

            const querySchema = z.object({
                healthy: z.coerce.boolean().default(false)
            })

            const validatedParams = paramSchema.parse(req.params)
            const validatedQuery = querySchema.parse(req.query)

            const services = validatedQuery.healthy
                ? registry.getHealthyServicesByName(validatedParams.name)
                : registry.getServicesByName(validatedParams.name)

            res.json(services);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    })

    router.get("/services/id/:id", (req: Request, res: Response) => {
        try {
            const schema = z.object({
                id: z.string()
            })

            const validatedParams = schema.parse(req.params)
            const service = registry.getService(validatedParams.id)

            if (!service) {
                res.status(404).json({ error: "Service not found" });
            } else {
                res.json(service);
            }
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


    router.get("/stats", (req: Request, res: Response) => {
        try {
            const stats = registry.getStats();
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    })

    return router
}