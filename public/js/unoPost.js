const postForm = document.querySelector("#commentForm");
postForm.addEventListener("submit", e=> {
    e.preventDefault();
    const commentObj = {
        content:document.querySelector("#commentText").value,
        
    }
    fetch("/api/comment",{
        method:"POST",
        body:JSON.stringify(post_id, commentObj),
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
        const postId = e.target.getAttribute("data-postid")
        console.log(postId);
        fetch(`/api/post/${postId}`,{
            method:"PUT"
        }).then(res=>{
            if(res.ok){
                location.reload();
            } else {
                alert("well, that was a no go!")
            }
        })
    })
})