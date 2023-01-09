const commentForm = document.querySelector("#newCommentForm");

commentForm.addEventListener("submit", e=> {
    e.preventDefault();
    const commentObj = {
        text: document.querySelector("#commentText").value,
        post_id: document.querySelector(".comment-form").dataset.Id
        
    }
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(commentObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

