<!DOCTYPE html>
<html>
  <head>
    <title>Dog API Website</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
    <h1>Dog API Website</h1>
    <p>Welcome to our website that uses the Dog API to display information about dogs!</p>
    <form>
      <label for="breed-search">Search for a dog breed:</label>
      <input type="text" id="breed-search" name="breed-search">
      <button type="submit">Search</button>
    </form>
    <div id="dog-image-container"></div>
    <ul id="dog-breed-list"></ul>
    <canvas id="dog-breed-chart"></canvas>
    <script>
      const breedSearchForm = document.querySelector('form');
      const dogImageContainer = document.getElementById('dog-image-container');
      const dogBreedList = document.getElementById('dog-breed-list');
      const dogBreedChart = document.getElementById('dog-breed-chart').getContext('2d');
      let breedData = {};

      breedSearchForm.addEventListener('submit', event => {
        event.preventDefault();
        const breedSearchInput = document.getElementById('breed-search').value;
        const breedSearchUrl = 'https://dog.ceo/api/breeds/list/all';
        fetch(breedSearchUrl)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'error') {
              dogImageContainer.innerHTML = `<p>${data.message}</p>`;
            } else {
              dogImageContainer.innerHTML = `<img src="${data.message}" alt="${breedSearchInput}">`;
            }
          })
          .catch(error => console.error(error));

        const breedListUrl = 'https://dog.ceo/api/breeds/${breedSearchInput}/list`;
        fetch(breedListUrl)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'error') {
              dogBreedList.innerHTML = `<p>${data.message}</p>`;
            } else {
              const breeds = data.message;
              const breedListItems = Object.keys(breeds).map(breed => `<li>${breed}</li>`).join('');
              dogBreedList.innerHTML = breedListItems;
              breedData = breeds;
              updateBreedChart();
            }
          })
          .catch(error => console.error(error));
      });

      function updateBreedChart() {
        const breedLabels = Object.keys(breedData);
        const breedDataValues = Object.values(breedData).map(subBreeds => subBreeds.length);
        const breedChart = new Chart(dogBreedChart, {
          type: 'bar',
          data: {
            labels: breedLabels,
            datasets: [{
              label: 'Number of Sub-Breeds',
              data: breedDataValues,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    </script>
  </body>
</html>
