document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("go-back").addEventListener("click", function () {
    window.history.back();
  });

  document.getElementById("go-forward").addEventListener("click", function () {
    window.history.forward();
  });

  document
    .getElementById("load-content")
    .addEventListener("click", function () {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML =
        "<p>New content loaded at " + new Date().toLocaleTimeString() + "</p>";
      window.history.pushState({ html: contentDiv.innerHTML }, "", "");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveData");
  const loadButton = document.getElementById("loadData");
  const resultDiv = document.getElementById("result");
  const dataInput = document.getElementById("dataInput");

  saveButton.addEventListener("click", function () {
    localStorage.setItem("myData", dataInput.value);
    resultDiv.innerHTML = "<p>Data saved!</p>";
  });

  loadButton.addEventListener("click", function () {
    const savedData = localStorage.getItem("myData");
    if (savedData) {
      resultDiv.innerHTML = "<p>Loaded Data: " + savedData + "</p>";
    } else {
      resultDiv.innerHTML = "<p>No data found in Local Storage.</p>";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const locationButton = document.getElementById("getLocation");
  const locationDiv = document.getElementById("location");

  locationButton.addEventListener("click", function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          locationDiv.innerHTML = `<p>Latitude: ${lat} <br> Longitude: ${lon}</p>`;
        },
        function (error) {
          locationDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        }
      );
    } else {
      locationDiv.innerHTML =
        "<p>Geolocation is not supported by your browser.</p>";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const getCountryInfoButton = document.getElementById("getCountryInfo");
  const countryResultDiv = document.getElementById("countryResult");
  const countryInput = document.getElementById("countryInput");

  getCountryInfoButton.addEventListener("click", function () {
    const countryName = countryInput.value;
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data[0]) {
          const country = data[0];
          countryResultDiv.innerHTML = `<p><strong>Name:</strong> ${country.name.common}</p>
                                                  <p><strong>Population:</strong> ${country.population}</p>
                                                  <p><strong>Region:</strong> ${country.region}</p>
                                                  <p><strong>Capital:</strong> ${country.capital}</p>`;
        } else {
          countryResultDiv.innerHTML = `<p>Country information not found for ${countryName}.</p>`;
        }
      })
      .catch((error) => {
        countryResultDiv.innerHTML = `<p>Error fetching country data: ${error.message}</p>`;
      });
  });
});
