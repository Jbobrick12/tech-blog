const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route for all comments
router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Post,
                    attributes: ['title']
                }
            ]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);