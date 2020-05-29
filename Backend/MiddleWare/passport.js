const JwStrategy = require("passport-jwt").Strategy  // 
const ExtractJwt = require("passport-jwt").ExtractJwt

//mongoose : 
const mongoose = require("mongoose")

// bring user from model 
const User = mongoose.model("user")

//
const opts = {

}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
opts.secretOrKey    = "session" //make session 

module.exports = passport =>{ 
    passport.use(new JwStrategy(opts,(jwt_payload,done)=> {
        User.findById(jwt_payload.id) //output 
            .then(user => {
                if(user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
            .catch(err => console.log(err))
    }))
}

 
