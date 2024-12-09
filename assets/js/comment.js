const data = {

  "currentUser": {

    "image": {

      "png": "../images/avatars/image-juliusomo.png",

      "webp": "./images/avatars/image-juliusomo.webp"

    },

    "username": "juliusomo"

  },

  "comments": [

    {

      "id": 1,

      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",

      "createdAt": "1 month ago",

      "score": 12,

      "user": {

        "image": {

          "png": "./images/avatars/image-amyrobson.png",

          "webp": "./images/avatars/image-amyrobson.webp"

        },

        "username": "amyrobson"

      },

      "replies": []

    },

    {

      "id": 2,

      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",

      "createdAt": "2 weeks ago",

      "score": 5,

      "user": {

        "image": {

          "png": "./images/avatars/image-maxblagun.png",

          "webp": "./images/avatars/image-maxblagun.webp"

        },

        "username": "maxblagun"

      },

      "replies": [

        {

          "id": 3,

          "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",

          "createdAt": "1 week ago",

          "score": 4,

          "replyingTo": "maxblagun",

          "user": {

            "image": {

              "png": "./images/avatars/image-ramsesmiron.png",

              "webp": "./images/avatars/image-ramsesmiron.webp"

            },

            "username": "ramsesmiron"

          }

        },

        {

          "id": 4,

          "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",

          "createdAt": "2 days ago",

          "score": 2,

          "replyingTo": "ramsesmiron",

          "user": {

            "image": {

              "png": "./images/avatars/image-juliusomo.png",

              "webp": "./images/avatars/image-juliusomo.webp"

            },

            "username": "juliusomo"

          }

        }

      ]

    }

  ]

}

const containerInner = document.querySelector('.container-inner');
const currentUser = data.currentUser.username;
const imageMap = {
  "amyrobson": "assets/img/amyrobson-avatar-icon.svg",
  "maxblagun": "assets/img/maxblagun-avatar-icon.svg",
  "ramsesmiron": "assets/img/ramsesmiron-avatar-icon.svg",
  "juliusomo": "assets/img/juliusomo-avatar-icon.svg"
};
containerInner.innerHTML = `<div class="cart-inner"></div>`;
const cartInner = containerInner.querySelector('.cart-inner');
const deleteWarning = document.querySelector('.delete-warning')
let selectedCommentElement = null;

function getData() {
  cartInner.innerHTML = data.comments.map(x => `
    <div class="cart">
      <div class="cart-profile">
        <img src="${imageMap[x.user.username]}" alt="${x.user.username} avatar">
        <h5>${x.user.username}</h5>
        <span>${x.createdAt}</span>
      </div>
      <p>${x.content}</p>
        <div class = "cart-footer">
      <span class = "score-collector"><button><img src="assets/img/plus-icon.svg" alt="plus button"></button><span>${x.score}</span><button><img src="assets/img/minus-icon.svg" alt="minus button"></button></span>
        <button class="reply-btn" data-id="${x.id}"><img src="assets/img/reply-btn.svg" alt="reply button">Reply</button>
      </div>
    </div>
    ${x.replies.map(y => `
      <div class = "replies">
      <div class="cart">
        <div class="cart-profile">
          <img src="${imageMap[y.user.username]}" alt="${y.user.username} avatar">
          <h5>${y.user.username}</h5>
          <span>${y.createdAt}</span>
        </div>
        <h6 class="cartflex"><a href="#" class = "user-nickname">@${y.replyingTo}</a> ${y.content}</h6>
        <div class = "cart-footer">
        <span class = "score-collector"><button><img src="assets/img/plus-icon.svg" alt="plus button"></button><span>${y.score}</span><button><img src="assets/img/minus-icon.svg" alt="minus button"></button></span>
        ${y.user.username === currentUser ? `
        <div class = "current-user-btns">
        <button class="delete-btn" data-id="${y.id}"> <img src="assets/img/delete-btn.svg" alt="delete button">Delete</button>
          <button class="edit-btn" data-id="${y.id}"><img src="assets/img/edit-btn.svg" alt="edit button">Edit</button>
          </div>
          ` : `<button class="reply-btn" data-id="${y.id}"><img src="assets/img/reply-btn.svg" alt="reply button">Reply</button>`}
        </div>
      </div>
      </div>
    `).join('')}
    `).join('');
  deleteBtn()
  blockNickName()
}

function blockNickName() {
  const userNickNames = document.querySelectorAll('.user-nickname')
  for (const userNickName of userNickNames) {
    userNickName.addEventListener('click', function (e) {
      e.preventDefault()
    })
  }
}

function deleteBtn() {
  const deleteBtns = document.querySelectorAll('.delete-btn')
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', function () {
      deleteWarning.showModal()
      selectedCommentElement = this.closest('.cart');
    })
  }
}
const escapeBtn = document.querySelector('.escape-btn')
const confirmDeleteBtn = document.querySelector('.confirm-btn')

function escape() {
  escapeBtn.addEventListener('click', function () {
    deleteWarning.close()
  })
}

function confirmDelete() {
  confirmDeleteBtn.addEventListener('click', function () {
    if (selectedCommentElement) {
      selectedCommentElement.remove();
      deleteWarning.close();
      selectedCommentElement = null;
    }
  });
}

function init() {
  getData()
  escape()
  confirmDelete()
}

init()