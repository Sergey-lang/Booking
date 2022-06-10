import express from 'express';
import {
  createHotel,
  deleteHotel,
  getByCity,
  getByType,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyAdmin, createHotel);

router.put('/:id', verifyAdmin, updateHotel);

router.delete('/:id', verifyAdmin, deleteHotel);

router.get('/find/:id', getHotel);

router.get('/', getHotels);

router.get('/countByCity', getByCity);

router.get('/countByType', getByType);

router.get('/room/:id', getHotelRooms);

export default router;
