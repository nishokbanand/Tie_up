window.onload = async () => {
  document.getElementById("username1").innerText =
    document.cookie.split("=")[1];
  document.getElementById("username2").innerText =
    document.cookie.split("=")[1];
  document
    .querySelector("#postnews")
    .addEventListener("submit", handleSubmitfornews);
  document.querySelector(".searchbar").addEventListener("submit", search);
  fetchnews();
  fillnews();
};
async function search(e) {
  e.preventDefault();
  const search_text = e.target.children[0].value;
  const response = await fetch(`http://localhost:4000/search/${search_text}`, {
    method: "GET",
  });
  document.querySelector(".pages").innerHTML = "";
  const data = await response.json();
  if (data.length === 0) {
    document.querySelector(".searchbar").innerHTML = `
    <div class="alert alert-danger" role="alert">
    No results found!
    </div>
    `;
  } else {
    document.querySelector(".searchbar").innerHTML = `
    <div class="alert alert-success" role="alert">
    ${data.length} results found!
    </div>
    `;
    document.querySelector(".pages").innerHTML += `
    <div class="row">
    ${data.map(
      (post) => `
      <div class="col col-12">
      <div class="card mb-4 shadow-sm">
      <img class="postimage col col-md-12 col-lg-5 col-sm-12 col-xs-12" style="width:50px;height:50px;border-radius:50%" src="${post.profilepic}" alt="Card image cap">
      <p class="card-text">${post.username}</p>
      <img src="${post.image}" alt="${post.title}" class="card-img-top">
      <div class="card-body">
      <p class="card-text">${post.title}</p>
      <p class ="card-description">${post.description}</p>
      <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
      <button type="button" class="btn btn-sm btn-outline-secondary">
      View
      </button>
      <button type="button" class="btn btn-sm btn-outline-secondary">
      Edit
      </button>
      </div>
      <small class="text-muted">9 mins</small>
      </div>
      </div>
      </div>
      </div>
      `
    )}
    </div>
    `;
  }
}

async function fetchnews() {
  const response = await fetch("http://localhost:4000/values");
  const data = await response.json();
  for (var i = 0; i < data.length; i++) {
    const page = document.createElement("div");
    const username = document.createElement("p");
    const pg_row = document.createElement("div");
    const title = document.createElement("div");
    title.innerHTML = `<h3>${data[i].title}</h3>`;
    const hr = document.createElement("hr");
    username.innerHTML = `<a>${data[i].username}</a>`;
    const des = document.createElement("div");
    des.innerHTML = `<p>${data[i].description}</p>`;
    var image = new Image();
    page.className = "post card mb-3";
    username.className = "username pt-2";
    username.style = "margin-left:4px; display:inline";
    pg_row.className = "row p-4";
    des.className = "col col-md-12 col-lg-12 col-sm-12 col-xs-12";
    image.className = "postimage col col-md-12 col-lg-12 col-sm-12 col-xs-12";
    image.src = data[i].image;
    const profilepic = new Image();
    profilepic.className = "profilepic";
    profilepic.src = data[i].profilepic;
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
    const titlediv = document.createElement("div");
    titlediv.appendChild(profilepic);
    titlediv.appendChild(username);
    $(page).append(titlediv);
    // $(page).append(username);
    $(username).append(hr);
    $(pg_row).append(title);
    $(pg_row).append(image);
    $(pg_row).append(des);
    $(pg_row).append(likebutton);
    $(pg_row).append(no_of_likes);
    $(page).append(pg_row);
    page.style = "background-color:white";
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
  const uniqueid = new Date().getTime().toString();
  const data = {
    username,
    news,
    userprofilepic,
    uniqueid,
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
    newscardusernameanchor.addEventListener("click", viewprofile);
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
    const newcardheadertextmembersincestrong = document.createElement("strong");
    newcardheadertextmembersincestrong.innerHTML = data[i].date;
    newcardheadertextmembersince.appendChild(
      newcardheadertextmembersincestrong
    );
    newscardheadertext.appendChild(newcardheadertextmembersince);
    newscardprofilepicdiv.appendChild(newscardheadertext);
    newscard.appendChild(newscardprofilepicdiv);
    const page = document.querySelector(".newscard");
    page.append(newscard);
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
    const textboxdiv = document.createElement("div");
    const textbox = document.createElement("input");
    textbox.placeholder = "Comment here..";
    textbox.className = "form-control p-2";
    textbox.id = "replytextbox";
    textbox.style = "width:100%;height:30px";
    textboxdiv.append(textbox);
    textboxdiv.style = "width:100%";
    newscardfooter.appendChild(textboxdiv);
    newscardfooterlefta.appendChild(icon);
    newscardfooterleft.appendChild(newscardfooterlefta);
    newscardfooter.appendChild(newscardfooterleft);
    const newscardfooterreply = document.createElement("div");
    newscardfooterreply.className = "px-4 pt-3";
    newscardfooterreply.style = "margin-left:50px";
    const newscardfooterreplybtn = document.createElement("button");
    newscardfooterreplybtn.className = "btn btn-primary";
    const newscardfooterreplyicon = document.createElement("i");
    newscardfooterreplyicon.className = "ion ion-md-create";
    newscardfooterreplybtn.appendChild(newscardfooterreplyicon);
    newscardfooterreplybtn.innerText = "Reply";
    newscardfooterreply.appendChild(newscardfooterreplybtn);
    newscardfooter.appendChild(newscardfooterreply);
    const uniqueid = document.createElement("p");
    uniqueid.innerHTML = data[i].unqiueid;
    uniqueid.style = "opacity:0";
    newscardfooter.appendChild(uniqueid);
    const br = document.createElement("br");
    newscardfooter.appendChild(br);
    const commentsdiv = document.createElement("div");
    commentsdiv.className = "comments";
    commentsdiv.innerText = "Comments:";
    commentsdiv.style = "transform:translateX(-200px)";
    newscardfooter.appendChild(commentsdiv);
    newcardusernamepara.addEventListener("click", viewprofile);
    const reply = document.createElement("div");
    reply.className = "reply p-4";
    reply.style = "width:100%;background-color:#DCDCDC; border-radius:40px";
    for (var j = 0; j < data[i].replies.length; j++) {
      const replycard = document.createElement("div");
      replycard.className = "newscard card-header";
      const replyprofilepicdiv = document.createElement("div");
      replyprofilepicdiv.className = "media flex-wrap w-100 align-items-center";
      const replyusername = document.createElement("div");
      replyusername.className = "media-body ml-3";
      const replyusernameanchor = document.createElement("a");
      replyusernameanchor.href = "javascript:void(0)";
      const newcardusernamepara = document.createElement("p");
      newcardusernamepara.innerHTML = data[i].replies[j].username;
      replyusernameanchor.appendChild(newcardusernamepara);
      replyusername.appendChild(replyusernameanchor);
      replyprofilepicdiv.appendChild(replyusername);
      //username and details
      const replyheadertext = document.createElement("div");
      replyheadertext.className = "text-muted small ml-3";
      const newcardheadertextmembersince = document.createElement("div");
      const newcardheadertextmembersincestrong =
        document.createElement("strong");
      newcardheadertextmembersincestrong.innerHTML = data[i].date;
      newcardheadertextmembersince.appendChild(
        newcardheadertextmembersincestrong
      );
      replyheadertext.appendChild(newcardheadertextmembersince);
      replyprofilepicdiv.appendChild(replyheadertext);
      reply.append(replyprofilepicdiv);
      const page = document.querySelector(".newscard");
      // page.appendChild(newscard);
      //news card body
      const replybody = document.createElement("div");
      replybody.className = "card-body";
      const replybodytext = document.createElement("p");
      replybodytext.className = "card-text";
      replybodytext.innerHTML = data[i].replies[j].description;

      replybody.appendChild(replybodytext);
      reply.append(replybody);
      const hr = document.createElement("hr");
      reply.append(hr);
    }
    newscardfooter.append(reply);
    newscardfooter.style = "border-bottom :20px solid #e9ecef;";
    page.appendChild(newscardfooter);
    newscardfooterreplybtn.addEventListener("click", replyfn);
  }
}
async function replyfn(e) {
  const usernameofnews =
    e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].innerText.split(
      "\n"
    )[0];
  const uniqueidofnews =
    e.target.parentElement.parentElement.parentElement.parentElement.children[0]
      .children[2].children[2].innerText;
  console.log(usernameofnews);
  const replyusername = document.cookie.split("=")[1];
  const replynews = document.getElementById("replytextbox").value;
  const data = {
    usernameofnews,
    replyusername,
    replynews,
    uniqueidofnews,
  };
  const response = await fetch("http://localhost:4000/postnewsreply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const data1 = await response.json();
  if (data1.status == 200) {
    window.location.reload();
  }
}
