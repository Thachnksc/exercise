// --- LOGIN ---
const loginForm = document.getElementById("loginForm");
const resultDiv = document.getElementById("result");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: username, pass: password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "users.html"; // chuyển sang users
            } else {
                resultDiv.innerHTML = "Login failed: " + data.message;
            }
        } catch (err) {
            console.error(err);
            resultDiv.innerHTML = "Error connecting to server";
        }
    });
}

// --- USERS ---
const userList = document.getElementById("userList");
if (userList) {
    async function fetchUsers() {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first");
            window.location.href = "login.html";
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/users", {
                headers: { "Authorization": "Bearer " + token }
            });

            const data = await res.json();

            if (res.ok) {
                userList.innerHTML = "";
                data.forEach(u => {
                    const li = document.createElement("li");
                    li.textContent = `${u.id} - ${u.username} - ${u.role}`;
                    userList.appendChild(li);
                });
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }
    }

    fetchUsers();
}

// --- LOGOUT ---
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
}
