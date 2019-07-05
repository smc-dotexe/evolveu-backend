def file_test(fname):
    with open(fname) as f:
        else_count = 0
        char = 0
        line_count = 0
        data = f.readlines()
        for line in data:
            line_count = line_count + 1
            words = line.split() 
            char = char + len(line)
            for x in words:
                if x == 'else':
                    else_count = else_count + 1
        print('amount of lines: ', line_count)
        print('total characters: ',char)
        print('else statements: ',else_count)


file_test('basic.js')