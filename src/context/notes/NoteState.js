import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialnote = []
    const [notes, setNotes] = useState(initialnote)

    //Get all  note
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2YzQzNzgwOGRlMmM5MjFmZmJlN2I5In0sImlhdCI6MTcxODM3MTI1NH0.v0jCmpXN2xDEUuH6SZ5j7ijEWgRa_htdmrlTxnuh9TY"
            }
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }
    //Add a note
    const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2YzQzNzgwOGRlMmM5MjFmZmJlN2I5In0sImlhdCI6MTcxODM3MTI1NH0.v0jCmpXN2xDEUuH6SZ5j7ijEWgRa_htdmrlTxnuh9TY"
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }


    //delete a note
    const deleteNotes = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2YzQzNzgwOGRlMmM5MjFmZmJlN2I5In0sImlhdCI6MTcxODUxODU3NX0.3tkgd-xRiQnE-PzHyiHVuTcYxt6kw2BY--nxe_-TGlY"
            }
        });
        const json = response.json();
        console.log(json);

        // console.log("deleting note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    //edit a note
    const editNotes = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2YzQzNzgwOGRlMmM5MjFmZmJlN2I5In0sImlhdCI6MTcxODUxODU3NX0.3tkgd-xRiQnE-PzHyiHVuTcYxt6kw2BY--nxe_-TGlY"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json)

        //logic to edit in client side
        const newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNotes, editNotes , getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
