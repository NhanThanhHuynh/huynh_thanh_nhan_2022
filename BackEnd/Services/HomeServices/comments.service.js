const { MONGO_DB_CONFIG } = require('../../Configs/app.config')
const { comments } = require('../../Models/HomeModel/comments.model')

async function createComment({ title, content, user, post }) {
    const model = new comments({ title, content, user, post })
    return model.save().then(res => res).catch(err => console.log(err))
}

async function getAllComment(params) {
    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE
    let page = (Math.abs(params.page) || 1) - 1

    return comments
        .find()
        .limit(perPage)
        .skip(perPage * page)
        .then(res => res).catch(err => console.log(err))
}

async function updateComment({ commentId, title, content }) {
    const params = {
        "title": title,
        "content": content,
    }

    return comments
        .findByIdAndUpdate(commentId, {params}, { useFindAndModify: false })
        .then((res) => res).catch((err) => console.log(err))
}

async function deleteCategory({ commentId }) {

    return comments
        .findByIdAndDelete(commentId)
        .then((res) => res)
        .catch(err => console.log(err))
}


module.exports = {
    createComment,
    getAllComment,
    updateComment,
    deleteCategory
}