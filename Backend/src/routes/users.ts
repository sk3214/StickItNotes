import express from 'express';
import  {getAuthenticatedUser, logOut, login, signUp} from '../controllers/users';

const router = express.Router();

router.get('/',getAuthenticatedUser);
router.post('/signup',signUp);
router.post('/login',login);
router.post('/logOut',logOut);

export default router;