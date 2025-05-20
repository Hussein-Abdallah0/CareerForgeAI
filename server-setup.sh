#!/bin/bash

# Create directory
sudo mkdir -p /var/www/fullstack-staging
sudo chown -R $USER:$USER /var/www/fullstack-staging

# Install Docker
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" \
   -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
echo "docker-compose version: $(docker-compose --version)"

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

exec sg docker newgrp `id -gn`

# Add system optimizations AFTER Docker installation
echo "Configuring system limits..."
sudo tee -a /etc/sysctl.conf <<EOF
vm.max_map_count=262144
fs.file-max=65536
EOF
sudo sysctl -p

# Configure Docker logging (prevent disk filling)
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

# Enable Docker on boot
sudo systemctl enable docker
sudo systemctl restart docker

# Verify installation
docker --version
docker-compose --version