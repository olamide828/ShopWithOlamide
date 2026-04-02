FROM richarvey/nginx-php-fpm:3.1.6

COPY . .

# Image & Laravel config
ENV WEBROOT /var/www/html/public
ENV APP_ENV production
ENV APP_DEBUG false

# Install dependencies and build React assets
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Optimize Laravel
RUN php artisan config:cache
RUN php artisan route:cache

# This starts the server
CMD ["/start.sh"]
