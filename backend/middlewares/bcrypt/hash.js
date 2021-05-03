const bcrypt = require('bcrypt')
require('dotenv').config()

const salt = parseInt(process.env.SALT)

module.exports = (req, res, next)=>{
    req.body = JSON.parse(req.body.user)
    const pass = req.body.password

    bcrypt.hash(pass, salt , function(err, hash){
        if(err){
            console.log(err)
            res.status(500).json({err})
        }else{   
            req.body.password = hash
            next()
        }
    })
}