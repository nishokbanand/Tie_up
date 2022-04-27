window.onload = () => {
  const urlparams = new URLSearchParams(window.location.search);
  const name = urlparams.get("name");
  console.log(name);
  $("#username")[0].innerHTML = name;
  console.log("test");
};
