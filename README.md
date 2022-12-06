# Create IAM Role for Execution

```
aws iam create-role --role-name lambda-ex-role --assume-role-policy-document file://trust-policy.json
```

![](create-role.png)

```
aws iam get-role --role-name lambda-ex-role > lambda-ex-role.json
aws iam list-attached-role-policies --role-name lambda-ex-role > policies-1.json
```

# Attach Policy to Role
```
aws iam attach-role-policy --role-name lambda-ex-role --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam list-attached-role-policies --role-name lambda-ex-role > policies-2.json
```

![](attached-policies.png)

# Create Lambda Function

```
zip function.zip index.js
aws lambda create-function --function-name my-lambda-fun \
--zip-file fileb://function.zip --handler index.handler --runtime nodejs18.x \
--role arn:aws:iam::695758167061:role/lambda-ex-role
```

![](list-func.png)

## Invoke the Lambda

```
aws lambda invoke --function-name my-lambda-fun out --log-type Tail
aws lambda invoke --function-name my-lambda-fun out --log-type Tail --query 'LogResult' --output text |  base64 -d
```

![](invoke.png)

## Update Memory Limit

```
aws lambda update-function-configuration \
--function-name my-lambda-fun \
--memory-size 256
```

![](update.png)
