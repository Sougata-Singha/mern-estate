import express from 'express'

const app = express()

app.listen(3000, () => {
    console.log("Listening to http://localhost:3000")
})