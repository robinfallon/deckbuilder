require('dotenv').config(); // this will read the .env file, if it exists

const { PORT = 3000, WEATHER_KEY } = process.env;


//const WEATHER_KEY = process.env.WEATHER_KEY

const express = require('express');
const server = express();
const axios = require('axios');

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

/*---   PREVIOUS CODE
server.post('/job-search', (req, res) => {
    res.send({
      searchData: req.body,
      status: "PENDING",
    })
});   ---*/ 


/*--- COWSAY ---*/  
const cowsay = require('cowsay');
const Quote = require('inspirational-quotes')

// Create a new endpoint at '/cowspiration':
server.get('/cowspiration', (req, res) => {
  const {text, author} = Quote.getQuote();

  const cow = cowsay.say({
    text: `${text}\n\n- ${author}`,
    W: 80,
  });

  res.send({cow});
});


/*--- NEW CODE ---*/  
// 1. Upgrade the function to be async:
server.post('/job-search', async (req, res) => {
    try {
      // 2. Read description and fulltime from req.body:
      const { description, fulltime } = req.body;
      // 3. Turn it into a valid URL:
      const URL = `https://jobs.github.com/positions.json?${
        description ? `description=${ description }&` : ''
      }${
        fulltime ? 'fulltime=true' : ''
      }`;
      // 4. Await axios.get request:
      const { data } = await axios.get(URL);
      // 5. Return results:
      res.send({ results: data });
    } catch (error) {
      res.send({ error });
    }
});


//-------MODULE 3--------//

server.get('/weather', async (req, res) => {  
    try {
        // // build URL from key AND query strings:
      const { lat, lon } = req.query;
      const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${ lat }&lon=${ lon }&appid=${ WEATHER_KEY }`;
  
      // make axios request:
      const { data } = await axios.get(URL);
      // send back data, or... 
      res.send({ results: data });
    } catch (error) {
        // ...send back error:
      res.send({ error });
    }

});

/*
server.listen(3000, () => {
console.log('I am listening...');
});
*/
/////////////////////////////////////////////////////////
// FIXING OUR PORT

//const { PORT = 3000 } = process.env;

server.listen(PORT, () => {
  // stuff
  console.log('I am listening...');
});



