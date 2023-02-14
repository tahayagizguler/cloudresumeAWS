resource "aws_s3_bucket" "cloud-resume-bucket" {
  bucket = var.bucket_name
  acl    = "public-read"
  policy = file("website/policy.json")

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}


resource "aws_s3_bucket_cors_configuration" "s3_bucket_cors" {
  bucket = aws_s3_bucket.cloud-resume-bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["*"]
    max_age_seconds = 10
  }
}


resource "aws_s3_object" "test" {
  for_each = fileset("${path.module}/html", "**/*.*")
  acl    = "public-read"
  bucket = var.bucket_name
  key    = each.value
  source = "${path.module}/html/${each.value}"
  content_type  = lookup(var.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])
}