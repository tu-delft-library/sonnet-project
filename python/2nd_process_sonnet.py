import pandas as pd
import requests
from bs4 import BeautifulSoup
from generate_poem import poemify
import similarity_report as sr

df_sonnets = pd.read_json('Output/textData_v7.json', orient='index')

for i, row in df_sonnets.iterrows():
    # Fill in still missing Poems
    if row['Poem'] == 'NaN':
        repo_page = requests.get(row["url"])
        language = row['Language']
        soup = BeautifulSoup(repo_page.text, 'html.parser')

        abstract = soup.find('meta', {"name": "citation_abstract"})
        if abstract is not None:
            abstract = abstract['content']
            df_sonnets.loc[i, 'Abstract'] = abstract
            poems = poemify(abstract, language)
            df_sonnets.at[i, 'Poem'] = poems
            jac_list = []
            intersect_list = []

            for poem in poems.values():
                jac_list.append(sr.jac_dist(row['Sonnet text'], poem.replace("\n", " ")))
                intersect_list.append(sr.word_intersect(row['Sonnet text'], poem.replace("\n", " ")))
            df_sonnets.at[i, 'Jaccard distance'] = jac_list

            df_sonnets.at[i, 'Word intersect'] = intersect_list
        else:
            print("No abstract available for: {}".format(row['Research title']))
    #
    elif any([value == 14 for value in df_sonnets.loc[0, 'line_cnt'].values()]):
        print("No 14 line sonnet for {}".format(row['Research title']))
