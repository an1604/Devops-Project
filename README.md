# DevOpsProject - Final Project in DevOps course

## Overview
This project implements a React application on the client side and a Node.js server on the backend. The entire application is containerized using Docker and deployed using Git workflows on AWS EC2 instances.

## 1. Application Development
- Developed a React application for the client side.
- Created a Node.js server to handle backend operations.

## 2. GitHub Workflow
In this section, we created a CI/CD pipeline to handle changes to the main branch, ran security scans, containerized the application, and deployed it on AWS EC2.

### 2.1 Containerization
In this step, we containerize 4 images using Docker Compose and push them to Docker Hub. One of these images is configured as a reverse proxy to communicate through port 80, enhancing security by reducing open ports and securing communications.

### 2.2 Continuous Integration and Security
- Integrated Git actions to automate code scans:
  - Dependent bot scan
  - CodeQL scan
  - Container scan
  - Secret Detection scan

### 2.3 Deployment
In this step, we configure the EC2 machine to act as a self-hosted runner that listens to GitHub's tasks and responds by running the instructions when they come.

- Pushed Docker containers to Git and Docker repositories.
- Deployed the application on AWS EC2 instances.

## 3. Testing
- Developed comprehensive Selenium tests:
  - Unit tests for each component.
  - End-to-end tests to ensure full application functionality.
  - Scalability and performance tests.

