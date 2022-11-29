import pandas as pd
import requests

from bs4 import BeautifulSoup
from generate_poem import poemify
import similarity_report as sr

df_excel = pd.read_excel("poem_sheet.xlsx", sheet_name="TUD", header=0)
df_excel['Abstract'] = 'NaN'
df_excel['Poem'] = 'NaN'
df_excel['Jaccard distance'] = 'NaN'
df_excel['Word intersect'] = 'NaN'

for i, row in df_excel.iterrows():
    repo_page = requests.get(row["url"])
    language = row['Language']
    soup = BeautifulSoup(repo_page.text, 'html.parser')

    abstract = soup.find('meta', {"name": "citation_abstract"})
    if abstract is not None:
        abstract = abstract['content']
        df_excel.loc[i, 'Abstract'] = abstract
        poems = poemify(abstract, language)
        df_excel.at[i, 'Poem'] = poems
        jac_list = []
        intersect_list = []

        for poem in poems.values():
            jac_list.append(sr.jac_dist(row['Sonnet text'], poem.replace("\n", " ")))
            intersect_list.append(sr.word_intersect(row['Sonnet text'], poem.replace("\n", " ")))
        df_excel.at[i, 'Jaccard distance'] = jac_list

        df_excel.at[i, 'Word intersect'] = intersect_list
    else:
        print("No abstract available for: {}".format(row['Research title']))

df_excel.to_json("Output/textData_v2.json", orient='index')
