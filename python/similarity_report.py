import nltk
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.metrics.distance import jaccard_distance
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer

nltk.download('punkt')
stop_words = set(stopwords.words('english'))

tokenizer = RegexpTokenizer(r'\w+')


def jac_dist(text1, text2):
    t1_tokens = tokenizer.tokenize(text1.lower())
    t2_tokens = tokenizer.tokenize(text2.lower())
    t1_without_sw = [word for word in t1_tokens if not word in stopwords.words()]
    t2_without_sw = [word for word in t2_tokens if not word in stopwords.words()]
    return jaccard_distance(set(t1_without_sw), set(t2_without_sw))


def word_intersect(text1, text2):
    t1_tokens = tokenizer.tokenize(text1.lower())
    t2_tokens = tokenizer.tokenize(text2.lower())
    t1_without_sw = [word for word in t1_tokens if not word in stopwords.words()]
    t2_without_sw = [word for word in t2_tokens if not word in stopwords.words()]
    return list(set(t1_without_sw).intersection(t2_without_sw))


def calc_tfidf(text1, text2):
    corpus = [text1, text2]
    vectorizer = TfidfVectorizer(use_idf=True)

    vector_out = vectorizer.fit_transform(corpus)

    df = pd.DataFrame(vector_out[0].T.todense(), index=vectorizer.get_feature_names(), columns=["TF-IDF"])
    df = df.sort_values('TF-IDF', ascending=False)

    return df
