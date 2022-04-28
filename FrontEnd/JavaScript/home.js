window.onload = () => {
  const urlparams = new URLSearchParams(window.location.search);
  const name = urlparams.get("name");
  console.log(name);
  $("#username")[0].innerHTML = name;
  console.log("test");
};

window.onload = async () => {
  const response = await fetch("http://localhost:4000/values");
  const data = await response.json();
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    $(".images").append(`<div class="col-md-4"><p>${data[i].title}</p></div>`);
  }
};
