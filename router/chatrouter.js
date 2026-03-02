const express = require('express');
const router = express.Router();
const Chat = require('../models/chatmodel'); 






// Import your Chat model
router.post('/', async (req, res) => {
  const { doctorId,  message, sender } = req.body;

  console.log('POST /chat received:', req.body);  // Log received data

  if (!doctorId ||  !message || !sender) {
    console.error('Missing required fieeeeelds');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new chat message
    const newMessage = new Chat({ doctorId,  message, sender });
    await newMessage.save();  // Save message to database
    console.log('Message saved:', newMessage);

    res.status(200).json({ success: true, message: 'Message sent and saved' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});


router.post('/send', async (req, res) => {
  const { doctorId, message, sender } = req.body;

  if (!doctorId || !message || !sender) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
      // Create and save the message in the database
      const newMessage = new Chat({
          doctorId,
          message,
          sender,  // Either 'user' or 'doctor'
          timestamp: new Date()
      });
      await newMessage.save();

      res.status(200).json({ success: true });
  } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Failed to save message' });
  }
});




//Route to fetch chat messages for the user
router.get('/chat/messages', async (req, res) => {
    const { doctorId, userId } = req.query;

    if (!doctorId || !userId) {
        return res.status(400).json({ error: 'Missing doctor or user ID' });
    }

    try {
        // Find messages for the specific doctor and user
        const messages = await Message.find({ doctorId, userId }).sort({ timestamp: 1 });
        
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to load messages' });
    }
});

// Route to fetch chat messages for the user
router.get('/chat/messages', async (req, res) => {
  const { doctorId, userId } = req.query;

  if (!doctorId || !userId) {
      return res.status(400).json({ error: 'Missing doctor or user ID' });
  }

  try {
      // Fetch messages between specific doctor and user, sorted by timestamp
      const messages = await Chat.find({ doctorId, userId }).sort({ timestamp: 1 });
      res.status(200).json({ messages });
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to load messages' });
  }
});



module.exports = router;
