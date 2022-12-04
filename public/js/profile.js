const newBlogPost = document.querySelector(".addBlog");
const deletePost = document.querySelectorAll(".deletePost");

newBlogPost.addEventListener("submit", (e) => {
  e.preventDefault();

  const blogObj = {
    title: document.querySelector(".blogTitle").value,
    blog_content: document.querySelector(".blogContent").value,
  };

  fetch("/api/blogs", {
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

deletePost.forEach((delBtn) => {
  delBtn.addEventListener("click", (e) => {
    const blogId = e.target.getAttribute("blogId");
    console.log(blogId);
    fetch(`/api/blogs/${blogId}`, {
      method: "DELETE"
    }).then((res) => {
      if (res.ok) {
        location.reload();
      } else {
        alert("trumpet sound");
      }
    });
  });
});