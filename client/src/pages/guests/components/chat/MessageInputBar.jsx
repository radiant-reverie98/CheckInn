import React, { useState, useRef } from 'react';
import { SendHorizonal, Plus, Waves, Lock } from 'lucide-react';

const MessageInputBar = ({ onSendMessage, isActive = true }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!message.trim() || !isActive) return;
    
    setIsSending(true);
    onSendMessage(message);
    
    // Simulate slight delay for premium feel / loading
    setTimeout(() => {
      setMessage('');
      setIsSending(false);
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    setMessage(target.value);
  };

  return (
    <footer className="w-full bg-white/80 backdrop-blur-xl border-t border-blue-50/50 p-4 md:p-6 sticky bottom-0 z-40">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Chat Closed Overlay */}
        {!isActive && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-2">
            <Lock size={12} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Chat is currently closed
            </span>
          </div>
        )}

        <div className={`flex items-end gap-3 md:gap-4 transition-opacity duration-500 ${!isActive ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Attachment Action */}
          <button className="mb-1.5 p-2.5 rounded-2xl bg-slate-50 text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300">
            <Plus size={20} />
          </button>

          {/* Input Field Container */}
          <div className="flex-1 relative group">
            <textarea
              ref={textareaRef}
              rows="1"
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Write your message..."
              disabled={!isActive}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-[1.8rem] py-4 px-6 pr-14 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 transition-all duration-500 resize-none max-h-48 scrollbar-hide"
            />
            
            {/* Visual Wave Accent inside input */}
            <div className="absolute right-6 bottom-4 opacity-0 group-focus-within:opacity-5 transition-opacity pointer-events-none">
              <Waves size={20} className="text-blue-900" />
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending || !isActive}
            className={`mb-1 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl
              ${message.trim() && !isSending 
                ? 'bg-blue-600 text-white shadow-blue-100 hover:bg-slate-950 hover:-translate-y-1 active:scale-90' 
                : 'bg-slate-100 text-slate-300 shadow-none cursor-not-allowed'
              }`}
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <SendHorizonal size={20} className={message.trim() ? 'translate-x-0.5' : ''} />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default MessageInputBar;