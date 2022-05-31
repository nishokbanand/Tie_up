window.onload = async () => {
  document.getElementById("username").innerText = document.cookie.split("=")[1];
  const response = await fetch("http://localhost:4000/values");
  const data = await response.json();
  var flag = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].username === document.cookie.split("=")[1]) {
      flag = 1;
      //creation and styling of elements
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
      //
      //
      //
      //
      //delete a post
      const deletebtn = document.createElement("button");
      deletebtn.className = "btn btn-danger";
      deletebtn.innerText = "Delete";
      deletebtn.id = data[i]._id;
      deletebtn.onclick = async (e) => {
        const response = await fetch(
          `http://localhost:4000/delete/${e.target.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 200) {
          $(e.target).parent().remove();
        } else {
          alert("Error");
        }
      };
      //
      //
      //
      //edit a post
      const editbtn = document.createElement("button");
      editbtn.className = "btn btn-primary";
      editbtn.innerText = "Edit";
      editbtn.id = data[i]._id;
      editbtn.value = i;
      editbtn.onclick = async (e) => {
        const title = (document.createElement("h1").innerText = "Title");
        const des = (document.createElement("h1").innerText = "Description");
        const img = (document.createElement("h1").innerText = "Image");
        const newtitle = document.createElement("input");
        const newdes = document.createElement("textarea");
        const newimage = document.createElement("input");
        const submitbtn = document.createElement("button");
        submitbtn.innerText = "Submit";
        submitbtn.className = "btn btn-success";
        submitbtn.id = editbtn.id;
        newimage.type = "file";
        let id = editbtn.id;
        newtitle.value = data[e.target.value].title;
        newdes.value = data[e.target.value].description;
        var image = new Image();
        image.src = `data:image/png;base64,${data[e.target.value].image}`;
        newdes.className = "col col-md-12 col-lg-7 col-sm-12 col-xs-12";
        page.className = "post card mb-4";
        username.className = "username pt-2";
        pg_row.className = "row";
        newimage.className =
          "postimage col col-md-12 col-lg-5 col-sm-12 col-xs-12";
        $(e.target).parent().append(title);
        $(e.target).parent().append(newtitle);
        $(e.target).parent().append(des);
        $(e.target).parent().append(newdes);
        $(e.target).parent().append(img);
        $(e.target).parent().append(newimage);
        $(e.target).parent().append(image);
        $(e.target).parent().append(submitbtn);
        $(e.target).parent().append(deletebtn);
        $(e.target).parent().children().eq(1).remove();
        $(e.target).parent().children().eq(-7).remove();
        submitbtn.onclick = async (e) => {
          const formData = new FormData();
          formData.append("title", newtitle.value);
          formData.append("description", newdes.value);
          if (newimage.value == undefined) {
            formData.append("image", data[id].image);
          }
          formData.append("image", newimage.files[0]);
          const response = await fetch(
            `http://localhost:4000/edit/${e.target.id}`,
            {
              method: "PUT",
              body: formData,
            }
          );
          if (response.status === 200) {
            $(e.target).parent().remove();
            window.location = "/yourposts";
          } else {
            alert("Error");
          }
        };
      };
      //
      //
      //
      //appending elements
      $(page).append(username);
      $(username).append(hr);
      $(pg_row).append(title);
      $(pg_row).append(des);
      $(pg_row).append(image);
      $(page).append(pg_row);
      $(page).append(deletebtn);
      $(page).append(editbtn);
      $(".pages").append(page);
      document.getElementById("loader").style.display = "none";
    }
  }
  //
  //
  //
  //loader style and creation
  if (flag === 0) {
    document.getElementById("loader").style.display = "none";
    const text = document.createElement("h1");
    text.innerText = "No Posts";
    text.style = "color:wheat;font-size:50px;";
    text.className = "text-center";

    $(".pages").append(text);
  }
};
