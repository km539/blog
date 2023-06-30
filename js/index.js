import { replyComment } from "./lib.js";
const commentsTag = document.querySelector(".comments");

const getData = async () => {
  const res = await fetch("../data.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await res.json();
  localStorage.currentUser = JSON.stringify(data.currentUser);
  localStorage.comments = JSON.stringify(data.comments);
  return data;
};

export const createComment = (ele, tagName) => {
  const commentDiv = document.createElement("div");
  commentDiv.setAttribute("class", `comment${ele.id}`);
  commentDiv.setAttribute("title", ele.id);

  const commentUser = document.createElement("div");
  commentUser.setAttribute("class", "commentUser");

  const commentUserImg = document.createElement("img");
  commentUserImg.setAttribute("class", "commentUserImg");
  commentUserImg.src = ele.user.image.png;

  commentUser.appendChild(commentUserImg);
  const commentUsername = document.createElement("p");
  commentUsername.setAttribute("class", "commentUsername");
  commentUsername.innerText = ele.user.username;
  commentUser.appendChild(commentUsername);

  const commentCreated = document.createElement("p");
  commentCreated.setAttribute("class", "commentCreated");
  commentCreated.innerText = ele.createdAt;
  commentUser.appendChild(commentCreated);

  const replyBtn = document.createElement("button");
  replyBtn.setAttribute("class", "replyBtn");
  replyBtn.innerText = "reply";
  replyBtn.onclick = function () {
    replyComment(ele.id, ele.user.username);
  };
  commentUser.appendChild(replyBtn);

  const commentPara = document.createElement("textarea");
  commentPara.setAttribute("class", "commentContent");
  // commentPara.setAttribute("value", ele.content)
  commentPara.innerText = ele.content;
  commentPara.readOnly = true;
  commentPara.rows = 4;
  commentPara.cols = 50;

  const commentLike = document.createElement("p");
  commentLike.setAttribute("class", "commentLike");
  commentLike.innerText = ele.score;

  commentDiv.appendChild(commentPara);
  commentDiv.appendChild(commentUser);
  commentDiv.appendChild(commentLike);
  tagName.appendChild(commentDiv);
  if (ele.replies) {
    const commentReplyDiv = document.createElement("div");
    commentReplyDiv.setAttribute("class", "replies");
    commentDiv.appendChild(commentReplyDiv);
    ele.replies.forEach(reply => createComment(reply, commentReplyDiv));
  }
};

const init = async () => {
  const { currentUser, comments } = await getData();
  //   localStorage.setItem("currentUser", JSON.stringify(currentUser));
  //   localStorage.setItem("comments", JSON.stringify(comments));
  comments.forEach(ele => createComment(ele, commentsTag));
  return currentUser;
};
init();
