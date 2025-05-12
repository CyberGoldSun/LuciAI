from flask import render_template, request
from application import app
import os
from openai import OpenAI

os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"

@app.route("/")
def homepage():
    return render_template('home.html')


def response(query):
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": query
            }
        ],
        model="gpt-4o-mini",
    )

    return chat_completion.choices[0].message.content


@app.route("/chat", methods=["GET", "POST"])
def agentic():
    q = request.form["query"]
    return response(q)



