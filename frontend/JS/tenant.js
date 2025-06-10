const tenant_url = "http://localhost:5000/tenants";

async function fetchdata() {
  fetch(tenant_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch tenant Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#tenanttable tbody");

        data.forEach(city => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${city.user_id}</td>
            <td>${city.tenant_id}</td>
            <td>${city.occupation}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });
}

document.addEventListener('DOMContentLoaded', fetchdata);

const tenantURL = "http://localhost:5000/tenants";
const tenantform = document.getElementById('tenantForm');

if (tenantform) {
  tenantform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = userForm.querySelector('button[type="submit"]');
        const loadingIndicator = document.getElementById('loadingIndicator'); 

        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex'; 
        }

    const data = {
      tenant_id: document.getElementById('tenant_id').value,
      phone_number: document.getElementById('phone_number').value,
      occupation: document.getElementById('occupation').value
    };

    try {
      const res = await fetch(tenantURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);
      alert('Tenant registered successfully!');
      tenantform.reset();
      await fetchdata();
    } catch (err) {
      console.error('Error submitting tenant:', err);
      alert('Tenant submission failed');
    }finally {
            submitButton.textContent = 'Submit';
            submitButton.disabled = false;
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
  });
}
