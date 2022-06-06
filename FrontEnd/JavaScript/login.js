window.onload = function () {
  document
    .querySelector(".login-form")
    .addEventListener("submit", handleSubmit);
};
async function handleSubmit(e) {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const user = {
    email: email,
    password: password,
  };
  const response = fetch("/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response;
  if (data.status === 200) {
    window.location = "/home";
  } else {
    alert("Invalid Credentials");
  }
}
