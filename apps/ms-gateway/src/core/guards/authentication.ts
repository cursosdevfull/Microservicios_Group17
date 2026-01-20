import { NextFunction, Request, Response } from "express";
import { GatewayAdapter } from "../../module/adapters";

export async function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    const adapter = new GatewayAdapter();

    const result = await adapter.validateAccessToken(token);

    if (!result || !result.isValid) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    next()
}