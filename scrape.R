library(rvest)

#get tconst
tconst = "tt6791096"

#make url
url = paste("https://www.imdb.com/title/", tconst, sep = "")

#read html file
scrape_imdb = read_html(url)

#get photo src
one = html_nodes(scrape_imdb, 'div.poster img') %>%
  html_attr("src")
one
