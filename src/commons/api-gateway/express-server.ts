import express, { Express, Router } from "express";
import { Controller } from "./controller";

export type Methods = "get" | "post" | "delete" | "put" | "patch";

export type Route = {
    method: Methods;
    path: string;
    controller: any;
    validator?: any;
};

export type IRouteGroup = {
    basePath: string;
    routes: Array<Route>;
};

export class ExpressServer {
    private readonly _server: Express;

    constructor() {
        this._server = express();
    }

    get server() {
        return this._server;
    }

    addHolidayRoute() {
        this.setRoutes([
            {
                basePath: "",
                routes: [
                    {
                        method: "get",
                        path: "/holidays/:date",
                        controller: new Controller(),
                    },
                ],
            },
        ])
    }

    setRoutes(routeGroups: Array<IRouteGroup>): void {
        const router: Router = Router();

        for (const group of routeGroups) {
            group.routes.forEach((route) => {
                const controller = route.controller.process.bind(route.controller);
                const path = `${group.basePath}${route.path}`;

                route.validator
                    ? router[route.method](path, route?.validator?.validate.bind(route?.validator), controller)
                    : router[route.method](path, controller);
            });

            this._server.use(group.basePath, router);
        }
    }

    listen(port: number): void {
        this._server.listen(port, () => {
            console.log(`API running on [http://localhost:${port}]`)
        });
    }
}
