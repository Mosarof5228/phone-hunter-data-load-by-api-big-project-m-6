
//phone data load function
const phoneDataLoad = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url)
    const data = await response.json()
    displayPhone(data.data, dataLimit)
}
// enter event handler add
const inputField = document.getElementById("input-field");
inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        dataProcess(3)
    }
})
//common function
const dataProcess = (dataLimit) => {
    spinnerRun(true)
    const inputField = document.getElementById("input-field");
    const inputText = inputField.value;
    // inputField.value = '';
    phoneDataLoad(inputText, dataLimit);
}
// input search btn
document.getElementById("input-btn").addEventListener("click", function () {
    // start loader
    dataProcess(3)

})

// phone data display function
const displayPhone = (phones, dataLimit) => {
    // console.log(phones)
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerHTML = '';
    const viewAllPhone = document.getElementById("view-all-btn")
    if (dataLimit && phones.length > 3) {
        phones = phones.slice(0, 3)
        viewAllPhone.classList.remove("d-none")
    }
    else {
        viewAllPhone.classList.add('d-none')
    }

    const phoneMessage = document.getElementById("phone-message");
    // console.log(phoneMessage)
    if (phones.length === 0) {
        phoneMessage.classList.remove("d-none")
    }
    else {
        phoneMessage.classList.add("d-none");
    }
    phones.forEach((phone) => {
        // console.log(phone)
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
              <div class="col">
                    <div class="card p-4">
                        <img style="height:300px;width:300px mx-auto" src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional
                                content. This content is a little bit longer.</p>
                              <button onclick="phoneDetailsLoad('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Click for Details</button>
                        </div>
                    </div>
                </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    })
    //stop loader
    spinnerRun(false)

}

// spinner function
const spinnerRun = (isLoading) => {
    const spinner = document.getElementById("spinner");
    if (isLoading) {
        spinner.classList.remove("d-none")
    }
    else {
        spinner.classList.add("d-none")
    }

}

document.getElementById("view-all-btn").addEventListener("click", function () {
    dataProcess()
})

// phone details function
const phoneDetailsLoad = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data))

}
const displayPhoneDetails = (modalPhone) => {
    console.log(modalPhone)
    const modalTitle = document.getElementById("phone-name");
    modalTitle.innerText = modalPhone.name;
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
    <div class="d-flex justify-content-center">
    <img class="" src="${modalPhone.image}">
    </div>
    <p>Storage:${modalPhone.mainFeatures.storage}</p>
    `
}
// modal details

// phoneDataLoad("a")