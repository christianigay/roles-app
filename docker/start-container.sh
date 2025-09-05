#!/usr/bin/env bash
set -e

# Ensure log + cache folders exist
mkdir -p /var/www/html/storage/logs
mkdir -p /var/www/html/bootstrap/cache

# Fix permissions for Laravel storage & bootstrap cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R ug+rwX /var/www/html/storage /var/www/html/bootstrap/cache

# Fix permissions for Laravel storage & bootstrap cache
# chown -R sail:sail /var/www/html/storage /var/www/html/bootstrap/cache || true

# Start Supervisor (manages php-fpm + nginx)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
