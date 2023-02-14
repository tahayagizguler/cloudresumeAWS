locals {
    s3_origin_id = aws_s3_bucket.cloud-resume-bucket.bucket_regional_domain_name
    tags = {
        created_by = "terraform"
  }
}

# locals {
#   error_html = templatefile("${path.module}/html/error.html", {
#     domain_name = "${aws_cloudfront_distribution.s3_cf.domain_name}"
#   })
# }

# locals {
#   index_html = templatefile("${path.module}/html/index.html", {
#     domain_name = "${aws_cloudfront_distribution.s3_cf.domain_name}"
#   })
# }