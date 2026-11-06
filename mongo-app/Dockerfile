
# Use official MongoDB image
FROM mongo:8

# Copy database initialization script
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Document MongoDB port
EXPOSE 27017

# docker run -d --name mongo_container --network app-net --env-file ./.env -p 27017:27017 -v mongo-data:/data/db my-mongodb:1.0
