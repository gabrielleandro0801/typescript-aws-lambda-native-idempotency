import { DynamoDBPersistenceLayer } from '@aws-lambda-powertools/idempotency/dynamodb';
import { IdempotencyLambdaHandlerOptions } from '@aws-lambda-powertools/idempotency/types';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { AwsConfig } from './aws-config';
import { IdempotencyConfig } from '@aws-lambda-powertools/idempotency';

const ddbConfig: DynamoDBClientConfig = AwsConfig.get();
const ddbClient: DynamoDBClient = new DynamoDBClient(ddbConfig);

export type IdempotencyInput = {
    table: string;
    attributePath?: string;
}

export function getIdempotencyOptions(input: IdempotencyInput): IdempotencyLambdaHandlerOptions {
    const persistenceStore: DynamoDBPersistenceLayer = new DynamoDBPersistenceLayer({
        awsSdkV3Client: ddbClient,
        tableName: input.table,
    });

    // const idempotencyConfig: IdempotencyConfig = new IdempotencyConfig({
    //  eventKeyJmesPath: input.attributePath,
    // });

    return {
        persistenceStore,
        //  config: idempotencyConfig,
    };
}
