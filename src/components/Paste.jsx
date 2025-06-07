import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import { toast } from 'react-hot-toast'

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(pasteId) {
    const shareUrl = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24 bg-green-100 rounded-xl shadow-lg min-h-[400px]">
      <input
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 rounded-xl border border-amber-200 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition shadow"
      />

      {filterData.length > 0 ? (
        <div className="flex flex-col gap-6 mt-8 min-h-[300px]">
          {filterData.map((paste) => (
            <div key={paste._id} className="bg-white rounded-xl shadow p-6 border border-amber-200">
              <h2 className="text-2xl font-bold mb-3">{paste.title}</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-wrap border border-amber-200 bg-yellow-50 rounded-lg p-4">{paste.content}</p>

              <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
                <div className="flex items-center gap-2 text-gray-400 italic">
                  <img
                    src="https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/64/external-calender-time-and-date-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png"
                    alt="calendar"
                    width="20"
                    height="20"
                  />
                  <span>{new Date(paste.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-5 ml-6">
                  <a href={`/?pasteId=${paste._id}`} title="Edit">
                    <img
                      src="https://img.icons8.com/ios/50/edit--v1.png"
                      alt="edit"
                      width="14"
                      height="14"
                      className="cursor-pointer hover:scale-110 transition-transform"
                    />
                  </a>

                  <a href={`/pastes/${paste._id}`} title="View">
                    <img
                      src="https://img.icons8.com/ios/50/view-file.png"
                      alt="view"
                      width="14"
                      height="14"
                      className="cursor-pointer hover:scale-110 transition-transform"
                    />
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(paste._id);
                    }}
                    title="Delete"
                  >
                    <img
                      src="https://img.icons8.com/ios/50/delete--v1.png"
                      alt="delete"
                      width="14"
                      height="14"
                      className="cursor-pointer hover:scale-110 transition-transform"
                    />
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard");
                    }}
                    title="Copy"
                  >
                    <img
                      src="https://img.icons8.com/ios/50/copy-2.png"
                      alt="copy"
                      width="14"
                      height="14"
                      className="cursor-pointer hover:scale-110 transition-transform"
                    />
                  </button>

                  <button
                    onClick={() => handleShare(paste._id)}
                    title="Share"
                  >
                    <img
                      src="https://img.icons8.com/ios/50/share.png"
                      alt="share"
                      width="14"
                      height="14"
                      className="cursor-pointer hover:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[300px] flex items-center justify-center mt-8">
          <p className="text-center text-gray-500 text-lg font-medium">
            No data found
          </p>
        </div>
      )}
    </div>
  )
}

export default Paste