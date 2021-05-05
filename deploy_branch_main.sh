#!/bin/sh

git fetch origin && git reset --hard origin/main && git clean -f -d
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d