import { makeIdempotent } from '@aws-lambda-powertools/idempotency';
import { IdempotencyLambdaHandlerOptions } from '@aws-lambda-powertools/idempotency/types';
import { Context, SQSEvent, SQSRecord } from 'aws-lambda';
import { getIdempotencyOptions } from '../../idempotency-config';

const idempotencyTable: string = "idempotency";

const idempotencyOptions: IdempotencyLambdaHandlerOptions = getIdempotencyOptions({
    table: idempotencyTable,
});

async function main(event: SQSEvent, context: Context): Promise<string> {
    try {
        const record: SQSRecord = event.Records[0];
        const payload = JSON.parse(record.body);
        console.log("===== Processing event =====");

        return "Event already processed!";
    } catch (error) {
        console.log(error.message);
    }
}

const handler = makeIdempotent(main, idempotencyOptions)
export {
    handler,
};
