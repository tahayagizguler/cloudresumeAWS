variable "bucket_name" {
  type = string
}

variable "domain_name" {
  type = string
  description = "The domain name for the website."
}

variable "region" {  
  type        = string  
  default     = "us-east-1"  
  description = "Name of the s3 bucket to be created."
}

variable "s3_bucket_prefix" {
  description = "S3 bucket prefix"
  type = string
  default = "apigw-lambda-ddb"
  
}

variable "dynamodb_table" {
  description = "name of the ddb table"
  type = string
  default = "counter"
  
}

variable "lambda_name" {
  description = "name of the lambda function"
  type = string
  default = "visitor counter"
  
}

variable "apigw_name" {
  description = "name of the lambda function"
  type = string
  default = "apigw-http-lambda"
  
}

variable "mime_types" {
  default = {
    htm   = "text/html; charset=UTF-8"
    html  = "text/html; charset=UTF-8"
    css   = "text/css; charset=UTF-8"
    ttf   = "font/ttf"
    js    = "application/javascript"
    map   = "application/javascript"
    json  = "application/json"
    jpg   = "image/jpeg"
    jpeg  = "image/jpeg"
    gif   = "image/gif"
    png   = "image/png"
    php   = "application/x-httpd-php"
    svg   = "image/svg+xml"
    eot   = "application/vnd.ms-fontobject"
    less  = "plain/text"
    scss  = "text/css"
    woff  = "font/woff"
    otf   = "font/otf"
    ico   = "image/x-icon"
    jfif  = "image/jpeg"
  }
}
