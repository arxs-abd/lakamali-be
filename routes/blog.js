require('dotenv').config()
const express = require('express')
const { viewAll, addBlog, viewBlogBySlug, updateBlog, deleteBlog, viewById,  viewByCategory, addBlogByPublic, getPublicBlogList, accPublicBlog, viewPublicById, deletePublicBlog} = require('../controller/blog')
const {validateBlog, validatePublicBlog} = require('../validator/blog')
const { authenticate, isAdmin } = require('../middleware/auth')
const router = express.Router()
const upload = require('../config/upload')

router.get('/api/blog', viewAll)
router.get('/api/blog/category/:category', viewByCategory)

router.post('/api/blog/public', validatePublicBlog, addBlogByPublic)
router.get('/api/blog/public', [authenticate, isAdmin], getPublicBlogList)
router.get('/api/blog/public/:id', [authenticate, isAdmin], viewPublicById)
router.post('/api/blog/public/:publicBlog/review/:review', [authenticate, isAdmin],accPublicBlog)
router.delete('/api/blog/public', [authenticate, isAdmin], deletePublicBlog)
router.get('/api/blog/userId', authenticate, viewById)
router.get('/api/blogById', authenticate,viewAll)
router.post('/api/blog', authenticate, addBlog)
router.put('/api/blog', upload, authenticate, updateBlog)

router.get('/api/blog/:slug', viewBlogBySlug)
router.delete('/api/blog', authenticate, deleteBlog)

module.exports = router