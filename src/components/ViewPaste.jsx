import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id ===id)[0];
  console.log("final paste: ",paste);

  function handleCopyContent() {
    navigator.clipboard.writeText(paste.content);
    toast.success("Content copied to clipboard");
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-green-100 rounded-xl shadow-md">
    <div className="flex flex-row gap-7 place-content-between">
      <input
        type="text"
        className="w-full p-3 rounded-xl border border-amber-200 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition shadow"
        placeholder="Enter title Here"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div className="relative mt-4">
      <img
        onClick={handleCopyContent}
        width="24"
        height="24"
        src="https://img.icons8.com/ios/50/copy-2.png"
        alt="copy-2"
        className="cursor-pointer absolute right-4 top-4"
      />
      <textarea
        className="w-full p-4 rounded-xl border border-amber-200 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition shadow resize-none min-h-[250px]"
        value={paste.content}
        placeholder="Enter content Here"
        disabled
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  </div> 
  )
}

export default ViewPaste
