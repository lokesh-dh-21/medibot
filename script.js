const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  // Show user message
  chatbox.innerHTML += `<p class="user-msg"><b>You:</b> ${message}</p>`;
  userInput.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  // Get bot response
  setTimeout(() => {
    const botResponse = getBotResponse(message);
    chatbox.innerHTML += `<p class="bot-msg"><b>MediBot:</b> ${botResponse}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 500);
}

function getBotResponse(input) {
  input = input.toLowerCase();

  // Simple symptom-based responses
  if (input.includes("tired") || input.includes("fatigue")) {
    return "You may be low on iron or vitamins. Please check your hemoglobin or consult a doctor.";
  }
  if (input.includes("headache")) {
    return "Headache can have many causes, including stress, dehydration, or vision problems.";
  }
  if (input.includes("low hemoglobin")) {
    return "Low hemoglobin suggests anemia. Consider iron-rich foods and see a doctor.";
  }
  if (input.includes("fever")) {
    return "Fever may indicate infection. Monitor your temperature and stay hydrated.";
  }

  return "Please provide more details about your symptoms or lab results for better guidance.";
}
