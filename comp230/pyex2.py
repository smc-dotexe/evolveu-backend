import openpyxl
from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
import json
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 
print('test')

class Customer:
    def __init__(self, cust_num, cust_name, address, phone, contact):
        self.cust_num=cust_num 
        self.cust_name=cust_name 
        self.address=address 
        self.phone=phone 
        self.contact=contact

    def __reper__(self):
        return f'Customer: {self.cust_name}, Address: {self.address}, Contact: {self.contact}'

class Invoice:
    def __init__(self, invoice_num, cust_num, date):
        self.invoice_num = invoice_num
        self.cust_num = cust_num
        self.date = date


    def __repr__(self):
        return f'Invoice num {self.invoice_num} cust num {self.cust_num}'

class Product:
    def __init__(self, product_num, product, cost):
        self.product_num=product_num
        self.product=product
        self.cost=cost


class Worker:
    book = openpyxl.load_workbook('invoice_spreadsheet2.xlsx')
    sheets = book.sheetnames
    customer_sheet=book[sheets[0]]
    invoice_sheet=book[sheets[1]]
    line_sheet=book[sheets[2]]
    product_sheet=book[sheets[3]]
    customer_dict={}
    invoice_dict={}
    line_dict={}
    product_dict={}
    duplicate_list=[]

    def __init__(self):
        for row in self.line_sheet.values:
            cell_a = row[:1][0]
            cell_b = row[1:2][0]
            cell_c = row[2:3][0]

            if cell_a in self.line_dict.keys():
                self.line_dict[cell_a].update({cell_b:cell_c})
            else:
                self.line_dict[cell_a]={cell_b:cell_c}

        for row in self.customer_sheet.values:
            if row[1] not in self.customer_dict:
                self.customer_dict[row[0]] = Customer(row[0],row[1],row[2],row[3],row[4])
            else:
                print('found dup')

        for row in self.invoice_sheet.values:
            if row not in self.invoice_dict:
                self.invoice_dict[row[0]] = Invoice(row[0], row[1], row[2])
            else:
                print('duplicate')
        
        for row in self.product_sheet.values:
            if row not in self.product_dict:
                self.product_dict[row[0]] = Product(row[0], row[1], row[2])
            else:
                print('duplicate')
                
    def __repr__(self):
        return self.customer_dict

    def validation(self):
        duplicates=[]
        for x in self.customer_sheet.values:
            if x[1] not in duplicates and x[1] != None:
                duplicates.append(x[1])
            else:
                print('Found error:', x[1])
        
        

worker=Worker()
worker.validation()
json_dict = {}
json_arr = []

def create_json():
    customer = worker.customer_dict
    for x in customer:
        obj={}
        obj['customer_name']=customer[x].cust_name
        obj['address']=customer[x].address
        json_arr.append(obj)
    return json_arr

print(worker.customer_dict.keys())
def create_invoice(num):
    if num in worker.invoice_dict.keys():
        cust_from_inv = worker.invoice_dict[num].cust_num
        customer_print=worker.customer_dict[cust_from_inv]
        key_lines = list(worker.line_dict[num].keys())
        value_lines = list(worker.line_dict[num].values())
        product_num_list=[]
        for index in key_lines:
            product_cost=worker.product_dict[index].cost
            product_num_list.append(product_cost)

        with open('invoice.txt', 'w') as f:
            f.write(f'Invoice No.:{worker.invoice_dict[num].invoice_num} \n'\
                    f'Date: {worker.invoice_dict[num].date}\n') 
            f.write(f'{customer_print.cust_name}\n' \
                    f'{customer_print.address}\n' \
                    f'{customer_print.phone}\n'
                    f'{customer_print.contact}\n')
            f.write('--------------------------------\n')
            f.write(f'Product: {", ".join([str(worker.product_dict[x].product) for x in key_lines])}\n')
            f.write(f'Price: {", ".join([str(worker.product_dict[x].cost) for x in key_lines])}\n')
            f.write(f'Quantity: {", ".join([str(x) for x in value_lines])}\n')
            f.write('--------------------------------\n')
            f.write(f'Total: {grand_total(product_num_list, value_lines)} ')
            
            f.close()
    else:
        print('could not find invoice')

def grand_total(a, b):
    total = 0
    for x, y in zip(a, b):
        print(x, y)
        z = x*y
        total += z
    return round(total, 2)    

create_invoice(42)
create_json()

@app.route('/')
def index():
    return jsonify(create_json())


@app.route('/template')
def template():
    return render_template('index.html', customers=worker.customer_dict)

@app.route('/react')
def react():
    return json.dumps(json_arr)




if __name__ == '__main__':
    app.run(debug=True)







