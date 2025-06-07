const tenant_url = "http://localhost:5000/bookings";

fetch(tenant_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch booking Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#bookingtable tbody");

        data.forEach(city => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${city.booking_id}</td>
            <td>${city.tenant_id}</td>
            <td>${city.property_id}</td>
            <td>${city.start_date}</td>
            <td>${city.end_date}</td>
            <td>${city.status}</td>
            <td>${city.created_at}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });



const bookingForm = document.getElementById('bookingForm');
const bookingURL = 'http://localhost:5000/booking';
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      tenant_id: document.getElementById('tenant_id').value,
      property_id: document.getElementById('property_id').value,
      start_date: document.getElementById('start_date').value,
      end_date: document.getElementById('end_date').value,
      status: document.getElementById('status').value
    };

    try {
      const response = await fetch(bookingURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Booking created successfully!');
        console.log(result);
        bookingForm.reset();
      } else {
        alert('Booking failed: ' + (result?.err || 'Unknown error'));
        console.error(result);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Check the console for details.');
    }
  });
}
