let ticketsValidés = JSON.parse(localStorage.getItem("ticketsValidés") || "[]");

function validerTicket() {
  const ticketId = document.getElementById("ticketInput").value.trim();
  if (!ticketId) {
    return afficher("⛔ Veuillez entrer un ID de ticket", "red");
  }

  fetch("tickets.json")
    .then(res => res.json())
    .then(data => {
      const valides = data.valid_tickets;

      if (!valides.includes(ticketId)) {
        afficher("❌ Ticket NON VALIDE", "red");
      } else if (ticketsValidés.includes(ticketId)) {
        afficher("⚠️ Ticket DÉJÀ UTILISÉ", "orange");
      } else {
        ticketsValidés.push(ticketId);
        localStorage.setItem("ticketsValidés", JSON.stringify(ticketsValidés));
        afficher("✅ Ticket VALIDE", "green");
      }
    });
}

function afficher(message, couleur) {
  const statut = document.getElementById("status");
  statut.innerText = message;
  statut.style.color = couleur;
}
