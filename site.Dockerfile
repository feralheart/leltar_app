# Base required for most things
FROM node:20.14-buster-slim as base

WORKDIR /opt/site

RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends build-essential libfontconfig1 dumb-init && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["dumb-init", "--"]

# Development, used for development only (defaults to watch command)
FROM base as development

ENV NODE_ENV="development"

RUN yarn install

CMD ["yarn", "dev", "--open"]
