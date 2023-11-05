from fastapi import HTTPException, status
from models.Ticket import Ticket

def add_ticket(payload, db):
    new_ticket = Ticket(**payload.dict())
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket

def update_ticket_by_id(id, payload, db):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()
    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Ticket with id {id} not found")
    db.query(Ticket).filter(Ticket.id == id).update(payload.dict())
    db.commit()
    return {"message": f"Ticket with id {id} updated successfully"}

def delete_ticket_by_id(id, db):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()
    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Ticket with id {id} not found")
    db.delete(ticket)
    db.commit()
    return {"message": f"Ticket with id {id} deleted successfully"}