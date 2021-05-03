module.exports = (user,req) =>{
    user.password = ""
    user.avatar = req.protocol + "://" + req.get("host") +'/uploads/images/'+ user.avatar
    return user
}