import React, { useState } from "react";
import noteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const basicView = {}
  const notesIntial = []
  const [notes, setNotes] = useState(notesIntial);
  const [viewnotes, setViewnotes] = useState(basicView)

   // GET ALL NOTES
   const getallNotes = async () => {
    //API todo
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json)
  };

  // ADD NOTES
  const addNotes = async (title, description, tag) => {
    //API todo
    const url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json()
    setNotes(notes.concat(json))
  };
  // DELETE NOTES
  const deleteNotes = async (id) => {
    //TODO API
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //EDIT NOTES
  const editNotes = async (id, title, description, tag) => {
    //TODO API
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json()
    console.log(json)
    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNotes, deleteNotes, editNotes, getallNotes, viewnotes, setViewnotes}}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
