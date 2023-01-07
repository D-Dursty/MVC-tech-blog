const loginForm = document.querySelector(".login");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const userObj = {
    username: document.querySelector(".loginUsername").value,
    password: document.querySelector(".loginPassword").value,
  };
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      alert("login unsuccessful :(");
    }
  });
});

const signupForm = document.querySelector(".signup");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {
    username: document.querySelector(".signupUsername").value,
    password: document.querySelector(".signupPassword").value,
  };
  // console.log(userObj)
  fetch("/api/users/", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      alert("trumpet sound");
    }
  });
});