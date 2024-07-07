# DevOpsProject - Final Project in DevOps course

## Overview
This project implements a React application on the client side and a Node.js server on the backend. The entire application is containerized using Docker and deployed using Git workflows on AWS EC2 instances.

## 1. Application Development
- Developed a React application for the client side.
- Created a Node.js server to handle backend operations.

## 2. Infrastructure Configuration
In this phase, we utilized Ansible to configure AWS EC2 instances and prepare the environment for application deployment. The process included:

- **Ansible Framework Setup:** Implemented Ansible playbooks to automate the setup of AWS EC2 instances. This included provisioning new instances, configuring operating system settings, and installing necessary dependencies.
  
- **Security Group Configuration:** Established secure communication channels by configuring AWS security groups. This involved defining inbound and outbound rules to control traffic flow and enforce network security policies.

- **Environment Configuration:** Set up additional configurations required for deployment, such as environment variables, networking configurations, and any specific runtime settings necessary for the React app and Node.js server to function properly in a production environment.

## 3. GitHub Workflow

### 3.1 Containerization
In this step, we containerize 4 images using Docker Compose:
  - Pushed these containerized images to Docker Hub.
  - Configured one of these images as a reverse proxy to communicate through port 80.
  - Enhanced security by reducing open ports and securing communications.


### 3.2 Continuous Integration and Security
- Integrated Git actions to automate code scans:
  - Dependent bot scan
  - CodeQL scan
  - Container scan
  - Secret Detection scan

### 3.3 Deployment
- Pushed Docker containers to Git and Docker repositories.
- Deployed the application on AWS EC2 instances.

## 4. Testing
- Developed comprehensive Selenium tests:
  - Unit tests for each component.
  - End-to-end tests to ensure full application functionality.
  - Scalability and performance tests.

