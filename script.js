document.addEventListener("DOMContentLoaded", () => {
  const fetchNewsButton = document.getElementById('fetchNewsButton');
  const categorySelect = document.getElementById('categorySelect');

  fetchNewsButton.addEventListener('click', () => {
    const category = categorySelect.value;
    fetchNewsData(category);
  });

  function fetchNewsData(category) {
    fetch(
      `https://newsdata.io/api/1/news?apikey=pub_655967cd55f561f25e849e4f950e0d91921d6&category=${category}&language=fr&size=2`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error("Invalid data format");
        }
        const container = document.querySelector(".test");
        container.innerHTML = ""; // Clear any existing content

        data.results.forEach((article) => {
          const articleElement = document.createElement("div");
          articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
          `;
          container.appendChild(articleElement);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Fetch weather data
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=paris&appid=20dc5ed9ac0e76fd63318305973434c1"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.main || typeof data.main.temp === "undefined") {
        throw new Error("Invalid data format");
      }
      const weatherContainer = document.querySelector(".weather");
      const temperature = data.main.temp - 273.15; // Convert from Kelvin to Celsius
      weatherContainer.innerHTML = `Temperature: ${temperature.toFixed(2)}°C`;
    })
    .catch((error) => console.error("Error fetching weather data:", error));
});