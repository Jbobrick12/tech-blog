const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route for all posts for the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        // rendering all posts on the homepage
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// GET route for a single post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        const post = postData.get({ plain: true });
        // rendering a single post
        res.render('single-post', {
            post,
            logged_in: req.session.logged_in
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// login and signup routes
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;