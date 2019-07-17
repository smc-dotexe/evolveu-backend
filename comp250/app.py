from flask import Flask, render_template, request, jsonify, redirect
from flask import url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import Column, Integer, String, Date, FLOAT
from sqlalchemy import create_engine, select
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app)
uri = 'postgres://postgres:cokeaddict@localhost:5432/test'
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app)


class Tech(db.Model):
    __tablename__ = 'tech'
    tech_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text)
    last_name = db.Column(db.Text)
    position = db.Column(db.Text)
    apprentice_year = db.Column(db.Integer)
    jobs = db.relationship('Jobs', backref='tech')

    def __init__(self, first_name, last_name, position, apprentice_year):
        self.first_name = first_name
        self.last_name = last_name
        self.position = position
        self.apprentice_year = apprentice_year

    def serialize(self):
        return {'tech_id': self.tech_id, 'first_name': self.first_name, 
                'last_name': self.last_name, 'position': self.position, 
                'apprentice_year': self.apprentice_year}


class Jobs(db.Model):
    __tablename__ = 'jobs'
    job_id = db.Column(db.Integer, primary_key=True)
    ro_number = db.Column(db.Integer, unique=True)
    company = db.Column(db.Text)
    description = db.Column(db.Text)
    tech_id = db.Column(db.Integer, db.ForeignKey('tech.tech_id'))
    est_completion = db.Column(db.Float)

    def __init__(self, ro_number, company, description, tech_id, est_completion):
        self.company = company
        self.ro_number = ro_number
        self.description = description
        self.tech_id = tech_id
        self.est_completion = est_completion
    
    def serialize(self):
        return {'job_id': self.job_id, 'company': self.company, 
                'description': self.description, 'tech_id': self.tech_id, 
                'est_completion': self.est_completion,
                'ro_number': self.ro_number}


class Parts(db.Model):
    __tablename__ = 'parts'
    parts_id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.job_id'))
    description = db.Column(db.Text)
    cost = db.Column(db.Float)

    def __init__(self, job_id, description, cost):
        self.job_id = job_id
        self.description = description
        self.cost = cost

    def serialize(self):
        return {'job_id': self.job_id, 'description': self.description,
                'cost': self.cost}


#################################
########## TECH SECTION ##########
#################################
@app.route('/tech')
def tech_list():
    techs = Tech.query.all()
    tech_list = [tech.serialize() for tech in techs]
    return jsonify(tech_list)


@app.route('/add_tech', methods=['GET', 'POST'])
def add_tech():
    if request.method == 'POST':
        json_data = request.get_json(force=True)
        add_data = Tech(first_name=json_data.get('first_name'),
                        last_name=json_data.get('last_name'),
                        position=json_data.get('position'),
                        apprentice_year=json_data.get('apprentice_year'))
        db.session.add(add_data)
        db.session.commit()
    else:
        print('FROM ELSE')
    return redirect(url_for('tech_list'))


@app.route('/remove_tech', methods=['GET', 'POST'])
def remove_tech():
    if request.method == 'POST':
        json_data = request.get_json(force=True)
        remove_data = Tech.query.filter_by(tech_id=json_data['tech_id']).first()
        db.session.delete(remove_data)
        db.session.commit()
    else:
        print('FROM REMOVE_TECH ELSE')
    return redirect(url_for('tech_list'))


@app.route('/edit_tech', methods=['POST'])
def edit_tech():
    if request.method == 'POST':
        json_data = request.get_json(force=True)
        techEdit = Tech.query.filter_by(tech_id=json_data['tech_id']).first()

        if techEdit is None:
            return f'tech not found - double-check tech_id ({json_data["tech_id"]})', 404
            
        techEdit.first_name = json_data['first_name']
        techEdit.last_name = json_data['last_name']
        techEdit.position = json_data['position']
        techEdit.apprentice_year = json_data['apprentice_year']
        db.session.commit()
    return jsonify(f'tech ({techEdit.first_name} {techEdit.last_name}) edited successfully'), 200


#################################
########## JOBS SECTION ##########
#################################
@app.route('/jobs')
def jobs_list():
    jobs = Jobs.query.all()
    job_list = [job.serialize() for job in jobs]
    return jsonify(job_list)


@app.route('/add_job', methods=['GET', 'POST'])
def add_job():
    if request.method == 'POST':
        json_data = request.get_json(force=True)
        add_data = Jobs(ro_number=json_data.get('ro_number'),
                        company=json_data.get('company'),
                        description=json_data.get('description'),
                        tech_id=json_data.get('tech_id'),
                        est_completion=json_data.get('est_completion'))
        db.session.add(add_data)
        db.session.commit()
    else:
        print('FROM ELSE')
    return redirect(url_for('jobs_list'))


#################################
########## PARTS SECTION ##########
#################################
@app.route('/parts')
def parts_list():
    parts = Parts.query.all()
    part_list = [part.serialize() for part in parts]
    return jsonify(part_list)

if __name__ == '__main__':
    app.run(debug=True)