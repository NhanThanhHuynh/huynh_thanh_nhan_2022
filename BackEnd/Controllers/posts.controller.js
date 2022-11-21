const { getAllPost, creatPosts } = require('../../BackEnd/Services/HomeServices/posts.service')

async function createPost(req, res) {
    const { title, content, tags } = req.body;
    if (!title || !content) {
        res.status(400).json({ success: false, message: "Title and content is required" });
    }
    try {
        const newPost = await creatPosts({ title, content, tags, user: req.userId })
        res.json({ success: true, message: "Post successfully", newPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Interval server" });
    }
}

async function getAll(req, res) {
    const { pageSize, page } = req.body
    try {
        const posts = await getAllPost({ pageSize, page })
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = {
    createPost,
    getAll,
};