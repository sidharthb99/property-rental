const tenant_url = "http://localhost:5000/contact";

fetch(tenant_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch contact Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#contacttable tbody");

        data.forEach(city => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${city.contact_id}</td>
            <td>${city.user_id}</td>
            <td>${city.method_id}</td>
            <td>${city.contact_value}</td>
            <td>${city.address}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });



const contactForm = document.getElementById('contactForm');
const contactURL = 'http://localhost:5000/contacts';

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      user_id: document.getElementById('user_id').value,
      method_id: document.getElementById('method_id').value,
      contact_value: document.getElementById('contact_value').value,
      address: document.getElementById('address').value
    };

    try {
      const response = await fetch(contactURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Contact added successfully!');
        console.log(result);
        contactForm.reset();
      } else {
        alert('Failed to add contact: ' + (result?.err || 'Unknown error'));
        console.error(result);
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('Error submitting contact. Check the console for details.');
    }
  });
}
