let currentPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () =>{
    try {
     await loadCharacters(currentPageUrl);
    } catch (error) {
     console.log(error);
     alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

const newImageUrls = {
  0: 'assets/corvette.webp',
  1: 'assets/Star-Destroyer.webp',
  9: 'assets/Rebel_transport.jpg'
}


async function loadCharacters(url) {
    const myContent = document.getElementById('my-content')
    myContent.innerHTML = ''; //Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((starships, index) =>{
         const card = document.createElement("div")
         card.style.backgroundImage =
         newImageUrls[index] ?
         `url('${newImageUrls[index]}')` :
         `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg')`;

     card.className = "cards";

         const characterNameBG = document.createElement("div")
         characterNameBG.className = "character-name-bg"

         const characterName = document.createElement("span")
         characterName.className = "character-name"
         characterName.innerText = `${starships.name}`

         characterNameBG.appendChild(characterName)
         card.appendChild(characterNameBG)

         card.onclick = () => {
           const modal = document.getElementById("modal")
           modal.style.visibility = "visible"

           const modalContent = document.getElementById("modal-content")
           modalContent.innerHTML = ''

           const starshipsImage = document.createElement("div")
           starshipsImage.style.backgroundImage = 
           newImageUrls[index] ?
           `url('${newImageUrls[index]}')` :
           `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg')`;
           starshipsImage.className = "character-image"

           const name = document.createElement("span")
           name.className = "starships-details"
           name.innerText = `Nome: ${starships.name}` 
           
           const model = document.createElement("span")
           model.className = "starships-details"
           model.innerText = `Modelo: ${starships.model}`

           const length = document.createElement("span")
           length.className = "starships-details"
           length.innerText = `Comprimento: ${convertLength(starships.length)}`

           const passengers = document.createElement("span")
           passengers.className = "starships-details"
           passengers.innerText = `Passageiros: ${convertPassengers(starships.passengers)}`


           modalContent.appendChild(starshipsImage)
           modalContent.appendChild(name)
           modalContent.appendChild(model)
           modalContent.appendChild(length)
           modalContent.appendChild(passengers)
           

         }

         myContent.appendChild(card)
        });

        
        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        nextButton.style.visibility = responseJson.next ? "visible" : "hidden"
        backButton.style.visibility = responseJson.previous ? "visible" : "hidden"

        currentPageUrl = url

    } catch (error){
        alert('Erro ao carregar as naves estelares')
        console.log(error)
    }
}

async function loadNextPage() {
  if(!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()

    await loadCharacters(responseJson.next)
  } catch(error) {
    console.log(error);
    alert('Erro ao carregar a próxima página')
  }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl)
      const responseJson = await response.json()
  
      await loadCharacters(responseJson.previous)
    } catch(error) {
      console.log(error);
    }
  }

  function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }

  function convertLength (length){
    if(length === "unknown") {
      return "desconhecido"
    }

    return `${length} metros`
      
  }

  function convertPassengers(passengers){
    if(passengers === "n/a"){
      return "nao disponivel"
    }else if (passengers === "unknown"){
      return "Desconhecido"
    }

    return passengers

  }

