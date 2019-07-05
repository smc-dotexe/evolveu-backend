import csv 

sector_dict = {}
classes_dict={}

def third_time():
    path = "Census_by_Community_2018.csv"
    file = open(path, newline='')
    reader = csv.reader(file)
    next(reader) 
    global counter
    counter = 0
    for row in reader:
        counter += 1
        key_classes = row[0]
        key_sector = row[4]
        value = int(row[9])

        if key_classes in classes_dict.keys():
            classes_dict[row[0]] += value
        else:
            classes_dict[row[0]] = value
        
        if key_sector in sector_dict.keys():
            sector_dict[row[4]] += value 
        else:
            sector_dict[row[4]] = value


third_time()
print('classes_dict: ', classes_dict)
print('sector_dict: ', sector_dict)
print('counter: ', counter)

with open("report.txt", "w") as f:
    for key,value in classes_dict.items():
        f.write(f"{key}: {value}")
        f.write("\n")
    f.write("------------------------\n")
    for key,value in sector_dict.items():
        f.write(f"{key}: {value}")
        f.write("\n")
    f.write("------------------------\n")
    f.write(f"Lines counted: {counter}")