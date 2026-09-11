const form = document.getElementById("contactForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    });

    const result = await response.json();

    document.getElementById("responseMessage").textContent = result.message;

    form.reset();
});