import express from 'express'
import User from '../models/userModel.js';

const router = express.Router();

router.post('/update-points', async (req, res) => {
  const { userId, points } = req.body;

  try {
    const user = await User.findById(userId);

    if (user) {
      user.points = points;
      await user.save();
      res.status(200).json({ success: true, points: user.points });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router
