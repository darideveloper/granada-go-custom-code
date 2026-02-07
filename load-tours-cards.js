async function loadTours() {
  const toursWrapper = document.querySelector("#tours-cards")
  if (!toursWrapper) return

  try {
    // 1. Obtener los datos del JSON
    const response = await fetch("https://raw.githubusercontent.com/darideveloper/granada-go-tours/refs/heads/main/public/services.json")
    const data = await response.json()

    // 2. Identificar la tarjeta inicial que servirá de plantilla
    const templateCard = toursWrapper.querySelector("div")
    if (!templateCard) return

    // Limpiamos el contenedor para evitar duplicados si la función se llama varias veces
    toursWrapper.innerHTML = ""

    // 3. Iterar sobre los elementos del JSON
    data.forEach(tour => {
      // Clonamos la plantilla
      const cardClone = templateCard.cloneNode(true)

      // Reemplazar el H3 con el "title"
      const titleElem = cardClone.querySelector("h3")
      if (titleElem) titleElem.textContent = tour.title

      // Reemplazar el div de descripción con el "subtitle"
      const subtitleElem = cardClone.querySelector('[data-elementor-setting-key="infocard_description"]')
      if (subtitleElem) subtitleElem.textContent = tour.subtitle

      // Reemplazar el editor de texto con el primer precio de "options"
      const priceElem = cardClone.querySelector('[data-widget_type="text-editor.default"]')
      if (priceElem && tour.options && tour.options.length > 0) {
        const firstPrice = tour.options[0].price
        // Si el precio es un número, podrías añadir el símbolo de moneda
        priceElem.textContent = typeof firstPrice === 'number' ? `${firstPrice}€` : firstPrice
      }

      // Añadir la tarjeta procesada al contenedor
      toursWrapper.appendChild(cardClone)
    })

  } catch (error) {
    console.error("Error cargando los tours:", error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTours()
})