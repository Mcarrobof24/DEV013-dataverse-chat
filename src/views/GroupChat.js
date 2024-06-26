import { data } from "./../data/dataset.js";
import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { navigateTo } from "../router.js";
import { communicateWithOpenAI } from "./../lib/openAIApi.js";

export const GroupChat = () => {
  document.title = "Group Chat";
  const container = document.createElement("div");
  const blueContainer = document.createElement("div");
  blueContainer.className = "background-blue";
  const containerContacts = document.createElement("aside");
  containerContacts.className = "container-contacts";
  const list = document.createElement("div");
  list.className = "list";
  const titleContacts = document.createElement("div");
  titleContacts.className = "title-contacts";
  titleContacts.innerHTML = `
    <h2 class="title-contacts-group">Contacts</h2>
    <button class="close-contacts"><i class="bi bi-x-lg"></i></button>
  `;
  let contacts = "";
  data.forEach((card) => {
    contacts += `
    <section class="contacts-style">
      <img class="imag-chat-group" src="${card.imageUrl}" alt="${card.name}">
      <div class= "header-chat-group">
        <h3 class= "name-cruise">${card.name}</h3>
        <p class="online-group"><i class="bi bi-circle-fill"></i>Online</p>
      </div>
    </section>
    `;
  });
  list.innerHTML = contacts;
  containerContacts.append(titleContacts, list);

  const whiteContainer = document.createElement("div");
  whiteContainer.className = "background-white group chat";
  const whiteContainerSecondPart = document.createElement("div");
  whiteContainerSecondPart.className = "chat-group-text";
  whiteContainerSecondPart.innerHTML = `
    <header class="infor-title-group">
      
      <h2 class="group-chat-title"><button class="open-contacts"><i class="bi bi-people-fill symbol-contacts"></i></button>Group Chat</h2>
      <div class="container-buttons-group">
        <button class="apiKey-symbol-chat"><i class="bi bi-key-fill"></i></button>
        <button class="close close-groupchat"><i class="bi bi-x-lg"></i></button>
      </div>
    </header>
    <article class="chat-background group-background">
      <div class="body-chat">
      </div>
      </section>
      <section class="message-bar">
        <textarea class="text-input" placeholder="Write a new message"></textarea>
        <button class="send-message"><i class="bi bi-send"></i></button>
      </section>
    </article>`;

  whiteContainer.append(containerContacts, whiteContainerSecondPart);
  blueContainer.append(Header(), whiteContainer);
  container.append(blueContainer, Footer());

  const buttonClose = whiteContainer.querySelector(".close");
  buttonClose.addEventListener("click", () => {
    navigateTo("/cards");
  });
  const keyButton = whiteContainer.querySelector(".apiKey-symbol-chat");
  keyButton.addEventListener("click", () => {
    navigateTo("/ApiKey");
  });

  /* Create const to access html attributes */
  const sendMessageButton = whiteContainer.querySelector(".bi-send");
  const userInput = whiteContainer.querySelector(".text-input");
  const chatWindow = whiteContainer.querySelector(".body-chat");

  //Scroll
  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
  }

  sendMessageButton.addEventListener("click", () => {
    /* User message container */
    const userInputValue = userInput.value;
    const userContainer = document.createElement("div");
    userContainer.className = "textBubble user";
    userContainer.textContent = userInputValue;
    userInput.value = "";

    chatWindow.append(userContainer);

    data.forEach(async (element) => {
      const chatAPI = document.createElement("div");
      chatAPI.className = "textBubble chatAPI";
      const chatAPIResponse = await communicateWithOpenAI(
        element.description,
        userInputValue
      );

      chatAPI.innerHTML = `<h2>${element.name}</h2>
      <p>${chatAPIResponse}</p>
      `;
      chatWindow.append(chatAPI);
      scrollToBottom();
    });
  });

  //Para el responsive
  const blockContacts = whiteContainer.querySelector(".container-contacts");
  const closeContacts = whiteContainer.querySelector(".close-contacts");
  const openContacts = whiteContainer.querySelector(".open-contacts");
  openContacts.addEventListener("click", () => {
    blockContacts.classList.add("visible");
  });
  closeContacts.addEventListener("click", () => {
    blockContacts.classList.remove("visible");
  });

  return container;
};
