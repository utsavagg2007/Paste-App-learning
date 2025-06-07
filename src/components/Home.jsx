import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-green-100 rounded-xl shadow-lg">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="w-full p-3 rounded-xl border border-amber-200 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition shadow"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-4 rounded-xl border border-amber-200 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition shadow resize-none min-h-[250px]"
          placeholder="Enter content here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
        />

        <button
          onClick={createPaste}
          className="self-end px-6 py-2 bg-amber-400 text-white rounded-xl font-semibold shadow-md hover:bg-amber-500 transition"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;