from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
app = Flask(__name__)

people = {1:{'fname':'shane', 'lname':'mcguire','age':30},
		  5:{'fname':'sarah', 'lname':'alonso','age':31},
		  12:{'fname':'zobel', 'lname':'hill','age':14}
		 }

@app.route("/")
def hello():
    return "Hello World from <h1 style='color:blue'>shane</h1>"


@app.route("/admin/")
@app.route("/admin")
@app.route("/admin/<myid>/")
@app.route("/admin/<myid>")
def admin(myid=None):
	print('people:', people)
	print ('my id is:', myid)
	return render_template("person.html",
		testval="Some Value So We know it works", 
		person=people.get(myid,{'fname':'Who Knows'}))

@app.route("/info/")
@app.route("/info")
def info():
	resp = jsonify(people)
	print('---json---:', resp.response)
	return resp, 200

@app.route("/update/")
def update():
        return "you are in the UPDATE route for Shane"

if __name__ == '__main__':
        # app.run(host='0.0.0.0', debug=True)
		app.run(debug=True)