# Typescript AWS Lambda Native Idempotency
Repository with examples of AWS Lambdas using its native idempotency validation in Typescript

``` shell
awslocal dynamodb create-table \
    --table-name idempotency \
    --attribute-definitions \
        AttributeName=identifier,AttributeType=S \
        AttributeName=idempotency_hash,AttributeType=S \
    --key-schema \
        AttributeName=identifier,KeyType=HASH \
        AttributeName=idempotency_hash,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1
```

``` shell
awslocal dynamodb scan \
    --table-name idempotency
```

``` shell
awslocal dynamodb delete-table \
    --table-name idempotency
```
