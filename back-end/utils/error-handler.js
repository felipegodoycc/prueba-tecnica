const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_URL);

const api = {
    errors: []
};

saveErrors = (error) => {
    let data = {};
    data[Date.now()] = { message: error.message, name: error.name };
    api.errors.push(data);
    client.set('api', JSON.stringify(api), redis.print)
}

exports.consoleError = (err,req,res,next) => {
    console.log('Error detectado ', err)
    if(err.message === 'How unfortunate! The API Request Failed'){
        console.log('Guardar en redis')
        saveErrors(err)
        res.status(500).json({
            ok: false,
            error: err.message
        })
    }
    else {
        err = JSON.parse(err);
        res.status(err.code).json({
            ok: false,
            error: err.error
        });
    }
}
