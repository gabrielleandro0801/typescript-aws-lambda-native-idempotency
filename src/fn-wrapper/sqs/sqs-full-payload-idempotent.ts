import { makeIdempotent } from '@aws-lambda-powertools/idempotency';
import { IdempotencyLambdaHandlerOptions } from '@aws-lambda-powertools/idempotency/types';
import { Context, SQSEvent } from 'aws-lambda';
import { sqsProcessor } from '../../commons/sqs/processor';
import { getIdempotencyOptions } from '../../idempotency-config';

const idempotencyTable: string = "idempotency";

const idempotencyOptions: IdempotencyLambdaHandlerOptions = getIdempotencyOptions({
    table: idempotencyTable,
});

async function main(event: SQSEvent, context: Context): Promise<string> {
    try {
        return sqsProcessor(event, "Event already processed!");
    } catch (error) {
        console.log(error.message);
    }
}

const handler = makeIdempotent(main, idempotencyOptions)
export {
    handler
};
