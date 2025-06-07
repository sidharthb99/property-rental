// User Form
const userForm = document.getElementById('userForm');
const userURL = "http://localhost:5000/users";

if (userForm) {
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      role: document.getElementById('role').value
    };

    try {
      const res = await fetch(userURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('User creation failed');
      }

      const result = await res.json();
      console.log(result);


      const userName = result.name || result.user?.name || "User";

      // document.getElementById('message').textContent = `${userName} created successfully!`;
      alert('User registered successfully!');
      userForm.reset();
    } catch (err) {
      console.error('Error submitting user:', err);
      alert('User submission failed');
    }
  });
}


// --- Properties Form ---
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

// --- Owners Form ---
const ownersForm = document.getElementById('ownerForm');
const ownersURL = 'http://localhost:5000/owners';

if (ownersForm) {
  ownersForm.addEventListener('submit', async (e) => {
    e.preventDefault();

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
    } catch (err) {
      console.error('Error submitting owner:', err);
      alert('Owner submission failed');
    }
  });
}

// --- Cities Form ---
const cityForm = document.getElementById('cityForm');
const cityURL = 'http://localhost:5000/cities';

if (cityForm) {
  cityForm.addEventListener('submit', async (e) => {
    e.preventDefault();

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
    } catch (err) {
      console.error('Error submitting city:', err);
      alert('City submission failed');
    }
  });
}



// Tenants form
const tenantURL = "http://localhost:5000/tenants";
const tenantform = document.getElementById('tenantForm');

if (tenantform) {
  tenantform.addEventListener('submit', async (e) => {
    e.preventDefault();

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
    } catch (err) {
      console.error('Error submitting tenant:', err);
      alert('Tenant submission failed');
    }
  });
}

// ---Booking--
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

// ----payment-----
const paymentForm = document.getElementById('paymentForm');
const paymentURL = 'http://localhost:5000/payment';
if (paymentForm) {
  paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

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
      } else {
        alert('Payment failed: ' + (result?.err || 'Unknown error'));
        console.error(result);
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Error submitting payment. Check the console for details.');
    }
  });
}

// ---contact_method--- 

const contactMethodForm = document.getElementById('contactMethodForm');
const contactMethodURL = 'http://localhost:5000/contact_method';

if (contactMethodForm) {
  contactMethodForm.addEventListener('submit', async (e) => {
    e.preventDefault();

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
      } else {
        alert('Failed to add contact method: ' + (result?.err || 'Unknown error'));
        console.error(result);
      }
    } catch (error) {
      console.error('Error submitting contact method:', error);
      alert('Error submitting contact method. Check the console for details.');
    }
  });
}

// ---contactForm---

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

// ---property-status-log---

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
