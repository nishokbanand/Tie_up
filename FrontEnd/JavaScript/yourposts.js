window.onload = async () => {
  document.getElementById("username").innerText = document.cookie.split("=")[2];
  const response = await fetch("http://localhost:4000/values");
  const data = await response.json();
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    if (data[i].username === document.cookie.split("=")[2]) {
      console.log(data[i].username);
      const page = document.createElement("div");
      const username = document.createElement("div");
      const pg_row = document.createElement("div");
      const title = document.createElement("div");
      title.innerHTML = `<h3>${data[i].title}</h3>`;
      const hr = document.createElement("hr");
      username.innerHTML = `<p>${data[i].username}</p>`;
      const des = document.createElement("div");
      des.innerHTML = `<p>${data[i].description}</p>`;
      var image = new Image();
      page.className = "post card mb-4";
      username.className = "username pt-2";
      pg_row.className = "row";
      des.className = "col col-md-12 col-lg-7 col-sm-12 col-xs-12";
      image.className = "postimage col col-md-12 col-lg-5 col-sm-12 col-xs-12";
      image.src = `data:image/png;base64,${data[i].image}`;
      const deletebtn = document.createElement("button");
      deletebtn.className = "btn btn-danger";
      deletebtn.innerText = "Delete";
      deletebtn.onclick = async () => {
        console.log(data[i]._id);
      };
      $(page).append(username);
      $(username).append(hr);
      $(pg_row).append(title);
      $(pg_row).append(des);
      $(pg_row).append(image);
      $(page).append(pg_row);
      $(page).append(deletebtn);
      $(".pages").append(page);
    }
  }
};
