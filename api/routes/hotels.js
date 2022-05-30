import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);
  console.log(newHotel);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/register', (req, res) => {
  res.send('Hello register');
});

export default router;
