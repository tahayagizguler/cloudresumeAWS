resource "aws_dynamodb_table" "visiters" {
  name_prefix           = var.dynamodb_table
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "N"
  }

}
