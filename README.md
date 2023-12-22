# typescript-aws-lambda-native-idempotency
Repository with an example of AWS Lambda using its native idempotency validation in Typescript

``` shell
awslocal dynamodb create-table \
    --table-name idempotency \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
```


awslocal dynamodb scan \
    --table-name idempotency

awslocal dynamodb delete-table \
    --table-name idempotency

sqs-body-idempotent.ts