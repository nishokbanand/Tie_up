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
    $(".title_div").append(
      `<div class="col-md-4"><p>${data[i].title}</p></div>`
    );
    $(".description_div").append(
      `<div class="post col col-md-12 col-lg-7 col-sm-12 col-xs-12">${data[i].description}</div>`
    );
    //convert base64 to image
    var base64 = data[i].image;
    var image = document.createElement("img");
    image.src = "data:image/png;base64," + base64;
    $(".image_div").append(
      `<div class="col-md-4"><img src="${image.src}"/></div>`
    );
  }
};
