let Post = require('../models').Post
let User = require('../models').User


module.exports = {
    
    createPost: async (req,res,next)=>{

        console.log(req.body)
        let postData = JSON.parse(req.body.post)
        postData.image = req.protocol + "://" + req.get("host") +'/uploads/images/'+ req.file.filename
        Post.create(postData)
        .then(async ()=>{
                let posts = await Post.findAll({
                    include: {
                        model: User
                      }
                })
                if(posts){
                    //let formatedPosts = posts.map(post=>post.User.filter(key => key != password))
                    res.status(200).json({sucess: "post created", posts})
                }
                else{
                    console.log(error)
                    res.status(500).json({error: "POST_CREATED_ERROR"})
                }
            })
        .catch(err=> {
            console.log(err)
            res.status(500).json({error: "POST_CREATED_ERROR"})
        })
        

    },
    getAllPostsByUserId: async (req,res,next)=>{},

    getAllPosts: async (req,res,next)=>{
        let posts = await Post.findAll({include:[User]})
        if(posts){
            posts.forEach((post, index)=>{
                post["User"].password = ""
                if(index === posts.length -1 ) res.status(200).json({sucess: "post get all", posts})
            })
        }
        else res.status(500).json({error: "POST_GETALL_ERROR"})
    },

    getOnePost: async (req,res,next)=>{
        let id = req.params.id
        console.log(id)
        Post.findOne({ where: {id}, include:[User]})
        .then(post => res.status(200).json({sucess: "post created", post}))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "POST_GET_ONE_ERROR"})
        })
    },

    updatePost: async (req,res,next)=>{},

    deletePost: async (req,res,next)=>{},
}