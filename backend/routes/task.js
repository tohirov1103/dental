const router = require('express').Router();
const {addClient, getAllClient} = require('../controllers/operations');
const {login,signup} = require('../controllers/login');

router.post('/addClient',addClient);
router.get('/getAll',getAllClient);
router.post('/login',login)
router.post('/signup',signup)

module.exports = router