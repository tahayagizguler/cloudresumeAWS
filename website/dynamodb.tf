resource "aws_dynamodb_table" "visiters" {
  name           = var.dynamodb_table
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "N"
  }
  
 
  lifecycle {
    ignore_changes = [
      name
    ]

    create_before_destroy = true
  }

  provisioned_capacity {
    read_capacity  = 1
    write_capacity = 1
  }  
  
}
