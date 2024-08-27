import express from 'express';
import sequelize from './config/db.js';
import cors from "cors";
import dotenv from "dotenv";
import axios from 'axios';
import favorites from './models/favorite.js';
dotenv.config();
const app = express();
app.use(
    cors(),
  );
  
app.use(express.json());

// Fetch universities API
app.get('/api/universities', async (req, res) => {
  const country = req.query.country || 'India';
  try {
    const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
      res.json(response.data);
  } catch (error) {
      res.status(500).send('Error fetching data');
  }
});
  
// Save favorite
app.post('/api/favorite', async (req, res) => {
  const { name, state_province, web_page } = req.body;

  try {
    const existingFavorite = await favorites.findOne({
      where: { name, state_province, web_page }
    });
    if (existingFavorite) {
      return res.status(409).json({ message: 'Favorite already exists in the database' });
    }
    const favorite = await favorites.create({
      name,
      state_province,
      web_page,
    });

    return res.status(201).json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error during addition:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// fetch all the favorite
app.get('/api/favorites', async(req, res) => {
  try {
    
      const  favorite= await favorites.findAll(); 
      return res.status(200).json({ favorite });
    } catch (error) {
      console.error('Error fetching favorite:', error.message);
      return res.status(500).json({ message: 'Server error' });
    }
});


sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
});
