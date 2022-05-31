window.onload = () => {
  document.getElementById("username1").innerText =
    document.cookie.split("=")[1];
  const profile_data = JSON.parse(localStorage.getItem("profile_data"));
  document.querySelector("#user_name").innerHTML = profile_data.username;
  document.querySelector("#firstname").value = profile_data.firstname;
  document.querySelector("#lastname").value = profile_data.lastname;
  document.querySelector("#aadhar_number").value = profile_data.aadhar_number;
  document.querySelector("#twitter_acc").value = profile_data.twitter_acc;
  document.querySelector("#linkedIn_acc").value = profile_data.linkedIn_acc;
  document.querySelector("#addrline1").value = profile_data.addrline1;
  document.querySelector("#addrline2").value = profile_data.addrline2;
  document.querySelector("#city").value = profile_data.city;
  document.querySelector("#state").value = profile_data.state;
  document.querySelector("#zip_code").value = profile_data.zip_code;
  document.querySelector("#about").value = profile_data.about;
  document.querySelector("#large_profile_pic").src = profile_data.profile_pic;

  document.querySelector("#firstname").setAttribute("readonly", "true");
  document.querySelector("#lastname").setAttribute("readonly", "true");
  document.querySelector("#aadhar_number").setAttribute("readonly", "true");
  document.querySelector("#twitter_acc").setAttribute("readonly", "true");
  document.querySelector("#linkedIn_acc").setAttribute("readonly", "true");
  document.querySelector("#addrline1").setAttribute("readonly", "true");
  document.querySelector("#addrline2").setAttribute("readonly", "true");
  document.querySelector("#city").setAttribute("readonly", "true");

  document.querySelector("#state").setAttribute("readonly", "true");
  document.querySelector("#zip_code").setAttribute("readonly", "true");
  document.querySelector("#about").setAttribute("readonly", "true");
  document.querySelector("#profile_pic").setAttribute("readonly", "true");
  document.querySelector("#large_profile_pic").setAttribute("readonly", "true");
};
