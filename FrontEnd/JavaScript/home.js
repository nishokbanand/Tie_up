window.onload = async () => {
  document.getElementById("username1").innerText =
    document.cookie.split("=")[2];
  document.getElementById("username2").innerText =
    document.cookie.split("=")[2];
  const response = await fetch("http://localhost:4000/values");
  const data = await response.json();
  for (var i = 0; i < data.length; i++) {
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
    page.className = "post card ";
    username.className = "username pt-2";
    pg_row.className = "row";
    des.className = "col col-md-12 col-lg-7 col-sm-12 col-xs-12";
    image.className = "postimage col col-md-12 col-lg-5 col-sm-12 col-xs-12";
    image.src = `data:image/png;base64,${data[i].image}`;
    const likebutton = document.createElement("i");
    likebutton.className = "fa fa-heart fa-2x";
    likebutton.id = data[i]._id;
    const no_of_likes = document.createElement("div");
    no_of_likes.className = "no_of_likes";
    likebutton.addEventListener("click", async (e) => {
      const response = await fetch(
        `http://localhost:4000/like/${e.target.id}`,
        {
          method: "PUT",
        }
      );
      const data = await response;
      if (data.status === 200) {
        window.location.href = "/home";
      } else {
        window.location.href = "/home";
      }
    });
    no_of_likes.innerHTML = `<p>${data[i].likes.length}</p>`;
    for (var j = 0; j < data[i].likes.length; j++) {
      if (data[i].likes[j] === document.cookie.split("=")[2]) {
        likebutton.style = "color:red";
      }
    }
    $(page).append(username);
    $(username).append(hr);
    $(pg_row).append(title);
    $(pg_row).append(des);
    $(pg_row).append(image);
    $(pg_row).append(likebutton);
    $(pg_row).append(no_of_likes);
    $(page).append(pg_row);
    console.log(page);
    page.addEventListener("dblclick", async (e) => {
      console.log("doubleclick");
      const response = await fetch(
        `http://localhost:4000/like/${likebutton.id}`,
        {
          method: "PUT",
        }
      );
      const data = await response;
      if (data.status === 200) {
        window.location.href = "/home";
      } else {
        window.location.href = "/home";
      }
    });
    $(".pages").append(page);
    document.getElementById("loader").style.display = "none";
    userimage();
  }

  async function userimage() {
    const user_name = document.cookie.split("=")[2];
    const response = await fetch(`http://localhost:4000/home/${user_name}`, {
      method: "GET",
    });
    const data = await response.json();
    document.querySelector(".profileimage").src = data.profile_pic;
    document.querySelector("#profile").src = data.profile_pic;
  }
};
