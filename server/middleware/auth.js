var jwt = require('jasonwebtoken');

function Footprint(){
	this.secret: undefined,
	this.options: undefined
}

Footprint.prototype.init = function(secret,options){

};

Footprint.prototype.authenticate = function(){
	return function(req,res,next){

		var user = {
			username: req.body.username,
			password: req.body.password
		}

		if(!user.username || !user.password){
			return res.status(403).send({
				status: 'Error',
				message: 'Authentication error. Username and Password are required.'
			});
		} 

		User.findOne({username: user.username}, function(error, usr){
			if(usr){
				//generate jason web token and return it
			}
			else {
				return res.status(403).send({
                    status: 'error',
                    message: 'Authentication failed.'
                });
			}
		})

	}

};

Footprint.prototype.authorize = function(){

	return function(req,res,next){
		req.user = {};
		var token = req.body.token;
		if(token){
			//authenticat token using jwt
			jwt.verify(token, self.secret, function(err, decoded) {

                if (err) {

                    return res.status(403).send({
                        status: 'error',
                        message: 'Failed to authenticate token.' + err
                    });

                } else if (self.isRestricted(req.method, req.path, decoded.groups, self.options)) {

                    return res.status(403).send({
                        status: 'error',
                        message: 'Access is denied.'
                    });

                }

                req.user = decoded;
                return next();

            });
		}
	}

};

Footprint.prototype.isRestricted = function(secret,options){

};

module.exports = new Footprint();
