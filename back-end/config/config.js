if(process.env.NODE_ENV === "prod"){
    // PUERTO
    process.env.PORT = process.env.PORT || 3000;

    // API KEY FORECAST
    process.env.API_KEY = process.env.API_KEY || 'ff5209527fa536cc6e88038dacba0cfc'

    // REDIS CONFIG
    process.env.REDIS_URL = process.env.REDIS_URL || 'redis_server';

    process.env.REDIS_PORT = process.env.REDIS_PORT || 6379;
}
else {
    // PUERTO
    process.env.PORT = process.env.PORT || 3000;

    // API KEY FORECAST
    process.env.API_KEY = process.env.API_KEY || 'ff5209527fa536cc6e88038dacba0cfc'

    // REDIS CONFIG
    process.env.REDIS_URL = process.env.REDIS_URL || 'localhost';

    process.env.REDIS_PORT = process.env.REDIS_PORT || 6379;
}