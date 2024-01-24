"use client";
import FloatingButton from "@/app/(components)/floating-button";
import Header from "@/app/(components)/header";
import Loader from "@/app/(components)/loader-screen";
import NoteCard from "@/app/(components)/note-card";
import CloseButton from "@/app/Helpers/close-button";
import Colors from "@/app/Helpers/colors";
import { getNotes } from "@/app/lib/features/notes/notesSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { API_URL } from "@/constants";
import axios from "axios";
import React from "react";

const Notes = () => {
  const { notes, isLoading } = useAppSelector((state) => state.notesReducer);
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState();
  const [showAddNote, setShowAddNote] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState("#F1F1F1");
  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");
  const [color, setColor] = React.useState("");

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  React.useEffect(() => {
    if (user && notes.length < 1) getData();
  }, [user]);

  React.useEffect(() => {}, [notes]);

  const getData = async () => {
    dispatch(getNotes(user.user_id));
  };

  const addNote = async () => {
    try {
      const payload = {
        user_id: user.user_id,
        title: title,
        note: note,
        note_id: (Math.random() + 1).toString(36).substring(7),
        color: selectedColor,
      };

      const res = await axios.post(`${API_URL}/add-note`, payload);
      console.log(payload);
      if (res.status == 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full p-5">
      <div className="flex justify-between my-4">
        <Header title="Notes" />
        <div className="flex flex-row justify-start">
          <input
            className="head-14-semi p-3"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            value={search}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="absolute top-[50%] left-[50%] flex justify-center align-middle items-center">
          <Loader />
        </div>
      ) : (
        <div className="notes-section h-[90%] overflow-y-auto my-3 pt-3 flex-wrap flex gap-10">
          {notes.map((item) =>
            search != "" ? (
              item.title.toLowerCase().includes(search.toLowerCase()) ? (
                <div key={Math.random()}>
                  <NoteCard
                    reload={() => getData()}
                    NoteData={item}
                    color={item.color}
                  />
                </div>
              ) : null
            ) : (
              <div key={Math.random()}>
                <NoteCard
                  reload={() => getData()}
                  NoteData={item}
                  color={item.color}
                />
              </div>
            )
          )}
        </div>
      )}
      <div className="floating-button">
        <FloatingButton text="+" callback={() => setShowAddNote(true)} />
      </div>

      {showAddNote ? (
        <div className="dark-back just-center">
          <div className="add-note-popup">
            <div className="note-popup-header just-space">
              <h1>Add New Note +</h1>
              <CloseButton callback={() => setShowAddNote(false)} />
            </div>
            <br />
            <div className="flex flex-col gap-3 ">
              <div className=" m-yy-20">
                <label
                  className="head-16-semi inline-block w-[100px]"
                  htmlFor=""
                >
                  Note Name
                </label>
                <span className="input-wrapper">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-box head-16-semi"
                    type="text"
                  />
                </span>
              </div>

              <div className="flex align-middle items-start flex-row m-yy-20">
                <label
                  className="head-16-semi inline-block w-[100px]"
                  htmlFor=""
                >
                  Write Note
                </label>
                <span className="input-wrapper">
                  <textarea
                    onChange={(e) => setNote(e.target.value)}
                    cols={50}
                    rows={15}
                    className="input-textarea head-16-semi"
                    type="text"
                  />
                </span>
              </div>
              <div className="flex mb-3">
                <label
                  className="head-16-semi inline-block w-[100px]"
                  htmlFor=""
                >
                  Color
                </label>

                <span className="flex flex-row gap-3">
                  {Colors.map((item) => (
                    <div
                      onClick={() => setSelectedColor(item.color)}
                      style={{ backgroundColor: `${item.color}` }}
                      className={
                        item.color == selectedColor
                          ? "w-[40px] h-[40px] rounded-md shadow-sm border-2 border-theme-color"
                          : "w-[40px] h-[40px] rounded-md transition-transform hover:-translate-y-1 hover:shadow-md"
                      }
                    />
                  ))}
                </span>
              </div>
            </div>
            <div className="d-flex-center m-yy-20">
              <label
                className="head-16-semi inline-block w-[100px]"
                htmlFor=""
              />
              <span className="button-wrapper">
                <button
                  onClick={() => addNote()}
                  className="primary_button head-16-semi"
                >
                  Add Note
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Notes;
