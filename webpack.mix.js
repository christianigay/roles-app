const mix = require('laravel-mix');

mix.ts('resources/js/app.tsx', 'public/js')
   .react()
   .postCss('resources/css/app.css', 'public/css', [
       require('tailwindcss'),
       require('autoprefixer'),
   ]);