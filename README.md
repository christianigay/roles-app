## Laravel 8/React Setup

- clone repo https://github.com/christianigay/roles-app.git
- cd roles-app
- chmod +x docker/start-container.sh
- ls /usr/bin/php*
- If no php 8.0 installed. Install PHP 8.0 command sh php_script.sh and enter type 8.0 as php version
- php8.0 $(which composer) install
- Create alias for sail shortcut. alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
- php artisan sail:install. Select mysql
- Optional rebuild sail. sail down. sail build --no-cache
- Run sail in detached mode. sail up -d or ./vendor/bin/sail up -d
- sail artisan migrate or ./vendor/bin/sail artisan migrate
- ./vendor/bin/sail artisan ui react or with optional --auth
- sail composer install or ./vendor/bin/sail composer install
- sail npm install or ./vendor/bin/sail npm install
- sail npm run watch or ./vendor/bin/sail npm run watch
- Open http://localhost:8701 or http://127.0.0.1:8701

- if there is an issue go to container shell command and you may run the command directly like php artisan route:cache, php artisan config:clear etc.