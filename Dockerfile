FROM richarvey/nginx-php-fpm:3.1.6

COPY . .

# 1. Install modern Node.js (v20+) and NPM
RUN apk add --update nodejs-current npm

# Image & Laravel config
ENV WEBROOT /var/www/html/public
ENV APP_ENV production
ENV APP_DEBUG false

# 2. Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# 3. Install React dependencies and build assets
RUN npm install && npm run build

# 4. Optimize Laravel
RUN php artisan config:cache
RUN php artisan route:cache

CMD ["/start.sh"]
