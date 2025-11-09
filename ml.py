
import pandas as pd
import numpy as np 
df= pd.DataFrame()

def update():
    a = pd.DataFrame()
    for i in ["May", "June", "July", "August", "September", "October"]:
        df = pd.read_excel(f"mai-shen-yun/{i}_Data_Matrix (1).xlsx")
        df["month"] = i
        a = pd.concat([a,df])
    
    a.to_csv("data/Data_Matrix (1).csv")