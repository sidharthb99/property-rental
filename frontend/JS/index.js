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

      document.getElementById('message').textContent = `${userName} created successfully!`;
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



const tForm = document.getElementById('tenantForm'); 