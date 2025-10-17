export function menuToggle() { 
    const abrir = document.querySelector('#abrir')
    const cerrar = document.querySelector('#cerrar')
    const nav = document.querySelector('#nav')


    abrir.addEventListener('click', () => {
        nav.classList.add('visible')
    })

    cerrar.addEventListener('click', () => {
        nav.classList.remove('visible')
    })
}

export function navItem() {
    const post = document.body.id

    if (post === 'index') document.querySelector('#inicio').classList.add('activo')
    if (post === 'boletin') document.querySelector('#boletines').classList.add('activo')
    if (post === 'about') document.querySelector('#acerca').classList.add('activo')

}


export function activeFilter() {
    const botones = document.querySelectorAll('.filter')
    const todos = document.querySelector('button[data-categoria=""]')

    todos.classList.add('active-filter')

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            botones.forEach(b => b.classList.remove('active-filter'))

            boton.classList.add('active-filter')
        })
    })
}