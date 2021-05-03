const User = require('../models').User
const formatUser = require('../utils/formatUser')
const bcrypt = require('bcrypt')
require('dotenv').config()

const salt = parseInt(process.env.SALT)

module.exports = {

    getOneUser: async (req, res, next) => {
        let id = req.params.id
        let user = await User.findByPk(id)
        if (user) {
            user = formatUser(user, req)
            res.status(200).json(user)
        }
        else {
            res.status(500).json({ err: "user introubale" })
        }
    },
    getAllUsers: async (req, res) => {
        let formatedUsers = []
        let users = await User.findAll()
        if (users) {

            users.forEach((user, index) => {

                formatedUsers[index] = formatUser(user, req)

                if (index === users.length - 1) {
                    res.status(200).json(formatedUsers)
                }
            })
        }
        else {
            res.status(500).json({ err: "user introubale" })
        }
    },
    updateUserAvatar: async (req, res, next) => {

        let id = req.body.userId
        User.update(
            {avatar: req.file.filename},
            {where: {id: id}}
        )
        .then(user=>{
            res.status(200).json({err: "user updated"})
        })
        .catch(err=>{
            res.status(500).json({ err: "user introubale" })

        })

    },
    updateUserPassword: async (req, res, next) => {

        let id = req.body.id
        let password = req.body.password
        console.log("idddddddddddddd ", id)
        bcrypt.hash(password, salt , function(err, hash){
            if(err){
                console.log(err)
                res.status(500).json({err})
            }else{   
                User.update(
                    {password: hash},
                    {where: {id: id}}
                )
                .then(user=>{
                    res.status(200).json({err: "user updated"})
                })
                .catch(err=>{
                    res.status(500).json({ err: "user introubale" })
        
                })
            }
        })
       

    }


}