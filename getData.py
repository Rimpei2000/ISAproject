import pandas as pd
import requests

CLIENT_ID = "MjYyMTcwNTd8MTY0NzkwNDI1My4wNTExMzMy"
path = "https://api.seatgeek.com/2/events?client_id=" + CLIENT_ID


res = requests.get(path)
events = res.json()['events']
for event in events:
    print(event)
