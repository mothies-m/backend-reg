const express = require('express')
const app = express()
const router = require('./routes')

app.use('/api', router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})

module.exports = app;