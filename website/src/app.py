import boto3
import json
# from boto3.dynamodb.conditions import Key
import os

def lambda_handler(event, context):
    ALLOWED_ORIGIN = "https://tahayagizguler.cloud"

    # Security: Validate Origin header (API Gateway passes headers in lowercase)
    headers = event.get('headers', {})
    origin = headers.get('origin', '')
    if not origin or origin != ALLOWED_ORIGIN:
        return {
            "statusCode": 403,
            "headers": {
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN
            },
            "body": json.dumps("Unauthorized")
        }

    TABLE_NAME = "counter"
    db_client = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(TABLE_NAME)

    update = db_client.update_item(
        TableName=TABLE_NAME,
        Key={"id": {"N": "0"}},
        UpdateExpression="ADD visitcount :inc",
        ExpressionAttributeValues={":inc": {"N": "1"}}
    )

    getItems = table.get_item(Key={"id": 0})
    itemsObjectOnly = getItems["Item"]
    visitcount = itemsObjectOnly["visitcount"]

    return {"headers": {"Access-Control-Allow-Origin": ALLOWED_ORIGIN}, "statusCode": 200, "body": json.dumps(str(visitcount))} or {"statusCode": 404, "headers": {"Access-Control-Allow-Origin": ALLOWED_ORIGIN}, "body": json.dumps("Item not found")}
