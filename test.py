from flask import Flask, request, jsonify
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Your knowledge base containing responses
knowledge_base = {
    "how to use the app": "To use the video downloader app, follow these steps...",
    "where to purchase": "You can purchase the app from our website...",
    # Add more Q&A pairs here
}

# Preprocess the knowledge base questions
knowledge_base_preprocessed = [word_tokenize(question.lower()) for question in knowledge_base.keys()]

# Create TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))

# Fit and transform the knowledge base questions
tfidf_matrix = tfidf_vectorizer.fit_transform([" ".join(question) for question in knowledge_base_preprocessed])

# @app.route("/chatbot", methods=["POST"])
def chatbot(message):
    # user_message = request.json["user_message"]
    user_message = request.json[message]
    user_message_preprocessed = word_tokenize(user_message.lower())

    # Calculate cosine similarity between user input and knowledge base questions
    similarity_scores = cosine_similarity(tfidf_vectorizer.transform([" ".join(user_message_preprocessed)]), tfidf_matrix)
    max_similarity_index = similarity_scores.argmax()

    # Check if the similarity score is above a threshold (e.g., 0.7)
    threshold = 0.7
    if similarity_scores[0][max_similarity_index] >= threshold:
        response = knowledge_base[list(knowledge_base.keys())[max_similarity_index]]
    else:
        response = "I'm sorry, I don't understand that question."

    return jsonify({"bot_response": response})

ans  = chatbot("how do i download")
print(ans)

#
# if __name__ == "__main__":
#     app.run(debug=True)
