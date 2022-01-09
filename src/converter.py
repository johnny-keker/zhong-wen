result = ''

with open("chineese.csv", 'r') as f:
  for line in f.readlines():
    data = line.split(',')
    result += f"{{\n\"consonant\": \"{data[0]}\",\n\"vovel\":\"{data[1]}\",\n\"tone\": {data[2]},\n\"sym\":\"{data[3]}\",\n\"pinin\":\"{data[4]}\",\n\"translation\": \"{data[5][:-1]}\"\n}},\n"

print(result)