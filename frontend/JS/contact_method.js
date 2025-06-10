const tenant_url = "http://localhost:5000/contact_method";

async function fetchdata() {
  fetch(tenant_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch payment Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#contact_methodtable tbody");

        data.forEach(city => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${city.method_id}</td>
            <td>${city.method_name}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });
}

document.addEventListener('DOMContentLoaded', fetchdata);

const contactMethodForm = document.getElementById('contactMethodForm');
const contactMethodURL = 'http://localhost:5000/contact_method';

if (contactMethodForm) {
  contactMethodForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactMethodForm.querySelector('button[type="submit"]');
        const loadingIndicator = document.getElementById('loadingIndicator'); 

        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex'; 
        }
    const data = {
      method_name: document.getElementById('method_name').value
    };

    try {
      const response = await fetch(contactMethodURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Contact method added successfully!');
        console.log(result);
        contactMethodForm.reset();
        await fetchdata();
      } else {
        alert('Failed to add contact method: ' + (result?.err || 'Unknown error'));
        console.error(result);
      }
    } catch (error) {
      console.error('Error submitting contact method:', error);
      alert('Error submitting contact method. Check the console for details.');
    }finally {
            submitButton.textContent = 'Submit';
            submitButton.disabled = false;
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
  });
}
