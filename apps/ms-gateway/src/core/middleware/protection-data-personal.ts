import { NextFunction, Request, Response } from "express";

function removeSensitiveFields(obj: any, fieldsToRemove: string[]): any {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => removeSensitiveFields(item, fieldsToRemove));
    }

    const newObj: any = {};
    for (const key in obj) {
        if (!fieldsToRemove.includes(key)) {
            newObj[key] = removeSensitiveFields(obj[key], fieldsToRemove);
        }
    }
    return newObj;
}

export function protectionDataPersonal(fieldsToRemove: string[] = ['password']) {
    return (request: Request, response: Response, next: NextFunction) => {
        const methodOriginal = response.json

        response.json = (data: any) => {
            const cleanedData = removeSensitiveFields(data, fieldsToRemove);
            return methodOriginal.call(response, cleanedData);
        }

        next()
    }
}