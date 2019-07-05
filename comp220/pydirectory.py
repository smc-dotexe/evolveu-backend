import os

folder_path = r"C:\\Users\\Shane\\Desktop\\FullStack\\evolveu\\python\\comp220"

def list_dir(dir):
    filenames = os.listdir(dir) 
    counter = 0
    for x in filenames:
        filesize = os.path.getsize(x)
        print('file name: ', x)
        print(f'file size: {filesize}kb')
        counter = counter + 1

        
    print(f'there are {counter} files in this folder')

list_dir(folder_path)