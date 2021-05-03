const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET

module.exports = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err)=>{
        if(err){
            res.status(401).json({message: "Vous n'êtes pas authoriser a visiter cet url"})
        }
        else{
            next()
        }
    })
}