import { makeIdempotent } from "@aws-lambda-powertools/idempotency";
import { IdempotencyLambdaHandlerOptions } from "@aws-lambda-powertools/idempotency/types";
import { APIGatewayEvent, Context } from "aws-lambda";
import serverless from "serverless-http";
import { ExpressServer } from "../../commons/api-gateway/express-server";
import { getIdempotencyOptions } from "../../idempotency-config";

const idempotencyTable: string = "idempotency";
const attributePath: string = "path";

const idempotencyOptions: IdempotencyLambdaHandlerOptions = getIdempotencyOptions({
    table: idempotencyTable,
    attributePath,
});

const express: ExpressServer = new ExpressServer();

express.addHolidayRoute();
express.listen(3000);

async function main(event: APIGatewayEvent, context: Context): Promise<any> {
    try {
        const handler = serverless(express.server);

        return await handler(event, context);
    } catch (error) {
        console.log(error.message);
    }
}

const handler = makeIdempotent(main, idempotencyOptions);
export {
    handler
};
