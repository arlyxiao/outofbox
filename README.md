### outofbox
It's far more than CMS

#### Start docker
1. cd outofbox
1. cp web/custom_site.py.example web/custom_site.py
1. cp config/mysql.cnf.example config/mysql.cnf
1. cp outofbox-docker/docker-compose.yml.example outofbox-docker/docker-compose.yml
1. cp outofbox-docker/docker/nginx/default.conf.example outofbox-docker/docker/nginx/default.conf
1. cp client-side/site.js.example client-side/site.js
1. Change "cd client-side && npm run dev -- -p 5000 -H 0.0.0.0" into "tail -F /bin/sh"
1. cd outofbox-docker && docker-compose up -d

#### Update mysql char
1. DROP database your-db-name;
1. CREATE DATABASE your-db-name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
1. ALTER DATABASE your-db-name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
1. SHOW VARIABLES LIKE 'char%'; SHOW VARIABLES LIKE 'collation%';

### Install node_modules
1. docker exec outofbox-docker_nodejs_1 /bin/bash
2. cd client-side
3. npm install --save next react react-dom

### Restart docker
1. docker-compose down
2. docker-compose up

### Create super user
1. docker exec outofbox-docker_web_1 /bin/bash
1. python manage.py createsuperuser

### Load example data
1. python manage.py loaddata example-data/nodes.json
1. python manage.py loaddata example-data/tags.json
