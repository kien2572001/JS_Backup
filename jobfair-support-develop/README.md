# Jobfair support Setup project

## Viblo Docker for PHP Development
- Clone repo from: [docker-php-development](https://github.com/sun-asterisk-research/docker-php-development)
- Reset commit `f5da6bf feat: update default minio region`
```
cd docker-php-development
git reset --hard f5da6bf
```

- Using in Jobfair support
```
Folder project
+ |- docker-php-development
+ |- jobfair-support
```

In your terminal window, open the hosts file using your favorite text editor:

```sudo nano /etc/hosts```

```127.0.0.1 jobfair.local traefik.jobfair.local phpmyadmin.jobfair.local```

## Services
In folder docker-php-development
Create file `services`
```plain
mysql
redis
php
web
phpmyadmin
laravel/echo-server
```
In file `./docker-php-development/compose/laravel/echo-server.yml` add 
```plain
environment:
    - ...
    - DEV_MODE=true
```
## Env
- Run project with .env in docker-php-development
```
#-------------------------------------------------------------------------------
# Code paths
#-------------------------------------------------------------------------------

PATH_PHP=../jobfair-support/api
PATH_WEB=../jobfair-support/web

#-------------------------------------------------------------------------------
# Data paths
#-------------------------------------------------------------------------------

PATH_DATA=./data
PATH_LOGS=./logs

#-------------------------------------------------------------------------------
# Traefik domain and ports
# DOMAIN, PORT defines public domain for your PHP application
# DOMAIN_WEB defines public domain for your Node.js application
# DOMAIN_SECONDARY is the domain used for other services e.g traefik, mailhog, phpmyadmin .etc
#-------------------------------------------------------------------------------

DOMAIN=jobfair.local
DOMAIN_WEB=jobfair.local
PORT=8000

DOMAIN_SECONDARY=jobfair.local

#-------------------------------------------------------------------------------
# Databases
# DB_DATABASE, DB_USERNAME and DB_PASSWORD are mandatory
# You can leave the others empty for default values
#-------------------------------------------------------------------------------

DB_DATABASE=jobfair
DB_USERNAME=jobfair
DB_PASSWORD=secret

#-------------------------------------------------------------------------------
# Other things
#-------------------------------------------------------------------------------

ELASTICSEARCH_VERSION=7.3.2

MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=miniostorage
MINIO_REGION_NAME=us-east-1

PGADMIN_DEFAULT_EMAIL=admin@domain.com
PGADMIN_DEFAULT_PASSWORD=secret

MEMORY_LIMIT_PHP_FPM=1G
MEMORY_LIMIT_BEANSTALKD=200m
MEMORY_LIMIT_ELASTICSEARCH=512m
MEMORY_LIMIT_MAILHOG=200m
MEMORY_LIMIT_MYSQL=1G
MEMORY_LIMIT_POSTGRES=1G
MEMORY_LIMIT_REDIS=200m

NGINX_DOCUMENT_ROOT=/php/public
NGINX_CONFIG_TEMPLATE=./config/nginx/default.conf

LARAVEL_ECHO_SERVER_REDIS_KEY_PREFIX=laravel_database_

COMPOSE_PROJECT_NAME=jobfair
HOSTS_FILE=/etc/hosts
```

## Run container
```
cd docker-php-development
./project up
```

- API:
```
cd docker-php-development
./project sh php
/php # composer install
/php # cp .env.example .env
/php # php artisan migrate:fresh --seed
/php # chmod -R 777 storage/
```

- Web:
```
cd docker-php-development
./project sh web
/web # cp .env.example .env
/web # yarn
/web # yarn dev
```

## Folder api: jobfair-support/api
copy .env.example to .env
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:Od/M6XLZCbBcsAn5wjPWRr8YKUdpijE7OD5zgykn96A=
APP_DEBUG=true
APP_URL=http://jobfair.local:8000

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=jobfair
DB_USERNAME=root
DB_PASSWORD=root

BROADCAST_DRIVER=redis
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

```

## Folder web: jobfair-support/web
Copy .env.example to .env
```
#-------------------------------------------------------------------------------
# Application info
#-------------------------------------------------------------------------------

APP_ENV=local
APP_KEY=base64:Od/M6XLZCbBcsAn5wjPWRr8YKUdpijE7OD5zgykn96A=

#-------------------------------------------------------------------------------
# URLs: app url, image url...
#-------------------------------------------------------------------------------

APP_URL=http://jobfair.local:8000
IMAGE_URL=http://images-jobfair.local:8000

SERVER_API_URL=http://nginx/api
BROWSER_API_URL=/api

REDIS_HOST=redis

#-------------------------------------------------------------------------------
# Sentry
#-------------------------------------------------------------------------------

SENTRY_DSN=
MIX_GA_ID=
```

## Github workflow

- Khi b???t ?????u d??? ??n c???n fork repo **framgia/jobfair-support** v???
- Ti???p ???? ti??n h??nh clone code t??? repo ???? fork n??i tr??n **[username]/jobfair-support**
- Sau khi clone s??? di chuy???n v??o folder v???a clone ????? add th??m repo ch??nh c???a d??? ??n **framgia/jobfair-support** v???i l???nh sau n???u s??? d???ng SSH key:
```
git remote add sun git@github.com:framgia/jobfair-support.git
```
ho???c n???u s??? d???ng https
```
git remote add sun https://github.com/framgia/jobfair-support.git
```
- Branch ch??nh c???a d??? ??n l?? **develop**
- M???i t??nh n??ng m???i ho???c bug fix m???i s??? l??m theo flow nh?? sau
1. ?????m b???o code m???i nh???t ??? nh??nh develop d?????i local t????ng ??????ng v???i nh??nh m???i nh???t tr??n server b???ng c??ch ch???y 2 l???nh:
```
git checkout develop
git pull sun develop
```
![](git/pull.png) <br>
2. Checkout m???t nh??nh m???i cho t??nh n???ng c???n l??m

```
git checkout -b feat/login
```
![](git/checkout.png) <br>
3. Sau khi code xong ti???n th??nh commit code
```
git add .
git commit -m"feat: login"
```

4. Gi??? s??? sau khi code xong t??nh n??ng login trong nh??nh *feat/login* n??i tr??n v?? g???i chu???n b??? g???i pull request m?? th???y branch develop tr??n server c?? code m???i c???a c??c b???n kh??c th?? c???n ch???y l???nh nh?? sau tr?????c khi t???o pull request:
```
git checkout develop
git pull sun develop
git checkout feat/login
git rebase develop
```
![](git/rebase.svg) <br>
**Sau khi rebase ph??t hi???n c?? conflict th?? ch??? ?????ng x??? l??**

**Tr?????ng h???p n???u nh??nh develop tr??n repo ch??nh kh??ng c?? code m???i th?? c?? th??? b??? qua b?????c 4**

5. Push nh??nh **feat/login** v???a l??m l??n repo fork v???:
```
git push origin feat/login
```

6. T???o pull request t??? branch n??i tr??n trong repo fork v??? ?????n branch develop trong repo ch??nh

=> Qu?? tr??nh n??i tr??n ???????c l???p l???i trong to??n b??? chu tr??nh ph??t tri???n c???a d??? 

## Cypress

????? ch???y cypress v?? code cypress c???n: C??i ?????t **node** v?? **yarn** tr??n m??y
```
sudo apt install curl
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```
*C??ch tr??n t??? ?????ng c??i **node** lu??n. N???u ???? c??i **node** th?? thay v?? ch???y c??u l???nh cu???i th?? ch???y*
```
sudo apt install --no-install-recommends yarn
```
### Ch???y cypress
Termial 1
```
cd docker-php-development
./project up
./project sh web
/web # yarn build 
/web # rm -rf src/.next
/web # cp -r .next src
/web # yarn start
```
Termial 2
```
cd jobfair-support/web
yarn run cypress:open
```
**Tr?????ng h???p xu???t hi???n l???i ch??a c??i ?????t Cypress th?? ch???y c??u l???nh sau tr?????c khi ch???y c??u l???nh cu???i**
```
node_modules/.bin/cypress install
```

