import { Request, Response } from "express";

export class Controller {
    async process(request: Request, response: Response) {
        return response
            .status(200)
            .json({
                message: "OK",
                date: new Date().toISOString(),
            });
    }
}
