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

// POST route for new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.session.post_id
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// DELETE route for deleting a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;