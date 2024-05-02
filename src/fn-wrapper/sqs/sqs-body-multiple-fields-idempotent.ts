import { makeIdempotent } from '@aws-lambda-powertools/idempotency';
import { IdempotencyLambdaHandlerOptions } from '@aws-lambda-powertools/idempotency/types';
import { Context, SQSEvent } from 'aws-lambda';
import { sqsProcessor } from '../../commons/sqs/processor';
import { getIdempotencyOptions } from '../../idempotency-config';

const idempotencyTable: string = "idempotency";
const attributePath: string = 'powertools_json(Records[0].body).["name", "age"]';

const idempotencyOptions: IdempotencyLambdaHandlerOptions = getIdempotencyOptions({
    table: idempotencyTable,
    attributePath,
});

async function main(event: SQSEvent, context: Context): Promise<string> {
    try {
        return sqsProcessor(event, "Body already processed!");
    } catch (error) {
        console.log(error.message);
    }
}

const handler = makeIdempotent(main, idempotencyOptions)
export {
    handler
};

// https://docs.powertools.aws.dev/lambda/typescript/latest/utilities/idempotency/#choosing-a-payload-subset-for-idempotency:~:text=new%20IdempotencyConfig(%7B-,eventKeyJmesPath,-%3A%20%27powertools_json(body
