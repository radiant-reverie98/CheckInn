import React, { useState, useEffect, useRef } from 'react';

const ChatDrawer = ({ isOpen, onClose, booking }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "guest", text: "Hello, what is the check-in time?", time: "10:30 AM" },
    { id: 2, sender: "owner", text: "Hi! Check-in starts at 2:00 PM.", time: "10:35 AM" },
    { id: 3, sender: "guest", text: "Great, thank you! Can I request an extra pillow?", time: "10:40 AM" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Handle ESC key and body lock
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "owner",
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`relative w-full max-w-[450px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg text-gray-900 leading-tight">
              {booking?.guest_name || "Guest"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Room {booking?.room_number} • {booking?.status}
            </p>
            <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">
              ID: {booking?.booking_id}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.sender === 'owner' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.sender === 'owner' 
                    ? 'bg-[#003580]/10 text-gray-900 rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Input */}
        <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003580] focus:ring-1 focus:ring-[#003580]/20 transition-all"
            />
            <button 
              type="submit"
              className="bg-[#003580] text-white p-2 rounded-lg hover:bg-[#002a66] transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;