const commentForm = document.querySelector("#addComment");
commentForm.addEventListener("submit", e=> {
    e.preventDefault();
    const commentObj = {
        Text: document.querySelector("#commentContent").value,
        
    }
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(Post_id, commentObj),
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

const editButtons = document.querySelectorAll(".editBtn");

editButtons.forEach(editBtn=>{
    editBtn.addEventListener("click",e=>{
        const postId = e.target.getAttribute("blogId")
        console.log(postId);
        fetch(`/api/posts/${postId}`,{
            method:"PUT"
        }).then(res=>{
            if(res.ok){
                location.reload();
            } else {
                alert("trumpet sound")
            }
        })
    })
})