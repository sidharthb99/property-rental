const owner_url = "http://localhost:5000/owners";

async function fetchdata() {
  fetch(owner_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch owners Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#ownertable tbody");

        data.forEach(owner => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${owner.owner_id}</td>
            <td>${owner.phone_number}</td>
            <td>${owner.bio}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });
}

document.addEventListener('DOMContntLoaded', fetchdata);

const ownersForm = document.getElementById('ownerForm');
const ownersURL = 'http://localhost:5000/owners';

if (ownersForm) {
  ownersForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = ownersForm.querySelector('button[type="submit"]');
        const loadingIndicator = document.getElementById('loadingIndicator'); 

        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex'; 
        }

    const data = {
      owner_id: document.getElementById('owner_id').value,
      phone_number: document.getElementById('phone_number').value,
      bio: document.getElementById('bio').value
    };

    try {
      const res = await fetch(ownersURL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);
      alert('Owner registered successfully!');
      ownersForm.reset();
      await fetchdata();
    } catch (err) {
      console.error('Error submitting owner:', err);
      alert('Owner submission failed');
    }finally {
            submitButton.textContent = 'Submit';
            submitButton.disabled = false;
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
  });
}
