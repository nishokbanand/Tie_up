window.onload = () => {
  document.getElementById("username1").innerText =
    document.cookie.split("=")[1];
  document
    .querySelector("#yourprofileform")
    .addEventListener("submit", handleSubmit);
  fillyourprofileform();
};

async function fillyourprofileform() {
  const username = document.cookie.split("=")[1];
  const response = await fetch(
    `http://localhost:4000/userprofile/${username}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  document.querySelector("#firstname").value = data.firstname;
  document.querySelector("#lastname").value = data.lastname;
  document.querySelector("#aadhar_number").value = data.aadhar_number;
  document.querySelector("#twitter_acc").value = data.twitter_acc;
  document.querySelector("#linkedIn_acc").value = data.linkedIn_acc;
  document.querySelector("#addrline1").value = data.addrline1;
  document.querySelector("#addrline2").value = data.addrline2;
  document.querySelector("#city").value = data.city;
  document.querySelector("#state").value = data.state;
  document.querySelector("#zip_code").value = data.zip_code;
  // document.querySelector("#profile_pic").file = data.profile_pic;
  document.querySelector("#about").value = data.about;
  //change placeholder value
  document.querySelector("#firstname").ariaPlaceholder = data.firstname;
  document.querySelector("#lastname").ariaPlaceholder = data.lastname;
  document.querySelector("#aadhar_number").ariaPlaceholder = data.aadhar_number;
  document.querySelector("#twitter_acc").ariaPlaceholder = data.twitter_acc;
  document.querySelector("#linkedIn_acc").ariaPlaceholder = data.linkedIn_acc;
  document.querySelector("#addrline1").ariaPlaceholder = data.addrline1;
  document.querySelector("#addrline2").ariaPlaceholder = data.addrline2;
  document.querySelector("#city").ariaPlaceholder = data.city;
  document.querySelector("#state").ariaPlaceholder = data.state;
  document.querySelector("#zip_code").ariaPlaceholder = data.zip_code;
  document.querySelector("#small_profile_pic").src = data.profile_pic;
  document.querySelector("#large_profile_pic").src = data.profile_pic;

  //change innertext of user name
  document.querySelector("#user_name").innerText =
    "Username: " + document.cookie.split("=")[1];
  document.querySelector("#about").value = data.about;
}

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

const handleSubmit = async (event) => {
  event.preventDefault();
  const profile_pic = document.querySelector("#profile_pic").files[0];
  const firstname = document.querySelector("#firstname").value;
  const lastname = document.querySelector("#lastname").value;
  const aadhar_number = document.querySelector("#aadhar_number").value;
  const twitter_acc = document.querySelector("#twitter_acc").value;
  const linkedIn_acc = document.querySelector("#linkedIn_acc").value;
  const addrline1 = document.querySelector("#addrline1").value;
  const addrline2 = document.querySelector("#addrline2").value;
  const city = document.querySelector("#city").value;
  const state = document.querySelector("#state").value;
  const zip_code = document.querySelector("#zip_code").value;
  const about = document.querySelector("#about").value;
  const profilePicDataURI = await fileToDataURI(profile_pic);
  const user_profile = {
    username: document.cookie.split("=")[1],
    firstname: firstname,
    lastname: lastname,
    aadhar_number: aadhar_number,
    twitter_acc: twitter_acc,
    linkedIn_acc: linkedIn_acc,
    addrline1: addrline1,
    addrline2: addrline2,
    city: city,
    state: state,
    zip_code: zip_code,
    profile_pic: profilePicDataURI,
    about: about,
  };
  const response = await fetch("http://localhost:4000/updateprofile", {
    method: "PUT",
    body: JSON.stringify(user_profile),
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
};
