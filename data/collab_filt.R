#collaborative filtering
setwd("/Users/Joyce/Documents/Penn/4/CIS450/project/tables")
library(readr)

actors = read_csv("ACTORS.csv")
imdb_ratings = read_csv("IMDB_RATINGS.csv")
ml_ratings = read_csv("ML_RATINGS.csv")
movies = read_csv("MOVIES.csv")
names = read_csv("PEOPLENAMES.csv")
writdir = read_csv("WRITDIR.csv")
genres = read_csv("genres.csv")


movieID = 160438

users = ml_ratings[(ml_ratings$movielensid == movieID & ml_ratings$rating > 4),]

allOtherMovies = ml_ratings %>%
  filter(userId %in% users$userId) %>%
  filter(rating > 4) %>%
  filter(movielensid != movieID)

aggdata = aggregate(rating ~ movielensid, data = allOtherMovies, FUN = sum) %>%
  arrange(-rating) %>%
  head(5)

results = movies %>%
  filter(movielensid %in% aggdata$movielensid)

results
