<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputHash = $_POST['hash'] ?? '';

    // Charger les hash valides depuis le fichier JSON
    $hashes = json_decode(file_get_contents('hashes.json'), true);

    // Vérifier si le hash saisi est dans la liste
    if (in_array($inputHash, $hashes['hashes'])) {
        echo "<h2 style='color:green;'>✅ Ticket VALIDE</h2>";
    } else {
        echo "<h2 style='color:red;'>❌ Ticket INVALIDE</h2>";
    }
    echo "<a href='index.php'>🔙 Retour</a>";
} else {
    header("Location: index.php");
    exit;
}
