import React, { useState } from "react";
import DeleteLogo from "../(assets)/(svg)/delete";
import EditLogo from "../(assets)/(svg)/edit-logo";
import { useDispatch } from "react-redux";
import axios from "axios";
import LoaderScreen from "../Helpers/loader-screen";
import LoaderLogo from "../Helpers/loader-logo";
import EditNoteLogo from "../(assets)/(svg)/edit-note";
import { API_URL } from "@/constants";

const NoteCard = ({ NoteData, color, reload }) => {
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(false);

    const Style = {
        backgroundColor: `${color}`,
    };

      const onDelete = async () => {
        try {
          setLoading(true);
          console.log(NoteData);
          const res = await axios.post(
            `${API_URL}/delete-note/${NoteData.note_id}`
          );

        //   if (res.data.status === 200) {
        //     dispatch(deleteNote(NoteData.note_id));
        //   }
          setLoading(false);
          reload();
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };

    return (
        <div className="note-card-wrapper p-5 w-[250px] h-[300px] rounded-md transition-all hover:-translate-y-1" style={Style}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="">
                <h1 className="text-lg">{NoteData.title}</h1>
            </div>
            <div className="note-card-note">
                <p>{NoteData.note}</p>
            </div>

            {hover && <div className=" flex justify-around w-full h-12 absolute bottom-0 left-0 rounded-b-md opacity-75">
                <span className="cursor-pointer">
                    <EditNoteLogo/>
                </span>
                <span className="cursor-pointer" onClick={() => onDelete()}>
                    <DeleteLogo/>
                </span>
            </div>}
            {loading ? (
                <div className="just-center">
                    <LoaderLogo />
                </div>
            ) : null}
        </div>
    );
};
export default NoteCard;
