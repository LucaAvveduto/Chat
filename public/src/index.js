const md = document.getElementById("myModal");
const modal = new bootstrap.Modal(md);
const accessButton = document.getElementById("accessButton");
const modalInput = document.getElementById("modal-input");
const input = document.getElementById("input");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");
const errorDiv = document.getElementById("errorDiv");

const template = '<li class="list-group-item">%MESSAGE</li>';
const messages = [];

accessButton.onclick = () => {
  const val = modalInput.value;
  modalInput.value = "";  
  if (!val) return errorDiv.innerHTML = "<p>Username non valido</p>";
  modal.hide();
  const socket = io();
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
    render();
  });

  const render = () => {
    let html = "";
    messages.forEach((message) => {
      const row = template.replace("%MESSAGE", message);
      html += row;
    });
    chat.innerHTML = html;
    window.scrollTo(0, document.body.scrollHeight);
  };
};
