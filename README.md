# Typescript AWS Lambda Native Idempotency
Repository with examples of AWS Lambdas using its native idempotency validation in Typescript

## Setup
1. In order to run Localstack, you will need to have *Docker* installed in your machine. 
You can follow this [link](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt) to install.
2. Then, you will need to install Localstack itself. 
This [link](https://github.com/localstack/localstack) may help you.
3. After this, you should install *awscli-local* by following this [link](https://pypi.org/project/awscli-local/) or just running this command:

``` shell
pip3 install awscli-local
```

## Running :computer:
1. Start Localstack
``` shell
LAMBDA_REMOTE_DOCKER=0 DEBUG=1 localstack start
```

2. Create the DynamoDB idempotency table
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

3. Run the **package.json** scripts

4. After running each of them, scan the DynamoDB table to check the idempotency records.
``` shell
awslocal dynamodb scan \
    --table-name idempotency
```

In case you want to delete the table to create it again, run the following command:
``` shell
awslocal dynamodb delete-table \
    --table-name idempotency
```
