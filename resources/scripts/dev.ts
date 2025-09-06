import concurrently from 'concurrently';

concurrently([
    {
        name: 'server   ',
        command: 'php artisan serve',
        prefixColor: 'blue',
    },
    {
        name: 'bundler  ',
        command: 'bun run dev',
        prefixColor: 'green',
    },
    {
        name: 'queue    ',
        command: 'php artisan queue:listen',
        prefixColor: 'yellow',
    },
]);
