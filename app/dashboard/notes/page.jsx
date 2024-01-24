"use client"
import Header from "@/app/(components)/header";
import Loader from "@/app/(components)/loader-screen";
import NoteCard from "@/app/(components)/note-card";
import { getNotes } from "@/app/lib/features/notes/notesSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import React from "react";

const Notes = () => {
    const { notes, isLoading } = useAppSelector((state) => state.notesReducer)
    const dispatch = useAppDispatch()
    const [search, setSearch] = React.useState('');
    const { data: user } = JSON.parse(localStorage.getItem('user'));
    React.useEffect(() => {
        if (notes.length<1) getData();
    }, [])

    React.useEffect(() => {
    }, [notes])

    const getData = async () => {
        dispatch(getNotes(user.user_id))
    }

    return (
        <div className="w-full h-full p-5">
            <div className="flex justify-between my-4">
                <Header title="Notes" />
                <div className="flex flex-row justify-start">
                    <input
                        className="head-14-semi p-3"
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                        value={search}
                    />
                </div>
            </div>
            {
                isLoading ? <div className="absolute top-[50%] left-[50%] flex justify-center align-middle items-center">
                    <Loader />
                </div>
                    :
                    <div className="notes-section h-[90%] overflow-y-auto my-3 pt-3 flex-wrap flex gap-10">
                        {notes.map(
                            item =>
                                search != "" ? item.title
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ? (
                                    <NoteCard
                                        reload={getData()}
                                        NoteData={item}
                                        color={item.color} />
                                ) : null : (
                                    <NoteCard
                                        reload={getData()}
                                        NoteData={item} color={item.color} />
                                )
                        )}
                    </div>
            }
        </div>
    )

}
export default Notes;