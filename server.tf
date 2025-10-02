provider "aws" {
  region = "us-east-1"   
}

resource "aws_instance" "multi-container-application" {
  ami           = "ami-0360c520857e3138f" 
  instance_type = "t2.micro"
  key_name      = "my-keypair"

  tags = {
    Name = "multi-container-application"
  }
}