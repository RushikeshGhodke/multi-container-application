# Multi-Container Todo Application

A production-ready Node.js Todo API with MongoDB, deployed using Docker, Terraform, Ansible, and GitHub Actions CI/CD.

## 🚀 Features

- **RESTful API** - Full CRUD operations for todos
- **Containerized** - Docker & Docker Compose
- **Infrastructure as Code** - Terraform for AWS EC2
- **Configuration Management** - Ansible playbooks
- **CI/CD Pipeline** - Automated deployment with GitHub Actions
- **Production Ready** - Security best practices applied

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| GET | `/todos/:id` | Get a single todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **Infrastructure**: Terraform (AWS EC2)
- **Configuration**: Ansible
- **CI/CD**: GitHub Actions
- **Cloud**: AWS

## 📦 Project Structure

```
.
├── backend/              # Node.js application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── index.js      # Entry point
│   └── Dockerfile        # Backend container image
├── terraform/            # Infrastructure as Code
│   └── server.tf         # AWS EC2 configuration
├── ansible/              # Configuration management
│   ├── inventory.ini     # Server inventory
│   ├── setup.yml         # Setup playbook
│   └── base/             # Base role (Docker, etc.)
├── .github/workflows/    # CI/CD pipelines
│   ├── build.yaml        # Build & push to Docker Hub
│   └── deploy.yaml       # Deploy to EC2
└── docker-compose.yaml   # Multi-container orchestration
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- AWS Account (for deployment)
- Terraform
- Ansible

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd multi-container-application
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the API**
   ```
   http://localhost:3000/todos
   ```

## 🏗️ Deployment Guide

### Step 1: Infrastructure Setup (Terraform)

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

This creates:
- AWS EC2 instance (Ubuntu)
- Security groups (ports 22, 80, 3000)
- SSH key pair

### Step 2: Server Configuration (Ansible)

```bash
cd ansible
ansible-playbook -i inventory.ini setup.yml
```

This installs:
- Docker & Docker Compose
- Essential utilities
- System updates

### Step 3: CI/CD Setup (GitHub Actions)

1. **Add GitHub Secrets** (Settings → Secrets and variables → Actions):
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password/token
   - `EC2_HOST`: EC2 public IP address
   - `EC2_SSH_KEY`: Content of `tf-multi-container.pem`

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Automatic Deployment**
   - Build pipeline runs on push to `main`
   - Deploy pipeline runs after successful build
   - Application deployed to EC2


## 📊 CI/CD Pipeline

### Build Pipeline

**Trigger**: Push to main branch  
**Steps**:
1. Checkout code
2. Build Docker image
3. Push to Docker Hub
4. Tag with `latest` and commit SHA

### Deploy Pipeline

**Trigger**: After successful build  
**Steps**:
1. Copy docker-compose to EC2
2. Pull latest images
3. Restart containers
4. Verify deployment

## 🧪 Testing

### Test API locally

```bash
# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","completed":false}'

# Get all todos
curl http://localhost:3000/todos

# Get single todo
curl http://localhost:3000/todos/1

# Update todo
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete todo
curl -X DELETE http://localhost:3000/todos/1
```

## 🛠️ Maintenance

### View logs
```bash
docker-compose logs -f
```

### Restart services
```bash
docker-compose restart
```

### Stop all services
```bash
docker-compose down
```

### Clean up AWS resources
```bash
cd terraform
terraform destroy
```

---

## 🔗 Project Reference

This project is based on the [Multi-Container Service](https://roadmap.sh/projects/multi-container-service) challenge from roadmap.sh
