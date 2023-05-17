document.addEventListener('DOMContentLoaded', () => {
    //first fetch to render the dogs
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then((dogs) => {
        console.log(dogs)
        for (const dog of dogs) {
            renderDog(dog)
        }
    })
    //function to render the dogs
    function renderDog(dog) {
    const tr = document.createElement('tr')
    const name = document.createElement('td')
    name.textContent = dog.name
    const breed = document.createElement('td')
    breed.textContent = dog.breed
    const sex = document.createElement('td')
    sex.textContent = dog.sex
    const buttonData = document.createElement('td')
    const button = document.createElement('button')
    button.textContent = 'Edit'
    buttonData.appendChild(button)
    tr.append(name, breed, sex, buttonData)
    document.querySelector('#table-body').appendChild(tr)
    // event listener for the click on the edit button which populates the form with the current dog
    button.addEventListener('click', () => {
    document.querySelectorAll('input')[0].value = name.textContent
    document.querySelectorAll('input')[0].setAttribute('dogId', dog.id)
    document.querySelectorAll('input')[1].value = breed.textContent
    document.querySelectorAll('input')[2].value = sex.textContent
    })
    }
    const form = document.querySelector('form')
    // the patch request on the submit event
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const newDog = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }
        const options = {
            method: 'PATCH',
            headers:  {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newDog),
        }
        fetch(`http://localhost:3000/dogs/${e.target.name.getAttribute('dogId')}`, options)
    .then(resp => resp.json())
    .then((data) => {
        document.querySelector('#table-body').textContent = ''
        fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then((dogs) => {
        console.log(dogs)
        for (const dog of dogs) {
            renderDog(dog)
        }
    })
    })
    })
})
