# functions
def sample():
    return 'hello'
# parameters
def sample2(name):
    return f'hello {name}'


# Objects / Dictionaries
my_obj = {'a':1, 'b':2, 'c':3}
# declare object
print(my_obj)
# lookup key to retrieve value
print(my_obj['a'])
print(my_obj.keys())
print(my_obj.values())

def email(input1, input2):
    return f'{input1}.{input2}@evolveu.ca'


print(email('shane', 'mcguire'))
print(email(123, 12442))

#TAXES



def tax_function(input):
    b1 = 47630
    b2 = 95259
    b3 = 147667
    b4 = 210371
    if input < b1:
        calcResult = input*0.15
        effTax = calcResult/input*100
        result = round(calcResult,2)
        percentage = round(effTax,0)
        return f'result: ${result}, tax: {percentage}%'

    elif input >= b1 and input < b2:
        calcResult = (input - b1) * 0.205 + 7145
        effTax = calcResult/input * 100
        result = round(calcResult,2)
        percentage = round(effTax,0)
        return f'result: ${result}, tax: {percentage}%'

    elif input >= b2 and input < b3:
        calcResult = (input - b2) * 0.26 + 16908
        effTax = calcResult / input * 100
        result = round(calcResult,2)
        percentage = round(effTax,0)
        return f'result: ${result}, tax: {percentage}%'

    elif input >= b3 and input <= b4:
        calcResult = (input - b3) * 0.29 + 30535
        effTax = calcResult / input * 100
        result = round(calcResult, 2)
        percentage = round(effTax,0)
        return f'result: ${result}, tax: {percentage}%' 
    
    else:
        calcResult = (input - b4) * 0.33 + 48719
        effTax = calcResult / input * 100
        result = round(calcResult, 2)
        percentage = round(effTax,0)
        return f'result: ${result}, tax: {percentage}%'

print(tax_function(300000))