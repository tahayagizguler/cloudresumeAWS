terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  # profile = "default"  
  region = "us-east-1"
}

# Generate random string for bucket name
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Modules
module "website" {
  source = "./website"
  bucket_name = "tyg-resume-${random_string.bucket_suffix.result}"
  domain_name = "tahayagizguler.space"
}
