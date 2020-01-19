const apiUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}`

const request = require('request')
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_URL);

exports.getWeather = (req,res,next) => {
    return new Promise( (resolve, reject) => {
        if (Math.random(0, 1) < 0.1) throw new Error('How unfortunate! The API Request Failed');

        const city = req.params.city;

        client.get(city, (err,reply) => {
            if(err){ reject(err); }
            console.log(reply)
            if(!reply){ return reject(new Error('Ciudad no encontrada'));}   
            
            reply = JSON.parse(reply);
            const url = `${apiUrl}/${reply.lat},${reply.lon}`;

            request.get(url,{}, (error, response, body) => {
                if(error){ reject(error) }
                if(response.statusCode != 200){ reject(body) }
                resolve(body);
            })
        })
    })
    .then( data => {
        return res.status(200).json({
            ok: true,
            data: JSON.parse(data)
        })
    })
    .catch( error => {
        next(error);
    })
}