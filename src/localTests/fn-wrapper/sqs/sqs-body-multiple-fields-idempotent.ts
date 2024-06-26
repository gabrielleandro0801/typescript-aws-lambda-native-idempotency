import { Context, SQSEvent } from "aws-lambda";
import { handler } from "../../../fn-wrapper/sqs/sqs-body-multiple-fields-idempotent";

const body = {
    name: "Gabriel",
    age: 22,
    country: "BR",
};

const event: SQSEvent = {
    Records: [
        {
            messageId: '825bcd02-dea4-4e10-81c9-3c93fd7d253b',
            receiptHandle: 'AQEBmw4M3fhCNhJw/4Tpw8y87G6GZL7k48JeKpYEMcLSakvoJxb98qeHcKrrjxRPquEtbG4AwflfXytfkK5LF1eDbigdLCwaRlA9pPAtcSL7roJEN3QdfB5U93phOTlUx1tbjUEOrJNzz3L1YiC7gr7vz+N7Dwt6BU8vO7JZVC1vGKC3wDC8N6WJnOJfDulVG4GyP1M1tO46KyyxoeyHl2VurFCgOkmpXECzr6p0sTzJqJGC+xr7CV770b/kixW8+BZUdrO64LgokVnJFXY3pwwBHsyTh9upWfvE1tVmRE6V1WLf9vauATP5529uLXmqTDiRNDyhDEhDzxdfmf5Vty4aJ5TyPvNG6dslOSjWi/5kIDy/3148MihL5RXkwJ2M9b0tuUAmQLZ3q/s1LRuYpR9aqg==',
            body: JSON.stringify(body),
            attributes: {
                ApproximateReceiveCount: "1",
                SentTimestamp: "1578503533206",
                SenderId: "AROAI3GSSMAZHGJNE64XA:sns",
                ApproximateFirstReceiveTimestamp: "1578503533212",
                MessageDeduplicationId: "123",
                MessageGroupId: "abc",
            },
            messageAttributes: {
                version: {
                    stringValue: "1.0",
                    dataType: "String",
                },
            },
            md5OfBody: '56128e9e0c593f03fd4f141a3de7acc7',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn:aws:sqs:us-east-1:00000000000:myQueue.fifo',
            awsRegion: 'us-east-1'
        }
    ]
}

const context: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: "my-lambda",
    functionVersion: "$LATEST",
    invokedFunctionArn: "arn",
    memoryLimitInMB: "128MB",
    awsRequestId: "1123",
    logGroupName: "my-log-group",
    logStreamName: "my-log-stream",
    getRemainingTimeInMillis() {
        return 1000;
    },
    done: function (error?: Error, result?: any): void {
        throw new Error("Function not implemented.");
    },
    fail: function (error: string | Error): void {
        throw new Error("Function not implemented.");
    },
    succeed: function (messageOrObject: any): void {
        throw new Error("Function not implemented.");
    }
};

(async () => {
    console.log(`Calling function for the #1 time with body [${JSON.stringify(body)}]`);
    const returnOne: string = await handler(event, context);
    console.log("Returned value:", returnOne, "\n");

    console.log(`Calling function for the #2 time with body [${JSON.stringify(body)}]`);
    const returnTwo: string = await handler(event, context);
    console.log("Returned value:", returnTwo, "\n");

    const newBody = {
        name: "Leandro",
        age: 23,
        country: "BR",
    };
    event.Records[0].body = JSON.stringify(newBody);

    console.log(`Calling function for the #1 time with body [${JSON.stringify(newBody)}]`);
    const returnThree: string = await handler(event, context);
    console.log("Returned value:", returnThree, "\n");

    console.log(`Calling function for the #2 time with body [${JSON.stringify(newBody)}]`);
    const returnFour: string = await handler(event, context);
    console.log("Returned value:", returnFour, "\n");
})();
