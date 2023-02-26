
document.querySelector(".findbutton").addEventListener('click', getFetch);
document.querySelector(".resetbutton").addEventListener('click', cleanPage);
document.querySelector(".addDetailsButton").addEventListener('click', addDetails);
document.querySelector(".submitDetailsButton").addEventListener('click', submitDetailsAndAddToLocalStorage);
document.querySelector(".cleanLocalStorageButton").addEventListener('click', clearLocalStorage)
function getFetch() {
  const choice = document.querySelector('input').value;
  const url = `https://openlibrary.org/isbn/${choice}.json`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('book', data.title);
      document.querySelector(".title").innerText = `Title: ${localStorage.getItem('book')}`;
      document.querySelector(".title").style.color= "#012362";
      document.querySelector(".numofpages").innerText = `Number of pages: ${data.number_of_pages}`;
      document.querySelector(".numofpages").style.color= "#012362";
      document.querySelector(".publisher").innerText = `Publisher: ${data.publishers}`;
      document.querySelector(".publisher").style.color= "#012362";
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

function cleanPage() {
  let title = document.querySelector(".title");
  let numOfPages = document.querySelector(".numofpages");
  let publishers = document.querySelector(".publisher");
  
  title.innerHTML = "";
  numOfPages.innerHTML = "";
  publishers.innerHTML = "";
  
     
}



 function addDetails() {
  const div = document.querySelector(".addDetailsContainer");

  const inputDate = document.createElement("input");
  inputDate.setAttribute("type", "date");
  inputDate.className = "inputDate";
  inputDate.id = "dateInput"; // set id for input

  const labelDate = document.createElement("label");
  labelDate.setAttribute("for", "dateInput"); // set for attribute to match input id
  labelDate.textContent = "Enter Date:"; // set label text
  div.appendChild(labelDate);
  div.appendChild(inputDate);

  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.className = "inputName";
  inputName.id = "nameInput"; // set id for input

  const labelName = document.createElement("label");
  labelName.setAttribute("for", "nameInput"); // set for attribute to match input id
  labelName.textContent = "Enter Name:"; // set label text
  div.appendChild(labelName);
  div.appendChild(inputName);
}

  

function submitDetailsAndAddToLocalStorage() {
    const inputDateValue = document.querySelector(".inputDate").value;
    const inputNameValue = document.querySelector(".inputName").value;
    const bookTitle = localStorage.getItem("book");
  
    // Get existing book details from local storage
    const details = getDetailsFromLocalStorage();
  
    // Add the new details to the array
    details.push({ date: inputDateValue, name: inputNameValue, book: bookTitle });
  
    // Save the updated details array to local storage
    localStorage.setItem("details", JSON.stringify(details));
  
    // Render the details table
    renderDetailsTable(details);
  }
  
  

function getBooksFromLocalStorage() {
    const books = JSON.parse(localStorage.getItem("books"));
    if (books) {
      return books;
    } else {
      return [];
    }
  }

  function renderBookTable(books) {
   const tbody = document.querySelector("#bookTable tbody");
    if (!tbody) {
      return;
     }
     tbody.innerHTML = "";
     for (let i = 0; i < books.length; i++) {
       const row = document.createElement("tr");
       const titleCell = document.createElement("td");
       const ownerCell = document.createElement("td");
       const dateCell = document.createElement("td");
      titleCell.textContent = books[i].title;
       ownerCell.textContent = books[i].owner;
       dateCell.textContent = books[i].dateBorrowed;
       row.appendChild(titleCell);
       row.appendChild(ownerCell);
       row.appendChild(dateCell);
       tbody.appendChild(row);
     }
   }


  

  function renderDetailsTable(details) {
    const tbody = document.querySelector("#detailsTable tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < details.length; i++) {
      const row = document.createElement("tr");
      const dateCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const bookCell = document.createElement("td");
      dateCell.textContent = details[i].date;
      nameCell.textContent = details[i].name;
      bookCell.textContent = details[i].book;
      row.appendChild(dateCell);
      row.appendChild(nameCell);
      row.appendChild(bookCell);
      tbody.appendChild(row);
    }
  }

  function getDetailsFromLocalStorage() {
    const details = JSON.parse(localStorage.getItem("details"));
    if (details) {
      return details;
    } else {
      return [];
    }
  }
  
  
  function clearLocalStorage(){
   const confirmed=  confirm("This will delete the data permanently and it will not be possible to retrieve again")
    if (confirmed) {
      localStorage.clear()
      renderDetailsTable([])
      const inputDate = document.querySelector(".inputDate");
      const inputName = document.querySelector(".inputName");
      inputDate.value= ""
      inputName.value= "";
    }}
    

  renderDetailsTable(getDetailsFromLocalStorage());
