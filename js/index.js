const commentsTag = document.querySelector('.comments');
const getData = async () => {
    const res = await fetch('../data.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}

const createComment = (ele) => {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", ele.id)
    const newPara = document.createElement("p");
    newPara.setAttribute("class", "comment-content")
    // newPara.setAttribute("value", ele.content)
    newPara.innerText(ele.content)
    newDiv.appendChild(newPara);
    commentsTag.appendChild(newDiv);
}

const init = async () => {
    const { currentUser, comments } = await getData()
    
    comments.forEach(ele => createComment(ele));
    console.log(comments)
}
init();