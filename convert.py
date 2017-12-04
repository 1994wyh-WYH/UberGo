import csv
import json

csvfile = open('restaurants.csv', 'r')
jsonfile = open('restaurants.json', 'w')

fieldnames = ("_id","restaurant_name","latitude","longitude","rating")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')