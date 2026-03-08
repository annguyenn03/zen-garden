import pandas as pd
from zipfile import ZipFile

# Read the dataset from the zip file and extract the first 20,000 rows
zip_path = "data/training.1600000.processed.noemoticon.csv.zip"
with ZipFile(zip_path) as z:
    with z.open("training.1600000.processed.noemoticon.csv") as f:
        data = pd.read_csv(f, encoding="latin-1", nrows=20000)

print(data)