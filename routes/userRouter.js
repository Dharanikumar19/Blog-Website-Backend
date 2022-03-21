const router = require("express").Router()
const userCtrl = require('../controllers/userCtrl')

router.post("/signup", userCtrl.signup)
router.post("/signin", userCtrl.signin)
router.post("/googleSignin", userCtrl.googleSignin)


module.exports = router