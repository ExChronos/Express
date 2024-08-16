const express = require('express')

const app = express()

const PORT = process.env.PORT || 7000

app.get('/:name', (req, res) => {
    const {name} = req.params

    res.json({message: `Hello ${name}!!!`})
})

app.listen(PORT, () => {
    console.log(`Server listening port : ${PORT}`);
    
})