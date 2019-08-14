<h1>EvolveU's Back-end Section</h1>
<p>These were competencies assigned for the second half of the 6-month bootcamp. Python, Flask, SQLAlchemy, PostgreSQL were the
languages/frameworks/libraries used. Like the front-end section, these were competencies that were built on top of the last.</p>

<hr/>

<h3>comp220 folder</h3>
<p><b>"pyreading.py"</b> involves reading a JavaScript file and printing a report in a .txt file. The report includes how many lines of code
there are, how many "else" statements and how many characters there are in total.</p>

<p><b>"pydirectory.py"</b> reads each file and their size (in kb) in the current directory and prints how many files there are with 
the total amount of the file sizes</p>

<p><b>"pycitycensus.py"</b> This was the first introduction to working with data using Calgary's "Census By Community 2018".
It totals the "res_cnt" by "CLASS" and "SECTOR". Then it counts the number of lines in the data, and prints a report in a ".txt" file
with those numbers.
</p>

<hr />

<h3>comp230 folder (in combination with comp240)</h3>
<p><b>"pyex2.py"</b>This program reads the "invoice_spreadsheet2.xlsx" and checks for any errors in the spreadsheet (duplicates and empty spaces). It uses an OOP approach to store the data, so when the user inputs the invoice number, it grabs all the information involved and prints the invoice via .txt file. The program also creates a json file with the company's name and address for the "comp240" assignment.<br/>
For the endpoints on "pyex2.py", the "/" displays the information on the json. "/template" uses Flask to loop through the json and display the information on a static html page. "/react" when run is for the "GET" request in the front-end section to receive the json and render the data in the react component. 
</p>

<hr />

<h3>comp250 folder</h3>
<p>This is a "Full-Stack" application. Using React the user can start creating a database of employees (technicians), jobs and parts needed for the job. <b>"app.py"</b> uses SQLAlchemy to create tables in PostgreSQL. The user is able to use CRUD methods for certain data. The front-end fetches the data and displays it dynamically using tables. React-Router was used to conditionally render each section.
</p>
