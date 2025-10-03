#!/bin/bash

# Exit if any command fails
set -e

echo "Updating system..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "Installing prerequisites..."
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    gnupg \
    lsb-release

echo "Adding Docker’s official GPG key..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "Adding Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "Installing Docker..."
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

echo "Enabling Docker to start on boot..."
sudo systemctl enable docker
sudo systemctl start docker

echo "Adding $USER to docker group..."
sudo usermod -aG docker $USER

echo "Docker installation completed."
echo "⚠️ Please log out and back in (or run 'newgrp docker') for group changes to take effect."
echo "You can test Docker with: docker run hello-world"
