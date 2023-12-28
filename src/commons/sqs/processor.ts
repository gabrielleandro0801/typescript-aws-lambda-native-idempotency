import { SQSEvent, SQSRecord } from "aws-lambda";

export function sqsProcessor(event: SQSEvent, returnMessage: string): string {
    const record: SQSRecord = event.Records[0];
    const payload = JSON.parse(record.body);
    console.log("===== Processing event =====");

    return returnMessage;
}
