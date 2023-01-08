
import wikipedia

#Wikipedia Scrape the English Wikipedia page for the article on Python
page = wikipedia.page("Python")

# Print the title of the page
print(page.title)

# Print the content of the page
print(page.content)