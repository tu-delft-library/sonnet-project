import pandas as pd

df_sonnets = pd.read_json('Output/textData_v7.json', orient='index')


for i, research in df_sonnets.iterrows():
    line_dict = dict()
    if not research['Poem'] == 'NaN':
        for sonnet in research['Poem']:
            form = research['Poem'][sonnet]
            poem_lines = form.splitlines()
            poem_lines = [line for line in poem_lines if line != '']

            line_dict[sonnet] = len(poem_lines)
        df_sonnets.loc[i, 'line_cnt'] = [line_dict]
    else:
        df_sonnets.loc[i, 'line_cnt'] = 'NaN'

df_sonnets.to_json('Output/textData_v7.json', orient='index')