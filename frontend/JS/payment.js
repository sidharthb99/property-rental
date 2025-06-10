const tenant_url = "http://localhost:5000/payments";
async function fetchdata() {
  
fetch(tenant_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch payment Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#paymenttable tbody");

        data.forEach(city => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${city.payment_id}</td>
            <td>${city.booking_id}</td>
            <td>${city.amount}</td>
            <td>${city.payment_date}</td>
            <td>${city.payment_method}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });
}

document.addEventListener('DOMContentLoaded', fetchdata);
const paymentForm = document.getElementById('paymentForm');
const paymentURL = 'http://localhost:5000/payment';
if (paymentForm) {
  paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = paymentForm.querySelector('button[type="submit"]');
        const loadingIndicator = document.getElementById('loadingIndicator'); 

        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex'; 
        }

    const data = {
      booking_id: document.getElementById('booking_id').value,
      amount: document.getElementById('amount').value,
      payment_date: document.getElementById('payment_date').value,
      payment_method: document.getElementById('payment_method').value
    };

    try {
      const response = await fetch(paymentURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Payment recorded successfully!');
        console.log(result);
        paymentForm.reset();
        await fetchdata();
      } else {
        alert('Payment failed: ' + (result?.err || 'Unknown error'));
        console.error(result);
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Error submitting payment. Check the console for details.');
    }finally {
            submitButton.textContent = 'Submit';
            submitButton.disabled = false;
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
  });
}
