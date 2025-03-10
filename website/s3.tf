resource "aws_s3_bucket" "cloud-resume-bucket" {
  bucket = var.bucket_name

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.cloud-resume-bucket.id

  policy = jsonencode({
    Version = "2008-10-17"
    Statement = [
      {
        Sid       = "PublicReadForGetBucketObjects"
        Effect    = "Allow"
        Principal = { AWS = "*" }
        Action    = "s3:GetObject"
        Resource  = "arn:aws:s3:::${aws_s3_bucket.cloud-resume-bucket.id}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket.cloud-resume-bucket]
}

resource "aws_s3_bucket_cors_configuration" "s3_bucket_cors" {
  bucket = aws_s3_bucket.cloud-resume-bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["*"]
    max_age_seconds = 10
  }

  depends_on = [aws_s3_bucket.cloud-resume-bucket]
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.cloud-resume-bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}


resource "aws_s3_object" "test" {
  for_each = fileset("${path.module}/html", "**/*.*")

  bucket        = aws_s3_bucket.cloud-resume-bucket.id
  key           = each.value
  source        = "${path.module}/html/${each.value}"
  content_type  = lookup(var.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])

  depends_on = [aws_s3_bucket.cloud-resume-bucket]
}
