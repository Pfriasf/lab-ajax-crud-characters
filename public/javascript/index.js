const charactersAPI = new APIHandler('http://localhost:8000');

const formValue = (name) => {
  return document.querySelector(`input[name=${name}]`).value;
};

const resetButtons = () => {
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.style.backgroundColor = "transparent"
  })
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    event.preventDefault();

    charactersAPI.getFullList();

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    let id = document.querySelector(".operation input").value;
    charactersAPI.getOneRegister(id)
    document.querySelector(".operation input").value = ""


  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault();

    let id = document.querySelector(".delete input").value;
    charactersAPI.deleteOneRegister(id);
    document.querySelector(".delete input").value = ""

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let id = document.querySelector("input[name=chr-id]").value;

    const data = {
      name: formValue("name"),
      occupation: formValue("occupation"),
      weapon: formValue("weapon"),
      cartoon: document.querySelector("input[name=cartoon]").checked,
    };

    charactersAPI.updateOneRegister(id, data);
    document.getElementById("edit-character-form").reset();


  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
      name: formValue("name-create"),
      occupation: formValue("occupation-create"),
      weapon: formValue("weapon-create"),
      cartoon: document.querySelector("input[name=cartoon-create]").checked,
    };

    charactersAPI.createOneRegister(data)
    document.getElementById("new-character-form").reset()

  })

});



let characterContainer = document.querySelector(".characters-container");

const drawCard = (data) => {

  let {
    id,
    name,
    occupation,
    cartoon,
    weapon
  } = data
  characterContainer.innerHTML += `<div class="character-info">
    <div class="id">${id}</div>
    <div class="name">${name}</div>
    <div class="occupation">${occupation}</div>
    <div class="cartoon">${cartoon}</div>
    <div class="weapon">${weapon}</div>
    </div>`

}

const drawCards = (items) => {
  characterContainer.innerHTML = ""
  items.length === undefined ? drawCard(items) :
    items.forEach(element => {
      drawCard(element)
    });
}