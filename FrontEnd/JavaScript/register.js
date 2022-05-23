window.onload = function () {
  document
    .querySelector("#register-form")
    .addEventListener("submit", handleSubmit);
  document.querySelector("#forgotpassword").addEventListener();
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
  const response = fetch("http://localhost:4000/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response;
  console.log("data");
  console.log(data);
  if (data.status === 200) {
    window.location.href = "/home";
  } else {
    window.location.href = "/register";
  }
}
