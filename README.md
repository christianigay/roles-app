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
- Run sail in detached mode. sail up -d
- sail artisan migrate
- php artisan ui react or with optional --auth
- sail composer install
- sail npm install
- sail npm run watch
- Open http://localhost:8701 or http://127.0.0.1:8701

