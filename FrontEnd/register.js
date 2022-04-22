window.onload = function () {
  document
    .querySelector("#register-form")
    .addEventListener("submit", handleSubmit);
};
async function handleSubmit(e) {
  e.preventDefault();
  const name = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const password2 = document.querySelector("#confirm_password").value;
  if (password != password2) {
    alert("password not match");
    return;
  }
  const user = {
    name: name,
    email: email,
    password: password,
    password2: password2,
  };
  const response = fetch("http://localhost:4000/api/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password2,
    }),
  });
  const data = await (await response).json();
  if (data.message) {
    window.location.href = "./login.html";
  } else {
    window.location.href = "./register.html";
  }
}
