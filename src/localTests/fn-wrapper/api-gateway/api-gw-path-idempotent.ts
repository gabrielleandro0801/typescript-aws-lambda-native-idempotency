import { Context } from "aws-lambda";
import { handler } from "../../../fn-wrapper/api-gateway/api-gw-path-idempotent";

const event: any = {
    "resource": "/holidays/{date}",
    "path": "/holidays/2023-12-25",
    "httpMethod": "GET",
    "headers": null,
    "multiValueHeaders": null,
    "queryStringParameters": null,
    "multiValueQueryStringParameters": null,
    "pathParameters": {
        "date": "2023-12-25"
    },
    "stageVariables": null,
    "requestContext": {
        "resourceId": "dp6ey2",
        "resourcePath": "/holidays/{date}",
        "httpMethod": "GET",
        "extendedRequestId": "QoJurFyooAMF4rQ=",
        "requestTime": "28/Dec/2023:00:09:40 +0000",
        "path": "/holidays/{date}",
        "accountId": "000000000000",
        "protocol": "HTTP/1.1",
        "stage": "test-invoke-stage",
        "domainPrefix": "testPrefix",
        "requestTimeEpoch": 1703722180059,
        "requestId": "b5f611c1-9059-44de-99dd-992f6fac0be3",
        "identity": {
            "cognitoIdentityPoolId": null,
            "cognitoIdentityId": null,
            "apiKey": "test-invoke-api-key",
            "principalOrgId": null,
            "cognitoAuthenticationType": null,
            "userArn": "arn:aws:sts::000000000000:assumed-role/role/user@email.com",
            "apiKeyId": "test-invoke-api-key-id",
            "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            "accountId": "000000000000",
            "caller": "id:user@email.com",
            "sourceIp": "test-invoke-source-ip" || "localhost:3000",
            "accessKey": "accessKey",
            "cognitoAuthenticationProvider": null,
            "user": "id:user@email.com"
        },
        "domainName": "testPrefix.testDomainName",
        "apiId": "ucev06dklh"
    },
    "body": null,
    "isBase64Encoded": false
};

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
    console.log(`Calling function for the #1 time with path [${event.path}]`);
    const returnOne: any = await handler(event, context);
    console.log("Returned value:", returnOne, "\n");

    console.log(`Calling function for the #2 time with path [${event.path}]`);
    const returnTwo: any = await handler(event, context);
    console.log("Returned value:", returnTwo, "\n");

    event.path = "/holidays/2023-12-31";

    console.log(`Calling function for the #1 time with path [${event.path}]`);
    const returnThree: string = await handler(event, context);
    console.log("Returned value:", returnThree, "\n");

    console.log(`Calling function for the #2 time with path [${event.path}]`);
    const returnFour: string = await handler(event, context);
    console.log("Returned value:", returnFour, "\n");
})();
