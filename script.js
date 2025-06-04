function askQuestion() {
  const question = document.getElementById("question").value;
  const responseDiv = document.getElementById("response");
  responseDiv.innerText = "Thinking...";

  tableau.extensions.initializeAsync().then(() => {
    const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];
    worksheet.getSummaryDataAsync().then(dataTable => {
      const data = dataTable.data.map(row => 
        row.map(cell => cell.formattedValue).join(", ")
      ).join("\n");

      fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, dashboardData: data })
      })
      .then(res => res.json())
      .then(json => responseDiv.innerText = json.answer)
      .catch(err => responseDiv.innerText = "Error: " + err.message);
    });
  });
}