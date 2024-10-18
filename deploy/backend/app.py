from flask import Flask, request, jsonify
import numpy as np
import keras
from nltk.tokenize import RegexpTokenizer
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import pickle
from sklearn.feature_extraction.text import CountVectorizer
import nltk
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})
# CORS(app)
# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})
nltk.download('stopwords')


model = keras.models.load_model('model.h5')
loaded_vec = CountVectorizer(vocabulary=pickle.load(open("feature.pkl", "rb")))

tokenizer = RegexpTokenizer(r'\w+')
en_stopwords = set(stopwords.words('english'))
ps = PorterStemmer()

def getStemmedReview(reviews):
    review = reviews.lower()
    review = review.replace('<br /><br />', "")
    
    tokens = tokenizer.tokenize(review)
    new_tokens = [token for token in tokens if token not in en_stopwords]
    stemmed_tokens = [ps.stem(token) for token in new_tokens]

    clean_review = ' '.join(stemmed_tokens)
    return clean_review

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    sample = data['text']  
    
    stemmed_sample = [getStemmedReview(sample)]
    x = loaded_vec.transform(stemmed_sample).toarray()  
    x = np.expand_dims(x, axis=1)  

    prediction = model.predict(x)[0][0]

    result = {
        'prediction': 'Positive' if prediction >= 0.5 else 'Negative',
        'confidence': float(prediction) , 
        'text': sample
    }
    
    return jsonify(result)



if __name__ == '__main__':
    app.run()
