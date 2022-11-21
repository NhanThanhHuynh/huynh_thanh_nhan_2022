const { createComment, getAllComment, updateComment, deleteCategory } = require('../Services/HomeServices/comments.service')

async function create(req, res) {
    const { title, content, postId } = req.body;

    if (!title || !content) {
        res.status(400).json({ success: false, message: "Title and content is required" });
    }
    try {
        const newComment = await createComment({ title, content, user: req.userId, post: postId })
        res.json({ success: true, message: "Post successfully", new_comment: newComment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Interval server" });
    }
}

async function getAll(req, res) {
    const { pageSize, page } = req.body
    try {
        const comments = await getAllComment({ pageSize, page })
        res.json({ success: true, comments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

async function update(req, res) {
    const { title, content } = req.body
    const { id } = req.params

    if (!id) {
        res.status(400).json({ success: false, message: "Not found Id" });
    }

    try {
        const updatePost = await updateComment({ commentId: id, title, content })
        res.json({ success: true, update_post: updatePost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

async function deleteComment(req, res) {
    const { id } = req.params

    if (!id) {
        res.status(400).json({ success: false, message: "Not found Id" });
    }

    try {
        const deletePost = await deleteCategory({ commentId: id })
        res.json({ success: true, delete: deletePost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = {
    create,
    getAll,
    update,
    deleteComment
};