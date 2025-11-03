const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    chatbox.innerHTML += `<p class="user-msg"><b>You:</b> ${message}</p>`;
    userInput.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;

    setTimeout(() => {
        const botResponse = getBotResponse(message);
        chatbox.innerHTML += `<p class="bot-msg"><b>MediBot:</b> ${botResponse}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 500);
}

function getBotResponse(input) {
    input = input.toLowerCase();

    // Symptom-based responses
    if (input.includes("tired") && input.includes("cold")) {
        return "These symptoms may indicate hypothyroidism. Please check your TSH, T3, and T4 levels.";
    }
    if (input.includes("nervous") || input.includes("palpitations")) {
        return "These symptoms may indicate hyperthyroidism. Consider checking thyroid hormone levels.";
    }

    // Extract lab values (supports = or :) and ignores units
    const tshMatch = input.match(/tsh\s*[:=]\s*([\d.]+)/i);
    const t3Match = input.match(/t3\s*[:=]\s*([\d.]+)/i);
    const t4Match = input.match(/t4\s*[:=]\s*([\d.]+)/i);
    const tpoMatch = input.match(/anti[-\s]?tpo\s*[:=]\s*([\d.]+)/i);

    if (tshMatch && t3Match && t4Match) {
        const tsh = parseFloat(tshMatch[1]);
        const t3 = parseFloat(t3Match[1]);
        const t4 = parseFloat(t4Match[1]);
        const tpo = tpoMatch ? parseFloat(tpoMatch[1]) : null;

        // Hypothyroidism
        if (tsh > 4.0 && t3 < 2.3 && t4 < 0.8) return "Lab results suggest hypothyroidism. Consult an endocrinologist.";
        // Hyperthyroidism
        if (tsh < 0.4 && t3 > 4.2 && t4 > 1.8) return "Lab results suggest hyperthyroidism. Please consult a doctor.";
        // Subclinical Hypothyroidism
        if (tsh > 4.0 && t3 >= 2.3 && t4 >= 0.8) return "Subclinical hypothyroidism detected. Regular monitoring is advised.";
        // Normal
        if (tsh >= 0.4 && tsh <= 4.0 && t3 >= 2.3 && t3 <= 4.2 && t4 >= 0.8 && t4 <= 1.8) return "Your thyroid levels are normal. Keep a healthy lifestyle and routine checkups.";

        return "Lab values detected but pattern is unclear. Consult a doctor for detailed analysis.";
    }

    return "Please provide symptoms or lab results in the format: TSH = value, T3 = value, T4 = value, optionally Anti-TPO = value.";
}
