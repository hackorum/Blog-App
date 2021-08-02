from flask import Flask, jsonify, request
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv("blogposts.csv")

all_blogs = df.values.tolist()
liked_blogs = []

app = Flask(__name__)


def like_blog_in_csv(blog_title):
    global all_blogs
    global df
    for index in df.index:
        if df.loc[index, "title"] == blog_title:
            df.loc[index, "likes"] = df.loc[index, "likes"] + 1
            break
    liked_blogs.append(blog_title)
    df.to_csv("blogposts.csv", index=False)
    all_blogs = df.values.tolist()


def get_recommendations(df, title, indices, cosine_sim):
    id_x = indices[title]
    sim_scores = list(enumerate(cosine_sim[id_x]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    blog_indices = [i[0] for i in sim_scores]
    return df[["title", "text", "likes"]].iloc[blog_indices].values.tolist()


@app.route("/get_blogs")
def get_blogpost():
    return jsonify({"data": all_blogs, "status": "success"})


@app.route("/like_blog", methods=["POST"])
def like_blog():
    like_blog_in_csv(request.args.get("title"))
    return {"data": liked_blogs, "status": "success"}


@app.route("/get_liked_blogs")
def get_liked_blogs():
    return {"data": liked_blogs, "status": "success"}


@app.route("/get_trending")
def get_trending():
    df_trending = df.sort_values("likes", ascending=False)
    trending_blogs = df_trending[["title", "text", "likes"]].head(20).values.tolist()
    return jsonify({"data": trending_blogs, "status": "success"})


@app.route("/get_recommended")
def get_recommended():
    df_copy = df.copy(deep=True)
    count = CountVectorizer(stop_words="english")
    count_matrix = count.fit_transform(df_copy["title"])
    cosine_sim = cosine_similarity(count_matrix, count_matrix)
    df_copy = df_copy.reset_index()
    indices = pd.Series(df_copy.index, index=df_copy["title"])
    all_recommended = []
    for liked_blog in liked_blogs:
        output = get_recommendations(df_copy, liked_blog, indices, cosine_sim)
        for data in output:
            all_recommended.append(data)
    import itertools

    all_recommended.sort()
    all_recommended = list(
        all_recommended for all_recommended, _ in itertools.groupby(all_recommended)
    )
    blog_data = []
    for blog in all_recommended:
        blogs_data = {"title": blog[0], "content": blog[1], "likes": blog[2]}
        blog_data.append(blogs_data)
    return jsonify({"data": blog_data, "status": "success"})


if __name__ == "__main__":
    app.run(debug=True)
