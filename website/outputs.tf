output "s3_bucket_id" {
  value = aws_s3_bucket.cloud-resume-bucket.id
}

output "fileset-results" {
  value = fileset(path.module, "**/*.txt")
}

output "api_url" {
  value = aws_apigatewayv2_stage.default.invoke_url
}