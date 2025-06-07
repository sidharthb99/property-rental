const users_url = "http://localhost:5000/users";

fetch(users_url)
    .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch Users Data");
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#usertable tbody");

        data.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${user.user_id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });


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
