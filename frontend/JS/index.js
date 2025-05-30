
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, role })
    });

    if (!response.ok) {
      throw new Error('User creation failed');
    }

    const data = await response.json();
    document.getElementById('message').textContent = `User ${data.user.name} created successfully!`;
    console.log(result);
    alert('Property registered successfully!');
    const userform = document.getElementById('userForm');
    userform.reset();
  } catch (err) {
    console.error('Error submitting property:', err);
    alert('Property submission failed');
  }
});

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


// tenants form
const tenantURL = "http://localhost:5000/tenants";
const tenantform =  document.getElementById('tenantForm');

if(tenantform){
  tenantform.addEventListener('submit', async(e) => {
    e,preventDefault();

    const data = {
      tenant_id: document.getElementById('tenant_id'),
      property_id: document.getElementById('property_id'), 
      start_date: document.getElementById('start_date'), 
      end_date: document.getElementById('end_date'), 
      status: document.getElementById('status')
    };

    try {
      const res = await fetch(tenantURL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      console.log(result);
      alert('Tenant registered successfully!');
      cityForm.reset();
    } catch (err) {
      console.error('Error submitting Tenant:', err);
      alert('Tenant submission failed');
    }
  });
}

// ---Booking--



const tForm = document.getElementById('tenantForm'); 