from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, select
from app import Tech, Jobs, Parts

engine = create_engine('postgres://postgres:cokeaddict@localhost:5432/test')

conn = engine.connect()
x = select([Tech])
result = conn.execute(x)

for row in result:
    print(row)
