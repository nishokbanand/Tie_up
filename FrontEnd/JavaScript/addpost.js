window.onload = function () {
  document
    .querySelector(".addpost-form")
    .addEventListener("submit", handleSubmit);
};
async function handleSubmit(e) {
  e.preventDefault();
  //get username
  const username = document.cookie.split("=")[2];
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const image = document.querySelector("#image").files[0];
  const user = {
    username: username,
    title: title,
    description: description,
    image: image,
  };
  const response = fetch("http://localhost:4000/upload", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response;
  console.log(response);
  if (data.status === 200) {
    window.location = "/home";
  } else {
    alert("Invalid Credentials");
  }
}
