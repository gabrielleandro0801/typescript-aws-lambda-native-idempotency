import { makeIdempotent } from '@aws-lambda-powertools/idempotency';
import { IdempotencyLambdaHandlerOptions } from '@aws-lambda-powertools/idempotency/types';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import { getIdempotencyOptions } from '../idempotency-config';

const idempotencyTable: string = "idempotency";
const attributePath: string = "Records[0].messageId";

const idempotencyOptions: IdempotencyLambdaHandlerOptions = getIdempotencyOptions({
    table: idempotencyTable,
    attributePath,
});

async function main(event: SQSEvent, context): Promise<string> {
    try {
        const record: SQSRecord = event.Records[0];
        const payload = JSON.parse(record.body);
        console.log("===== Processing event =====");

        return "messageId already processed!";
    } catch (error) {
        console.log(error.message);
    }
}

const handler = makeIdempotent(main, idempotencyOptions)
export {
    handler,
};
