HTMLElement.prototype.hide = function() {
    this.classList.add("d-none");
}

HTMLElement.prototype.show = function() {
    this.classList.remove("d-none");
}

const md = document.getElementById("myModal");
const modal = new bootstrap.Modal(md);
const accessButton = document.getElementById("accessButton");
const modalInput = document.getElementById("modal-input");
const input = document.getElementById("input");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");
const errorDiv = document.getElementById("errorDiv");
const chatDiv = document.getElementById("chat-block");
const login = document.getElementById("login");
const usersDiv = document.getElementById("users");

const template = '<li class="list-group-item">%MESSAGE</li>';
const messages = [];

accessButton.onclick = () => {
  const val = modalInput.value;
  modalInput.value = "";  
  if (!val) return errorDiv.innerHTML = "<p>Username non valido</p>";
  modal.hide();
  login.hide();
  document.getElementById("title").innerHTML = "<h1>Group chat</h1>";
  chatDiv.show();

  const socket = io();
  socket.emit("user",val);

  input.onkeydown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      button.click();
    }
  };

  button.onclick = () => {
    socket.emit("message", input.value);
    input.value = "";
  };

  socket.on("chat", (message) => {
    console.log(message);
    messages.push(message);
    render(chat,messages);
  });

  socket.on("users", (list) => {
    render(usersDiv,(list.map(e => e.name)));
  })

  const render = (element,list) => {
    let html = "";
    list.forEach((item) => {
      const row = template.replace("%MESSAGE", item);
      html += row;
    });
    element.innerHTML = html;
    window.scrollTo(0, document.body.scrollHeight);
  };
};
