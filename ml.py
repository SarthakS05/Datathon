
import pandas as pd
import numpy as np 
df= pd.DataFrame()


df = pd.concat([pd.read_excel(f"mai-shen-yun/{i}_Data_Matrix (1).xlsx") for i in ["May", "June", "July", "August", "September", "October"]], axis = 0)
df.to_csv("mai-shen-yun/Data_Matrix (1).csv")