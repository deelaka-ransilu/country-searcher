document.getElementById("countryInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btnSearchOnClick();
  }
});


function btnSearchOnClick() {
  const countryName = document
    .getElementById("countryInput")
    .value.trim()
    .toLowerCase();

  if (countryName === "") {
    alert("Please enter a country name 🌍");
  } else {
    loadDataFromAPI(countryName);
  }
}

function loadDataFromAPI(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 404 || !data[0]) {
        document.getElementById("errorMessage").innerHTML = "Country not found";
        document.getElementById("countryCard").classList.add("hidden");
      } else {
        // success
        const countryFlag = data[0].flags.png;
        const commonName = data[0].name.common;
        const officialName = data[0].name.official;
        const capital = data[0].capital ? data[0].capital[0] : "N/A";
        const population = data[0].population.toLocaleString();

        document.getElementById("countryFlag").src = countryFlag;
        document.getElementById("commonName").innerHTML = `Common Name: ${commonName}`;
        document.getElementById("officialName").innerHTML = `Official Name: ${officialName}`;
        document.getElementById("capital").innerHTML = `Capital: ${capital}`;
        document.getElementById("population").innerHTML = `Population: ${population}`;

        document.getElementById("countryCard").classList.remove("hidden");
        document.getElementById("errorMessage").innerHTML = "";
      }
    });
}

