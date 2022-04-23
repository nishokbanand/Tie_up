window.onload = function () {
  document.querySelector("login-form").addEventListener("submit", handleSubmit);
};
async function handleSubmit(e) {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const user = {
    email: email,
    password: password,
  };
  const response = fetch("http://localhost:4000/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await (await response).json();
  if (data.user) {
    localStorage.setItem("token", data.user);
    window.location.href = "http://localhost:3000/";
  } else {
    alert("Invalid Credentials");
  }
}
