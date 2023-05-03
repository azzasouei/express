const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const hour = date.getHours();
  
    if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 20) {
      next(); // Continue to the next middleware or route handler
    } else {
      res.send('Sorry, the website is only available during working hours.');
    }
  };

  app.use(workingHoursMiddleware);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
  });
  
  app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'));
  });
  
  app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
  });

  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });
  
