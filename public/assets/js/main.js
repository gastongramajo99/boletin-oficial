import { cargarUtimos, cargarBoletines, cargarCategorias } from './fetchData.js'
import { menuToggle, navItem, activeFilter } from './toggle.js'


menuToggle()
navItem()



const page = document.body.id

if (page === 'index') {
    cargarUtimos()

    const btnVer = document.querySelector('.btn-ver')

    btnVer.addEventListener('click', () => {
        location.href = '/boletin.html'
    })
} 


if (page === 'boletin') {
    cargarBoletines()
    
    document.querySelectorAll('.filter').forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.dataset.categoria
            cargarCategorias(categoria)
        })
    })

    activeFilter()
} 








    







