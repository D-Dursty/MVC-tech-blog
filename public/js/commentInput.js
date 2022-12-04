const commentForm = document.querySelector("#addComment");
commentForm.addEventListener("submit", e=> {
    e.preventDefault();
    const commentObj = {
        content:document.querySelector("#commentContent").value,
        
    }
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(Blog_id, commentObj),
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
        const blogId = e.target.getAttribute("blogId")
        console.log(blogId);
        fetch(`/api/blogs/${blogId}`,{
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