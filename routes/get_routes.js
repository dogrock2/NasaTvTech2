const redis = require("redis");
const client = redis.createClient();

module.exports = app => {

    app.get("/getCartData", async (req,res) => {

        client.on("error", function(error) {
            console.error(error);
        });        
        
        client.LRANGE(req.sessionID,0,-1, function(err, reply) {
            if(err){
                console.log(err);
                res.send({err});            
            }
            res.send(reply);
        });

    });
}