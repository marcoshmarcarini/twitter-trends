const router = require('express').Router();
const Twitter = require('twitter')


const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TITTER_ACCESS_SECRET,
})


// Aqui vou pegar os Trending Topics
router.get('/trends', async (req, res, next) => {
  try {
    const id = req.query.woeid
    const trends = await client.get('trends/place.json', {
      id,
    })
    res.send(trends);
  } catch (error) {
      next(error)
    }
});


// Esta rota pega o WOEID para uma localização particular (latitude e longitude)
router.get('/near-me', async (req, res, next) => {
  try {
    const {lat, long} = req.query
    const response = await client.get('/trends/closest.json', {
      lat, long
    })
    res.send(response)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
