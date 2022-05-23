window.onload = async () => {
  document
    .querySelector("#resetpassform")
    .addEventListener("submit", handleSubmit);
};
const handleSubmit = async (e) => {
  const new_password = document.getElementById("new_password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  if (new_password != confirm_password) {
    alert("password not match");
    return;
  }
  const response = await fetch("http://localhost:4000/resetpassword/", {
    method: "POST",
    body: JSON.stringify({
      new_password: new_password,
      confirm_password: confirm_password,
      resetpasswor,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.status === 200) {
    window.location = "/login";
  } else {
    alert("something went wrong");
  }
};
