import { NodeHttpHandler } from "@smithy/node-http-handler";
import { Agent } from "node:https";

const AWS_REQUEST_MAX_RETRIES: number = 5;
const AWS_TIMEOUT_IN_SECONDS: number = 5;
const AWS_MAX_SOCKET: number = Infinity;

const MILLISECONDS_PER_SECOND = 1000;
const secondsToMilliseconds = (seconds: number): number => seconds * MILLISECONDS_PER_SECOND;

const AWS_CONFIG = {
    MAX_RETRIES: AWS_REQUEST_MAX_RETRIES,
    MAX_SOCKET: AWS_MAX_SOCKET,
    TIMEOUT: secondsToMilliseconds(AWS_TIMEOUT_IN_SECONDS),
};

export class AwsConfig {
    static get() {
        const awsConfig: any = {
            region: "us-east-1",
            endpoint: "http://localhost:4566",
            maxAttempts: AWS_CONFIG.MAX_RETRIES,
            requestHandler: new NodeHttpHandler({
                httpsAgent: new Agent({
                    maxTotalSockets: AWS_CONFIG.MAX_SOCKET,
                    keepAlive: true,
                }),
                connectionTimeout: AWS_CONFIG.TIMEOUT,
            }),
            credentials: {
                accessKeyId: "access-key-id",
                secretAccessKey: "secret-access-key"
            },
        };

        return awsConfig;
    }
}
