# resource "random_string" "random" {
#   length           = 4
#   special          = false
# }

resource "aws_apigatewayv2_api" "http_lambda" {
  # name          = "${var.apigw_name}-${random_string.random.id}"
  name          = "${var.apigw_name}"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.http_lambda.id

  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "apigw_lambda" {
  api_id = aws_apigatewayv2_api.http_lambda.id

  integration_uri    = aws_lambda_function.apigw_lambda_ddb.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "get" {
  api_id = aws_apigatewayv2_api.http_lambda.id

  route_key = "GET /" 
  target    = "integrations/${aws_apigatewayv2_integration.apigw_lambda.id}"
}

# Gives an external source permission to access the Lambda function.
resource "aws_lambda_permission" "api_gw" {                            
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.apigw_lambda_ddb.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.http_lambda.execution_arn}/*/*"
}