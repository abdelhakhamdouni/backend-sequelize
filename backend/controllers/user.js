const User = require('../models').User
const formatUser = require('../utils/formatUser')

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
    }


}