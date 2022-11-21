const { MONGO_DB_CONFIG } = require('../../Configs/app.config')
const { posts } = require('../../Models/HomeModel/posts.model')

async function getAllPost(params) {

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE
    let page = (Math.abs(params.page) || 1) - 1

    return posts
        .find()
        .limit(perPage)
        .skip(perPage * page)
        .then(res => res)
        .catch(err => {
            console.log(err)
        })
}

//No have any button create posts , this line for create with postman
async function creatPosts({ title, content, tags, user}) {
    const Newpost = new posts({
        title,
        content,
        tags,
        user
    });
    return await Newpost.save()
}

module.exports = {
    getAllPost,
    creatPosts
}