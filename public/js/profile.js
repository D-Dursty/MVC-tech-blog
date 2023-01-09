const newBlogPost = document.querySelector(".addBlog");
const deletePost = document.querySelectorAll(".deletePost");

newBlogPost.addEventListener("submit", (e) => {
  e.preventDefault();

  const blogObj = {
    title: document.querySelector(".blogTitle").value,
    content: document.querySelector(".blogContent").value,
  };

  fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(blogObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      console.log(res);
      alert("trumpet sound");
    }
  });
});

