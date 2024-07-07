# This Dockerfile is for the nginx server that act as a reverse proxy.
FROM nginx:latest

# Copy the custom nginx.conf file to the appropriate location
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

## Health check (Optional)
#HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost/ || exit 1
