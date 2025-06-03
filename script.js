function askQuestion() {
  const userQuestion = document.getElementById("question").value;
  document.getElementById("response").innerHTML = "<em>Loading...</em>";

  tableau.extensions.initializeAsync().then(() => {
    const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];
    worksheet.getSummaryDataAsync().then((summaryData) => {
      const data = summaryData.data.map(row => 
        row.map(cell => cell.formattedValue).join(", ")
      ).join("\n");

      const payload = {
        question: userQuestion,
        dashboardData: data
      };

      fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(json => {
        document.getElementById("response").innerText = json.answer;
      })
      .catch(err => {
        document.getElementById("response").innerText = "Error: " + err.message;
      });
    });
  });
}