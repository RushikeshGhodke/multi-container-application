provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "multi-container-app-sg" {
  name        = "multi-container-app-sg"
  description = "Allow SSH and HTTP inbound traffic"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "multi-container-app"
  }
}

# EC2 instance
resource "aws_instance" "multi-container-app-ec2" {
  ami           = "ami-0360c520857e3138f" 
  instance_type = "t2.micro"
  key_name      = "tf-multi-container" 

  vpc_security_group_ids = [aws_security_group.multi-container-app-sg.id]

  tags = {
    Name = "multi-container-app-sg-ec2"
  }
}

# Output Public IP
output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.multi-container-app-ec2.public_ip
}
