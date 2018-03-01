const express = require('express')
const Sequelize = require('sequelize');
//const db = require('./database')
//now
const db = require('./models')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 3030

const {Player} = db

//before
// var Player = db.define('Player', {
//   name: Sequelize.STRING,
//   score: Sequelize.INTEGER
// }, {
//   tableName: 'Players',
//   //timestamps: false
// })






app.get('/', (req, res) => {
  res.json({ message: 'Yo!' })
})

app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})


//app.get('/houses/:id', (request, response) => {
//  const houseId = request.params.id
//  House.findById(houseId).then(house => {
//    response.send(house)
//  })
//})

app.get('/players', (request, response) => {
//before
//  Player.findAll().then(players => {
//    response.send({ players })
//  })
  const players = Player
    .findAll()
    .then((players) => {
      response.json(players)
    })
    .catch((err) => {
      console.error(err)
      response.status = 500
      response.json({message: 'Oops'})
    })
})

app.get('/players/:id', (req, res) => {
  Player.findById(req.params.id)
  .then(player => {
    if (player) {
      res.json(player)
    } else {
      res.status = 404
      res.json({message:"Player not found!"})
    }
  })
  .catch((err) => {
    console.error(err)
    response.status = 500
    response.json({message: 'Oops'})
  })
})

app.put('/players/:id', (req, res) => {
  const productId = Number(req.params.id)
  console.log(productId)
  //const updates = req.body
  const updates = req.body
  console.log(updates)

  // find the product in the DB
  Player.findById(req.params.id)
    .then(entity => {
      // change the product and store in DB
      console.log("fjgku");
      return entity.update(updates)
    })
    .then(final => {
      // respond with the changed product and status code 200 OK
      console.log("edfgh");
      res.send(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })

})


app.patch('/players/:id', (req, res) => {
  const players = Player
    .findById(req.params.id)
    .then((player) => {
      if (player) {

        player.score = req.body.score
        player
          .save()
          .then((updatedPlayer) => {
            res.json(updatedPlayer)
          })
          .catch((err) => {
            res.status = 422
            res.json({ message: err.message })
          })
      } else {
        res.status = 404
        res.json({ message: 'Player not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status = 500
      res.json({ message: 'Oops! There was an error getting the player. Please try again' })
    })
})
