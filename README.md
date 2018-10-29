### outofbox
It's far more than CMS

#### Start docker
1. cd outofbox
2. cp docker-compose.yml.example docker-compose.yml
3. Change "cd client-side && npm run dev -- -p 5000 -H 0.0.0.0" into "tail -F /bin/sh"
4. docker-compose up -d

### Install node_modules
1. docker exec outofbox-docker_nodejs_1 /bin/bash
2. cd client-side
3. npm install --save next react react-dom

### Restart docker
1. docker-compose down
2. docker-compose up
