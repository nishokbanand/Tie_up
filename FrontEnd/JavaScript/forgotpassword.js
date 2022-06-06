window.onload = async () => {
  document
    .querySelector("#forgotpassform")
    .addEventListener("submit", handleSubmit);
};
async function handleSubmit(e) {
  e.preventDefault();
  const mail_id = document.getElementById("mail_id").value;
  const response = await fetch("/forgotpassword", {
    method: "POST",
    body: JSON.stringify({
      mail_id: mail_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response;
  if (data.status === 200) {
    alert("check your mail");
  } else {
    alert("something went wrong");
  }
}
