document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("message-form");
  const input = document.getElementById("text");
  const chatBody = document.getElementById("chat-body");

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function createMessageBubble(text, sender) {
    const message = document.createElement("div");
    message.className = `bubble ${sender}-bubble`;
    message.textContent = text;
    return message;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    // Display user's message
    const userMsg = createMessageBubble(userText, "user");
    chatBody.appendChild(userMsg);
    input.value = "";
    scrollToBottom();

    // Display "bot is typing..." message
    const typingIndicator = createMessageBubble("LuciAI is typing...", "bot");
    typingIndicator.classList.add("loading");
    chatBody.appendChild(typingIndicator);
    scrollToBottom();

    // Send message to backend
    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ query: userText }),
      });

      const data = await response.text();
      chatBody.removeChild(typingIndicator);

      const botMsg = createMessageBubble(data, "bot");
      chatBody.appendChild(botMsg);
      scrollToBottom();
    } catch (error) {
      chatBody.removeChild(typingIndicator);
      const errorMsg = createMessageBubble("An error occurred. Please try again.", "bot");
      chatBody.appendChild(errorMsg);
      scrollToBottom();
    }
  });
});
