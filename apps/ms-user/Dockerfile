FROM node:22-alpine AS stage_base
WORKDIR /app

FROM stage_base AS stage_deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm i --omit=dev

FROM stage_base AS stage_production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm i
COPY . .
RUN npm run build


FROM stage_base AS stage_final
RUN apk add curl
# COPY ./.env ./.env
COPY --from=stage_production /app/dist ./dist
COPY --from=stage_deps /app/node_modules ./node_modules
COPY --from=stage_production /app/package.json ./package.json

CMD ["npm", "run", "start"]