import express from 'express'
import { randomUUID } from 'node:crypto'

import boletines from './boletines.json' with {type: "json"}
import { validarBoletin } from './schemas/boletines.js'
import { error } from 'node:console'

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.disable('x-powered-by')

app.get('/api/boletines/ultimos', (req, res) => {
    const ultimos = boletines.slice(-6).reverse()

    res.json(ultimos)
})

app.get('/api/boletines', (req, res) => {
    const { num, categoria, fecha } = req.query

    if (num) {
        const numFilter = boletines.filter(b => b.num.toLowerCase() === num.toLowerCase())
        return res.json(numFilter)
    }

    if (categoria) {
        const categoriaFilter = boletines.filter(b => b.categoria.toLowerCase() === categoria.toLowerCase())
        return res.json(categoriaFilter)
    }

    if (fecha) {
        const fechaFilter = boletines.filter(b => b.fecha.toLowerCase() === fecha.toLowerCase())
        return res.json(fechaFilter)
    }

    const boletin = boletines.reverse()

    res.json(boletin)
})

app.get('/api/boletines/:id', (req, res) => {
    const { id } = req.params

    const boletinIndex = boletines.findIndex(b => b.id === id)

    if (boletinIndex === -1) {
        return res.status(404).json({message: "Not found"})
    }

    const boletinFilter = boletines[boletinIndex]

    res.json(boletinFilter)

})

app.post('/api/boletines', (req, res) => {
    const result = validarBoletin(req.body)

    if (result.error) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newBoletin = {
        id: randomUUID(),
        ...result.data
    }

    boletines.push(newBoletin)

    res.status(201).json(newBoletin)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server escuchando en http://localhost:${PORT}`)
})