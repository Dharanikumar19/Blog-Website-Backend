const router = require("express").Router()
const blogCtrl = require('../controllers/blogCtrl')
const auth = require("../middleware/auth")

router.post("/", auth, blogCtrl.createBlog)
router.get("/", blogCtrl.getBlogs)
router.get("/:id", blogCtrl.getBlog)
router.get("/userBlogs/:id", blogCtrl.getBlogByUser)
router.patch("/:id",auth, blogCtrl.updateBlog)
router.delete("/:id",auth, blogCtrl.deleteBlog)

module.exports = router