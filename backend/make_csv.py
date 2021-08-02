import csv

headers = ["title", "text", "likes", "upload_time"]
with open("blogposts.csv", "w") as f:
    csvwriter = csv.writer(f)
    csvwriter.writerow(headers)
