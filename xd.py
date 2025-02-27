import requests

xd = requests.get('https://imdb.iamidiotareyoutoo.com/search',params={'q':'Casa'})
print(xd.json())