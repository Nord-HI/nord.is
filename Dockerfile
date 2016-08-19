# Dockerfile
# The FROM directive sets the Base Image for subsequent instructions
FROM debian:jessie

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Creat an unprivileged user to run the app
RUN useradd --user-group --create-home --shell /bin/false stjori

# Set environment variables
ENV NODE_VERSION=4.2.6
ENV APPDIR=/home/stjori/nord

COPY package.json $APPDIR

# Run updates and install deps
RUN apt-get update

# Install needed deps and clean up after
RUN apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    g++ \
    gcc \
    git \
    make \
    nginx \
    sudo \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean

  # Change working directory
  WORKDIR $APPDIR/source

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
  && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.gz" && \
  npm install --progress=false -g npm@3.3.6 # 2015-09-25 && \
  mkdir -p $APPDIR/source

USER root
COPY . $APPDIR/source
# Give user stjori ownership of the added files
RUN chown -R stjori:stjori $APPDIR/*
# Switch to user stjori
USER stjori

CMD ["node", "server.js"]
