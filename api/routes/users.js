import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.send('Hello user!');
// });
//
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send('Hello user! You can delete your account!');
// });
//
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.send('Hello admin! You can delete all account!');
// });

router.put('/:id', verifyUser, updateUser);

router.delete('/:id', verifyUser, deleteUser);

router.get('/:id', verifyUser, getUser);

router.get('/', verifyAdmin, getUsers);


export default router;
