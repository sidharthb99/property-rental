const properties_url = "http://localhost:5000/properties";

fetch(properties_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch Properties Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#propertytable tbody");

        data.forEach(property => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${property.property_id}</td>
        <td>${property.owner_id}</td>
        <td>${property.title}</td>
        <td>${property.description}</td>
        <td>${property.address}</td>
        <td>${property.city_id}</td>
        <td>${property.price_per_month}</td>
        <td>${property.status}</td>
        <td>${property.created_at}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });


    const propertiesForm = document.getElementById('propertyForm');
const propertyURL = "https://bxdq4q7w-5000.inc1.devtunnels.ms/properties";

if (propertiesForm) {
  propertiesForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      owner_id: document.getElementById('owner_id').value,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      address: document.getElementById('address').value,
      city_id: document.getElementById('city_id').value,
      price_per_month: document.getElementById('price_per_month').value,
      status: document.getElementById('status')?.value || 'available'
    };

    try {
      const res = await fetch(propertyURL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);
      alert('Property registered successfully!');
      propertiesForm.reset();
    } catch (err) {
      console.error('Error submitting property:', err);
      alert('Property submission failed');
    }
  });
}
