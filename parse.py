
#Step 1 print the list of file name as corresponding id 
import numpy as np
import os
import glob
import pandas as pd
import json
import csv

#print file name with extension 
txtfiles = []
for file in glob.glob("notes/*.txt"):
    txtfiles.append(file)

# print(txtfiles)
# print(type(txtfiles))
# print(len(txtfiles))

#print file name without extension 
path = 'notes' 
filenames = [os.path.splitext(filename)[0] for filename in os.listdir(path)]
# print (filenames)
# print(type(filenames))
# print(len(filenames))

#Step 2 print the list of file content as description 
file_list = glob.glob(os.path.join(os.getcwd(), "notes", "*.txt"))

corpus = []
for file_path in file_list:
    with open(file_path) as f_input:
        corpus.append(f_input.read())
# print(corpus)
# print(type(corpus))
# print(len(corpus))


print(filenames[0])
#Step 3 convert list to df then to json files as import data
df = pd.DataFrame({'name':filenames})
df['id'] = df.index
#print(df)
df_top200= df[:200] 
# print(df_top200)
json_name=df.to_json(orient='records')
json_name_200=df_top200.to_json(orient='records')
#print(df.to_json(orient='records'))
with open('json_name.json', 'w') as f:
    f.write(json_name)
with open('json_name_200.json', 'w') as f:
    f.write(json_name_200)



df2 = pd.DataFrame(corpus)
#df2['id'] = df2.index
df2_top200= df2[:200]
# print(df)
# print(df2)
df2_top200.to_csv("discharge_200.csv")
json_note=df2.to_json(orient='index')
json_note_200=df2_top200.to_json(orient='index')
#print(df.to_json(orient='index'))
with open('json_note.json', 'w') as f:
    f.write(json_note)
with open('json_note_200.json', 'w') as f:
    f.write(json_note_200)








