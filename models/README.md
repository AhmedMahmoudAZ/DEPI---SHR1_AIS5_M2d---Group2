## Twitter Sentiment Analysis

This project demonstrates how to classify tweets as **positive** or **negative** using machine learning models like **Logistic Regression** and **Random Forest**. It uses a cleaned Twitter dataset and applies **TF-IDF vectorization** to convert text into numerical features.

---

## Steps Overview

1. **Load Dataset**: Load and clean the data.
2. **Data Preprocessing**: Convert text data using TF-IDF.
3. **Train-Test Split**: Split the data into training and testing sets.
4. **Model Training**: Train Logistic Regression and Random Forest models.
5. **Evaluate Models**: Measure performance using accuracy, classification reports, and confusion matrices.
6. **Predict Sentiment**: Test models with new tweets.

---

## Prerequisites

```bash
pip install pandas numpy scikit-learn matplotlib seaborn
```

---

## Code Explanation

### 1. Load Dataset
The dataset is loaded from a CSV file named `cleaned_twitter_data (3).csv`. It contains:
- **`stemmed_content`**: Processed tweet text.
- **`target`**: Sentiment label (0 = Negative, 1 = Positive).

```python
df = pd.read_csv('cleaned_twitter_data (3).csv')
df = df.dropna()  # Remove missing values
```

### 2. Split Data into Features and Target
We use `X` for the tweet text and `y` for the sentiment labels.

```python
X = df['stemmed_content']
y = df['target']
```

### 3. Train-Test Split
The data is split into **80% training** and **20% testing** sets.

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

### 4. TF-IDF Vectorization
We convert the tweet text into numerical features using TF-IDF.

```python
tfidf = TfidfVectorizer(max_features=5000)
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)
```

### 5. Train Models and Evaluate
A function is used to train models, make predictions, and display performance results.

```python
def train_and_evaluate_model(model, X_train, X_test, y_train, y_test, model_name):
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    print(f"{model_name} Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print(classification_report(y_test, y_pred))
    
    cm = confusion_matrix(y_test, y_pred)
    sns.heatmap(cm, annot=True, cmap='Blues')
    plt.show()

# Train and evaluate models
lr_model = LogisticRegression(max_iter=1000, random_state=42)
train_and_evaluate_model(lr_model, X_train_tfidf, X_test_tfidf, y_train, y_test, "Logistic Regression")

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
train_and_evaluate_model(rf_model, X_train_tfidf, X_test_tfidf, y_train, y_test, "Random Forest")
```

### 6. Feature Importance (Random Forest)
Visualize the top 20 important features from the Random Forest model.

```python
feature_importance = pd.DataFrame({
    'feature': tfidf.get_feature_names_out(),
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

sns.barplot(x='importance', y='feature', data=feature_importance.head(20))
plt.show()
```

### 7. Predict Sentiment of New Tweets

```python
def predict_sentiment(model, vectorizer, tweets):
    tweets_tfidf = vectorizer.transform(tweets)
    predictions = model.predict(tweets_tfidf)
    return ['Positive' if pred == 1 else 'Negative' for pred in predictions]

new_tweets = [
    "I love this product!",
    "Worst experience ever.",
    "It's a sunny day!"
]

lr_predictions = predict_sentiment(lr_model, tfidf, new_tweets)
rf_predictions = predict_sentiment(rf_model, tfidf, new_tweets)

for tweet, lr_pred, rf_pred in zip(new_tweets, lr_predictions, rf_predictions):
    print(f"Tweet: {tweet}")
    print(f"Logistic Regression: {lr_pred}")
    print(f"Random Forest: {rf_pred}\n")
```
