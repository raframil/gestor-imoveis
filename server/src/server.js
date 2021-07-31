require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('Successfully connected to database.')
    }
  ).catch(err => console.error(err))

app.use(express.json())

app.get('/healthcheck', (req, res) => {
    res.status(200).json({ title: 'Ok' })
})

// app.use('/api', router)
app.listen(port, () => console.log(`Express dev server started on port ${port}`))