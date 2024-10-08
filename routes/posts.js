import express from 'express'
const router = express.Router();

let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Three'},
    {id: 3, title: 'Post Two'},
];



// Get all posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit)
    
if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit))
} 
    res.status(200).json(posts)

})

// Get single posts
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post)=> post.id === id )

    if(!post) {
      const error = new Error(`A post with the id of ${id} was not found`)
      return next(error)
    } 
        res.status(200).json(post);

})

// create new post
router.post('/', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };

    if(!newPost.title) {
        return res.status(400).json({msg: 'Please include a title'})
    } 
    posts.push(newPost)
    res.status(201).json(posts);
})


// Update post
router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        return next(error)
    }

    post.title = req.body.title
    res.status(200).json(posts)
})



// Update post
router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id);

    if (!post) {
       const error = new Error(`A post with the id of ${id} was not found`)
       return next(error)
    }

    posts = posts.filter((post) => post.id !== id)
    res.status(200).json(posts)
})


export default router