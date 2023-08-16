# Use nginx as a base image
FROM nginx:alpine

# Copy the build directory into the nginx HTML directory
COPY build/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]