window.onload = async () => {
  document.getElementById("username1").innerText =
    document.cookie.split("=")[1];
  document.getElementById("username2").innerText =
    document.cookie.split("=")[1];
  document
    .querySelector("#postnews")
    .addEventListener("submit", handleSubmitfornews);
  fillnews();
  fetchnews();
  async function fetchnews() {
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
      page.className = "post card mb-3";
      username.className = "username pt-2";
      pg_row.className = "row";
      des.className = "col col-md-12 col-lg-7 col-sm-12 col-xs-12";
      image.className = "postimage col col-md-12 col-lg-5 col-sm-12 col-xs-12";
      image.src = data[i].image;
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
        if (data[i].likes[j] === document.cookie.split("=")[1]) {
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
      username.addEventListener("click", viewprofile);
      page.addEventListener("dblclick", async (e) => {
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
  }

  async function userimage() {
    const user_name = document.cookie.split("=")[1];
    const response = await fetch(`http://localhost:4000/home/${user_name}`, {
      method: "GET",
    });
    const data = await response.json();
    document.querySelector(".profileimage").src = data.profile_pic;
    document.querySelector("#profile").src = data.profile_pic;
  }

  async function viewprofile(e) {
    const response = await fetch(
      `http://localhost:4000/viewprofilesupport/${e.target.innerText}`,
      {
        method: "GET",
      }
    );
    //store it in localStorage
    const data = await response.json().then((res) => {
      localStorage.setItem("profile_data", JSON.stringify(res));
      window.location = "/viewprofile";
    });
  }
  async function handleSubmitfornews(e) {
    e.preventDefault();
    const username = document.cookie.split("=")[1];
    const news = document.querySelector("#news_textarea").value;
    const userprofilepic = document.querySelector("#profile").src;
    const data = {
      username,
      news,
      userprofilepic,
    };
    const response = await fetch("/postnews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      window.location.href = "/home";
    }
  }
  async function fillnews() {
    const response = await fetch("/getnews");
    const data = await response.json();
    for (var i = 0; i < data.length; i++) {
      const newscard = document.createElement("div");
      newscard.className = "newscard card-header";
      const newscardprofilepicdiv = document.createElement("div");
      newscardprofilepicdiv.className =
        "media flex-wrap w-100 align-items-center";
      const newscardimg = document.createElement("img");
      newscardimg.className = "d-block ui-w-40 rounded-circle";
      newscardimg.src = data[i].image;
      newscardimg.style = "width:50px;height:50px;";
      const newscardusername = document.createElement("div");
      newscardusername.className = "media-body ml-3";
      const newscardusernameanchor = document.createElement("a");
      newscardusernameanchor.href = "javascript:void(0)";
      const newcardusernamepara = document.createElement("p");
      newcardusernamepara.innerHTML = data[i].username;
      newscardusernameanchor.appendChild(newcardusernamepara);
      newscardusername.appendChild(newscardusernameanchor);
      newscardprofilepicdiv.appendChild(newscardusername);
      newscardprofilepicdiv.appendChild(newscardimg);
      //username and details
      const newscardheadertext = document.createElement("div");
      newscardheadertext.className = "text-muted small ml-3";
      const newcardheadertextmembersince = document.createElement("div");
      const newcardheadertextmembersincestrong =
        document.createElement("strong");
      newcardheadertextmembersincestrong.innerHTML = "01/01/2019";
      newcardheadertextmembersince.appendChild(
        newcardheadertextmembersincestrong
      );
      newscardheadertext.appendChild(newcardheadertextmembersince);
      newscardprofilepicdiv.appendChild(newscardheadertext);
      newscard.append(newscardprofilepicdiv);
      const page = document.querySelector(".newscard");
      page.appendChild(newscard);

      //news card body
      const newscardbody = document.createElement("div");
      newscardbody.className = "card-body";
      const newscardbodytext = document.createElement("p");
      newscardbodytext.className = "card-text";
      newscardbodytext.innerHTML = data[i].description;
      newscardbody.appendChild(newscardbodytext);
      page.append(newscardbody);
      //news card footer
      const newscardfooter = document.createElement("div");
      newscardfooter.className =
        "card-footer  d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3";
      const newscardfooterleft = document.createElement("div");
      newscardfooterleft.className = "px-4 pt-3";
      const newscardfooterlefta = document.createElement("a");
      newscardfooterlefta.href = "javascript:void(0)";
      newscardfooterlefta.className =
        "text-muted d-inline-flex align-items-center align-middle";
      const icon = document.createElement("i");
      icon.className = "fa fa-heart text-danger";
      newscardfooterlefta.appendChild(icon);
      newscardfooterleft.appendChild(newscardfooterlefta);
      newscardfooter.appendChild(newscardfooterleft);
      const newscardfooterreply = document.createElement("div");
      newscardfooterreply.className = "px-4 pt-3";
      const newscardfooterreplybtn = document.createElement("button");
      newscardfooterreplybtn.className = "btn btn-primary";
      const newscardfooterreplyicon = document.createElement("i");
      newscardfooterreplyicon.className = "ion ion-md-create";
      newscardfooterreplybtn.appendChild(newscardfooterreplyicon);
      newscardfooterreplybtn.innerText = "Reply";
      newscardfooterreply.appendChild(newscardfooterreplybtn);
      newscardfooter.appendChild(newscardfooterreply);
      page.appendChild(newscardfooter);
      newcardusernamepara.addEventListener("click", viewprofile);
    }
  }
};
