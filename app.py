from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # Allow Tableau extension requests

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "")
    dashboard_data = data.get("dashboardData", "")

    prompt = f"""You are a data analyst. Use the following dashboard data to answer the question:
    Data:
    {dashboard_data}

    Question:
    {question}
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )
        answer = response['choices'][0]['message']['content']
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
