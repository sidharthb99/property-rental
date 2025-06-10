const users_url = "http://localhost:5000/users";

async function fetchdata() {
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
      `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.log(err.message);
    });
}


document.addEventListener('DOMContentLoaded', fetchdata);

const userForm = document.getElementById('userForm');
const userURL = "http://localhost:5000/users";

if (userForm) {
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
const submitButton = userForm.querySelector('button[type="submit"]');
        const loadingIndicator = document.getElementById('loadingIndicator'); 

        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex'; 
        }

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
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
            await fetchdata();
        } catch (err) {
            console.error('Error submitting user:', err);
            alert('User submission failed');
        }finally {
            submitButton.textContent = 'Submit';
            submitButton.disabled = false;
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
    });
}
