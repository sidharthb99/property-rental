const tenant_url = "http://localhost:5000/property_status_logs";

fetch(tenant_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch propety_status_logs Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#property_statustable tbody");

        data.forEach(city => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${city.log_id}</td>
            <td>${city.property_id}</td>
            <td>${city.status}</td>
            <td>${city.changed_at}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });



const propertyStatusForm = document.getElementById('propertyStatusForm');
const statusLogURL = 'http://localhost:5000/property_status_log'; 

if (propertyStatusForm) {
  propertyStatusForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      property_id: document.getElementById('property_id').value,
      status: document.getElementById('status').value
    };

    try {
      const res = await fetch(statusLogURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert('Property status logged successfully!');
        console.log(result);
        document.getElementById('message').textContent = `Status logged for Property ID ${result.property_id}`;
        propertyStatusForm.reset();
      } else {
        throw new Error(result?.err || 'Unknown error');
      }
    } catch (err) {
      console.error('Error submitting status log:', err);
      alert('Failed to log property status');
    }
  });
}
