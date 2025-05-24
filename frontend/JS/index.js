const form = document.getElementById('userForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name : form.name.value,
        email: form.email.value,
        password: form.password.value,
        role: form.role.value
    };

    const res = await fetch('https://bxdq4q7w-5000.inc1.devtunnels.ms/users', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(data)
    })

    const result = await res.json();
    console.log(result);
    alert('User registered successfully!');
    form.reset();
});



const propertiesForm = document.getElementById('propertyForm');

const propertyURL = "https://bxdq4q7w-5000.inc1.devtunnels.ms/properties";

propertiesForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = {
            owner_id : propertiesForm.owner_id.value,
            title : propertiesForm.title.value,
            description : propertiesForm.description.value,
            address : propertiesForm.address.value,
            city_id : propertiesForm.city_id.value,
            price_per_month : propertiesForm.price_per_month.value
    };

    const res = await fetch(propertyURL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(data)
    })

    const result = await res.json();
    console.log(result);
    alert('Property registered successfully!');
    form.reset();
});