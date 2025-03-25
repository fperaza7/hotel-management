#!/bin/bash

php artisan migrate
php artisan db:seed
exec php artisan serve --host=0.0.0.0 --port=80
