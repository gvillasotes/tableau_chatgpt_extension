from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data["question"]
    dashboard_data = data["dashboardData"]

    prompt = f"You are a data analyst. Use this data:\n{dashboard_data}\n\nQuestion: {question}"

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    answer = response["choices"][0]["message"]["content"]
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
