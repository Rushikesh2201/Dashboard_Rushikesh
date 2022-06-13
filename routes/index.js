const { Router } = require('express');
const controllers = require('../controllers/api/user_info');
const router = Router();
router.get('/', (req, res) => res.send('This is root!'))

router.get('/users', controllers.getUsers)
router.post('/user', controllers.createUser)
router.post('/login', controllers.loginUser)

module.exports = router;