from app import Tech, Jobs, Parts, db

db.create_all()

shane = Tech('shane', 'McGuire', 'journeyman', 0)
oilchange = Jobs('Syae', 'Oil change and Inspection', 1, 5.1, 1.4)
partsneeded = Parts(1,'oil filter', 50)
db.session.add_all([shane, oilchange, partsneeded])
# db.session.add(shane)
db.session.commit()