window.onload = function () {
  document
    .querySelector("#addpost-form")
    .addEventListener("submit", handleSubmit);
};
async function handleSubmit(e) {
  e.preventDefault();
  const response = fetch("http://localhost:4000/upload", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      file,
      title,
    }),
  });
  const data = await (await response).json();
  console.log(data);
  if (data.status === "ok") {
    window.location.href = "/";
  } else {
    alert("error");
  }
}
