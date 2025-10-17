async function boletines() {
  const apiUrl = process.env.PORT ?? 'http://localhost:10000/api/boletines'

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}`)
    }

    return res.json()

  } catch (error) {
      console.error('Error al obtener boletín:', error);
      return null;
  }
}

async function ultimosBoletines() {
  const apiUrl = 'http://localhost:3000/api/boletines/ultimos'

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}`)
    }

    return res.json()

  } catch (error) {
      console.error('Error al obtener boletín:', error);
      return null;
  }
}

async function boletinCategoria(categoria = '') {
  const url = categoria
  ? `http://localhost:3000/api/boletines?categoria=${encodeURIComponent(categoria)}` 
  : 'http://localhost:3000/api/boletines'
  
  try {
    const res = await fetch(url)

    if(!res.ok) {
      throw new Error(`Error HTTP ${res.status}`)
    }

    return await res.json()

  } catch (error) {
    console.error('Error al obtener boletín', error)
  }
}

function viewBoletines(datos) {
  const boletinContainer = document.querySelector('.columna-boletin')

  boletinContainer.innerHTML = ''

  datos.forEach(boletin => {
    const div = document.createElement('div')
    div.classList.add('boletin-item')
    
    const p = document.createElement('p')
    p.textContent = `Boletín N° ${boletin.num} (${boletin.fecha})`

    const button = document.createElement('button')
    button.classList.add('btn-boletin')
    button.textContent = 'Ver documento'
    button.addEventListener('click', () => {
      window.open(`/assets/pdfs/${boletin.pdf}`, '_blank')
    })
    

    div.appendChild(p)
    div.appendChild(button)
    boletinContainer.appendChild(div)        
  });
}



export async function cargarBoletines() {
  const boletin = await boletines()

  if (boletin) {
    return viewBoletines(boletin)
  } else {
    console.error('No se pudieron cargar los boletines')
    return
  }
}

export async function cargarUtimos() {
  const boletin = await ultimosBoletines()

  if (boletin) {
    return viewBoletines(boletin)
  } else {
    console.error('No se pudieron cargar los boletines')
    return
  }
}


export async function cargarCategorias(categoria) {
  const boletin = await boletinCategoria(categoria)

  if (boletin) {
    return viewBoletines(boletin)
  } else {
    console.error('')
  }
}


