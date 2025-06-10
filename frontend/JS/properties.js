async function fetchAndDisplayProperties() {
    const properties_url = "http://localhost:5000/properties";
    const tbody = document.querySelector("#propertytable tbody");
    tbody.innerHTML = ''; 

    try {
        const response = await fetch(properties_url);
        if (!response.ok) {
            throw new Error("Failed to fetch Properties Data");
        }
        const data = await response.json();

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
    } catch (err) {
        console.error("Error fetching properties:", err.message);
    }
}


document.addEventListener('DOMContentLoaded', fetchAndDisplayProperties);

const propertiesForm = document.getElementById('propertyForm');
const propertyURL = "https://bxdq4q7w-5000.inc1.devtunnels.ms/properties"; 

if (propertiesForm) {
    propertiesForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = propertiesForm.querySelector('button[type="submit"]');
        const loadingIndicator = document.getElementById('loadingIndicator'); 

        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex'; 
        }

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

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to submit property.');
            }

            const result = await res.json();
            console.log(result);
            alert('Property registered successfully!');
            propertiesForm.reset();
            await fetchAndDisplayProperties(); 

        } catch (err) {
            console.error('Error submitting property:', err);
            alert(`Property submission failed: ${err.message}`);
        } finally {
            submitButton.textContent = 'Submit';
            submitButton.disabled = false;
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
    });
}