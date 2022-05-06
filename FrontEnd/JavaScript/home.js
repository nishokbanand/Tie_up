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
    const page = document.createElement("div");
    const title = document.createElement("div");
    const pg_row = document.createElement("div");
    const hr = document.createElement("hr");
    title.innerHTML = `<p>${data[i].title}</p>`;
    const des = document.createElement("div");
    des.innerHTML = `<p>${data[i].description}</p>`;
    var image = new Image();
    page.className = "post card mb-4";
    title.className = "username pt-2";
    pg_row.className = "row";
    des.className = "col col-md-12 col-lg-7 col-sm-12 col-xs-12";
    image.className = "postimage col col-md-12 col-lg-5 col-sm-12 col-xs-12";
    (image.src = `data:image/png;base64,${data[i].image}`),
      $(page).append(title);
    $(title).append(hr);
    $(pg_row).append(des);
    $(pg_row).append(image);
    $(page).append(pg_row);
    $(".pages").append(page);
  }
};
