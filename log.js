const attendanceLog = document.getElementById("attendanceLog");
const checkInButton = document.getElementById("checkIn");
const checkOutButton = document.getElementById("checkOut");
const nameSelect = document.getElementById("name");

// WhatsApp number to send the log
const whatsappNumber = "254717831209"; // Kenyan phone number format (+254)

let attendanceData = [];

// Handle Check-In
checkInButton.addEventListener("click", () => {
  const name = nameSelect.value;
  if (!name) {
    alert("Please select your name!");
    return;
  }

  const now = new Date();
  const logEntry = { name, action: "Check-In", time: now.toLocaleString() };
  attendanceData.push(logEntry);
  updateLog();
  sendWhatsAppMessage(logEntry);
});

// Handle Check-Out
checkOutButton.addEventListener("click", () => {
  const name = nameSelect.value;
  if (!name) {
    alert("Please select your name!");
    return;
  }

  const now = new Date();
  const logEntry = { name, action: "Check-Out", time: now.toLocaleString() };
  attendanceData.push(logEntry);
  updateLog();
  sendWhatsAppMessage(logEntry);
});

// Update the attendance log
function updateLog() {
  attendanceLog.innerHTML = "";
  attendanceData.forEach((record) => {
    const logItem = document.createElement("li");
    logItem.textContent = `${record.name} - ${record.action} at ${record.time}`;
    attendanceLog.appendChild(logItem);
  });
}

// Send a WhatsApp message with attendance details
function sendWhatsAppMessage(logEntry) {
  const message = `Attendance Log:\nName: ${logEntry.name}\nAction: ${logEntry.action}\nTime: ${logEntry.time}`;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
