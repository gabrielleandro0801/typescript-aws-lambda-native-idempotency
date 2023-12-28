import { makeIdempotent } from '@aws-lambda-powertools/idempotency';
import { IdempotencyLambdaHandlerOptions } from '@aws-lambda-powertools/idempotency/types';
import { Context, SQSEvent } from 'aws-lambda';
import { sqsProcessor } from '../../commons/sqs/processor';
import { getIdempotencyOptions } from '../../idempotency-config';

const idempotencyTable: string = "idempotency";
const attributePath: string = "Records[0].messageAttributes.version.stringValue";

const idempotencyOptions: IdempotencyLambdaHandlerOptions = getIdempotencyOptions({
    table: idempotencyTable,
    attributePath,
});

async function main(event: SQSEvent, context: Context): Promise<string> {
    try {
        return sqsProcessor(event, "messageAttribute already processed!");
    } catch (error) {
        console.log(error.message);
    }
}

const handler = makeIdempotent(main, idempotencyOptions)
export {
    handler
};
