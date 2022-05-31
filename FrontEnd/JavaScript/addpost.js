window.onload = function () {
  document.getElementById("username").innerText = document.cookie.split("=")[1];
  document
    .querySelector("#addpost-form")
    .addEventListener("submit", handleSubmit);
};
async function fileToDataURI(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      res(reader.result);
    };
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}
async function handleSubmit(e) {
  e.preventDefault();
  const username = document.cookie.split("=")[1];
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const image = document.querySelector("#file").files[0];
  const imageURI = await fileToDataURI(image);
  const user = {
    username: username,
    title: title,
    description: description,
    image: imageURI,
  };
  const response = fetch("http://localhost:4000/upload", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response;
  if (data.status === 200) {
    window.location = "/home";
  } else {
    alert("Invalid Credentials");
  }
}
