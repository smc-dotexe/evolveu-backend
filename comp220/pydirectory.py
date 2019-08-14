import os

folder_path = r"C:\\Users\\Shane\\Desktop\\FullStack\\evolveu\\python\\comp220"

def list_dir(dir):
    filenames = os.listdir(dir) 
    counter = 0
    total_size = 0 
    for x in filenames:
        filesize = os.path.getsize(x)
        print('file name: ', x)
        print(f'file size: {filesize}kb')
        counter = counter + 1
        total_size += filesize
        
    print(f'There are {counter} files in this folder. The total size: {total_size} ')

list_dir(folder_path)