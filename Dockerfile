# Include the latest node image
FROM node:latest

# Aliases setup for container folders
ARG SERVER="/ftp-ios-bridge"
ARG SERVER_src="./ftp-ios-bridge"
ENV PORT="21"
ENV PASV_PORTS="1024-8192"

# Set the working directory inside the container to server module
WORKDIR ${SERVER}

# Expose control port outside container
EXPOSE ${PORT}

# Expose passive port range outside container
EXPOSE ${PASV_PORTS}

# Copy server module
COPY ${SERVER_src} ${SERVER}

# Install quasar-cli and adonis-cli
RUN npm install -g pm2

# Install dependencies for server module
RUN cd ${SERVER} && npm install --production

# Start server module inside the container
CMD ["pm2-runtime", "pm2.yml", "--no-auto-exit"]
