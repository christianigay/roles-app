<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>
</p>

## Laravel 8 Setup

- clone repo https://github.com/christianigay/roles-app.git
- cd roles-app
- ls /usr/bin/php*
- If no php 8.0 installed. Install PHP 8.0 command sh php_script.sh and enter type 8.0 as php version
- php8.0 $(which composer) install
- php artisan sail:install. Select mysql
- Create alias for sail shortcut. alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
- Optional rebuild sail. docker compose down. sail build --no-cache
- Run sail in detached mode. sail up -d
- sail artisan migrate
- php artisan ui react
- sail npm install
- Open http://localhost or http://127.0.0.1

