import { createComment } from "./index.js";
const commentsTag = document.querySelector(".comments");
const form = document.querySelector(".postForm");
const replyForm = document.querySelector(".replyForm");
let id = 5;

const addComment = event => {
  event.preventDefault();
  const comments = JSON.parse(localStorage.getItem("comments"));
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const newComment = {
    id: id,
    content: event.target.comment.value,
    createdAt: "now",
    score: Math.floor(Math.random() * 10),
    user: user,
    replies: [],
  };
  comments.push(newComment);
  createComment(newComment, commentsTag);
  localStorage.setItem("comments", JSON.stringify(comments));
  id++;
};

export const replyComment = (commentId, username) => {
  const demo = document.querySelectorAll(".comments");
  
  document.querySelector(".replyBox").hidden = false;
  replyForm.addEventListener("submit", event => {
    event.preventDefault();
    const comment = document.querySelector(`.comment${commentId} .replies`);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const comments = JSON.parse(localStorage.getItem("comments"));
    const newReply = {
      id: id,
      content: event.target.replyComment.value,
      createdAt: "now",
      score: Math.floor(Math.random() * 10),
      replyingTo: username,
      user: user,
    };
    createComment(newReply, comment);

    const updatedComments = comments.map(ele => {
      ele.id === commentId && ele.replies.push(newReply);
      return ele;
    });
    // console.log(updatedComments);
    document.querySelector(".replyBox").hidden = true;
    event.target.replyComment.value = "";
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    id++;
  });
};

form.addEventListener("submit", addComment);
// replyBtn?.addEventListener("click", replyComment);
