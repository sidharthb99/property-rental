const city_url = "http://localhost:5000/cities";

async function fetchdata() {
  fetch(city_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch city Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#citytable tbody");

        data.forEach(city => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${city.city_id}</td>
            <td>${city.name}</td>
            <td>${city.state}</td>
            <td>${city.country}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });
}

document.addEventListener('DOMContentLoaded', fetchdata);

const cityForm = document.getElementById('cityForm');
const cityURL = 'http://localhost:5000/cities';

if (cityForm) {
  cityForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = cityForm.querySelector('button[type="submit"]');
    const loadingIndicator = document.getElementById('loadingIndicator');

    submitButton.textContent = '...Submitting';
    submitButton.disabled = true;

    if(loadingIndicator){
      loadingIndicator.style.display = 'flex';
    }

    const data = {
      name: document.getElementById('name').value,
      state: document.getElementById('state').value,
      country: document.getElementById('country').value
    };

    try {
      const res = await fetch(cityURL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);
      alert('City registered successfully!');
      cityForm.reset();
      await fetchdata();
    } catch (err) {
      console.error('Error submitting city:', err);
      alert('City submission failed');
    }finally{
      submitButton.textContent = 'Submit';
    submitButton.disabled = false;

    if(loadingIndicator){
      loadingIndicator.style.display = 'none';
    }
    }
  });
}
