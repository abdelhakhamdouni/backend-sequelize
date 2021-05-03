const User = require("../models").User
/**
 * create user in database
 * @param {Request} req 
 * @param {Response} res 
 * @param {Callback} next 
 */


module.exports = (req, res, next) =>{

    req.body.avatar = req.file.filename || "pas de avatar"

    User.create(req.body).then(user=>{
        req.body={
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            avatar: req.protocol + "://" + req.get("host") +'/uploads/images/'+ user.avatar
        }
        next()
    })
    .catch(err=> {
        res.status(500).json({err: err.errors[0].message})
    })
}