    let ticketsData = [];
    const scannedTickets = {};
    let html5QrCode;

    // Charger les tickets depuis tickets.json
    fetch("tickets.json")
      .then(response => response.json())
      .then(data => {
        ticketsData = data;
        startScanner();
      })
      .catch(error => {
        document.getElementById("result").textContent = "Erreur de chargement des tickets.";
        console.error("Erreur chargement JSON :", error);
      });

    function onScanSuccess(qrCodeMessage) {
      const resultDiv = document.getElementById("result");
      const ticketId = qrCodeMessage.trim();

      html5QrCode.stop(); // Stopper le scanner après un scan
      document.getElementById("next-btn").style.display = "inline-block";

      // Recherche du ticket dans le JSON
      const ticketInfo = ticketsData.find(t => t.ticketId === ticketId);

      if (!ticketInfo) {
        resultDiv.textContent = `❌ Ticket invalide : ${ticketId}`;
        resultDiv.className = "invalid";
        return;
      }

      if (ticketId in scannedTickets) {
        const info = scannedTickets[ticketId];
        resultDiv.textContent = `⚠️ Ticket : ${ticketInfo.NameTicket} déjà scanné \n📅 Le ${info.date} à ${info.heure}`;
        resultDiv.className = "invalidd";
        return;
      }

      const now = new Date();
      const date = now.toLocaleDateString("fr-FR");
      const heure = now.toLocaleTimeString("fr-FR");

      scannedTickets[ticketId] = { date, heure };

      resultDiv.textContent = `✅ Ticket validé \n🎫 Ticket : ${ticketInfo.NameTicket}\n ${ticketInfo.format}\n📅 Le ${date} à ${heure}`;
      resultDiv.className = "valid";
    }

    function onScanFailure(error) {
      // Ignorer erreurs
    }

    function startScanner() {
      html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        onScanFailure
      );
    }

    function restartScanner() {
      document.getElementById("result").textContent = "";
      document.getElementById("next-btn").style.display = "none";
      startScanner();
    }