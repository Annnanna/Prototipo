const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const translateButton = document.getElementById("translate");

const tradutorGeracional = {
  "cringe": "vergonhoso",
  "flopou": "não deu certo",
  "top": "muito bom",
  "massa": "legal",
  "daora": "interessante",
  "balada": "festa",
  "bugado": "com erro",
  "de boa": "tudo tranquilo",
  "vibe": "atmosfera",
  "brabo": "excelente"
};

const dicionarioSenior = {
  "constrangedor": "cringe",
  "não deu certo": "flopou",
  "muito bom": "top",
  "legal": "massa",
  "interessante": "daora",
  "festa": "balada",
  "com erro": "bugado",
  "tudo tranquilo": "de boa",
  "excelente": "brabo"
};

sendButton.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (!msg) return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("chat-message", "user");
  userMsg.innerHTML = `<strong>Você:</strong> ${msg}`;
  chatBox.appendChild(userMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
  messageInput.value = "";

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.classList.add("chat-message", "bot");
    botMsg.innerHTML = `<strong>Colega:</strong> Entendi! Interessante isso`;
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
});

translateButton.addEventListener("click", () => {
  const lastMsg = [...chatBox.getElementsByClassName("chat-message")].pop();
  if (!lastMsg) return;

  let texto = lastMsg.innerText.toLowerCase();
  let traduzido = texto;

  for (const [giria, formal] of Object.entries(tradutorGeracional)) {
    const regex = new RegExp(`\\b${giria}\\b`, "gi");
    traduzido = traduzido.replace(regex, formal);
  }

  for (const [formal, giria] of Object.entries(dicionarioSenior)) {
    const regex = new RegExp(`\\b${formal}\\b`, "gi");
    traduzido = traduzido.replace(regex, giria);
  }

  const traducaoFinal = document.createElement("div");
  traducaoFinal.classList.add("chat-message", "bot");
  traducaoFinal.innerHTML = `<strong>Tradução:</strong> ${traduzido}`;
  chatBox.appendChild(traducaoFinal);
  chatBox.scrollTop = chatBox.scrollHeight;
});

const feedbackText = document.getElementById("feedback-text");
const feedbackType = document.getElementById("feedback-type");
const submitFeedback = document.getElementById("submit-feedback");
const feedbackList = document.getElementById("feedback-list");

let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

function renderFeedbacks() {
  feedbackList.innerHTML = "";
  feedbacks.forEach(fb => {
    const div = document.createElement("div");
    div.classList.add("feedback-item");
    div.innerHTML = `<strong>${fb.tipo}:</strong> ${fb.texto}`;
    feedbackList.appendChild(div);
  });
}
renderFeedbacks();

submitFeedback.addEventListener("click", () => {
  const texto = feedbackText.value.trim();
  const tipo = feedbackType.value;
  if (!texto) return alert("Digite um feedback antes de enviar!");

  feedbacks.push({ texto, tipo });
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  renderFeedbacks();

  feedbackText.value = "";
});

const desafios = [
  "Compartilhe com um colega de outra geração uma ferramenta de trabalho que você usa frequentemente.",
  "Pergunte a alguém mais experiente sobre uma decisão difícil que já precisou tomar no trabalho.",
  "Explique um termo moderno de tecnologia a um colega que não o conheça.",
  "Escute a visão de um veterano sobre como era o trabalho há 20 anos e compare com hoje.",
  "Crie uma dupla com alguém de outra geração e resolvam juntos um pequeno problema cotidiano."
];

const ranking = [
  { equipe: "Fusão de Ideias", pontos: 120 },
  { equipe: "Geração Inovadora", pontos: 95 },
  { equipe: "Conexão Ativa", pontos: 80 },
  { equipe: "Time Legacy", pontos: 70 }
];

const mostrarDesafioBtn = document.getElementById("mostrar-desafio");
const mostrarRankingBtn = document.getElementById("mostrar-ranking");
const desafioBox = document.getElementById("desafio-atual");
const rankingTabela = document.getElementById("ranking-tabela").querySelector("tbody");

mostrarDesafioBtn.addEventListener("click", () => {
  const aleatorio = Math.floor(Math.random() * desafios.length);
  desafioBox.textContent = `Desafio da Semana: ${desafios[aleatorio]}`;
});

mostrarRankingBtn.addEventListener("click", () => {
  rankingTabela.innerHTML = "";
  ranking
    .sort((a, b) => b.pontos - a.pontos)
    .forEach((r, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${i + 1}</td><td>${r.equipe}</td><td>${r.pontos}</td>`;
      rankingTabela.appendChild(tr);
    });
});
