import React, { useEffect, useRef } from 'react';
import { Waves, MessageSquare } from 'lucide-react';

const MessagesContainer = ({ messages = [], children }) => {
  const scrollRef = useRef(null);

  // Automatically scroll to the latest message on update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 relative w-full overflow-hidden bg-white">
      {/* 1. Subtle Background Texture/Tint */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent pointer-events-none"></div>

      {/* 2. Scrollable Area */}
      <div 
        ref={scrollRef}
        className="h-full overflow-y-auto overflow-x-hidden px-6 py-8 md:px-12 scroll-smooth no-scrollbar"
      >
        <div className="max-w-4xl mx-auto flex flex-col">
          
          {messages.length === 0 ? (
            /* 3. Coastal Empty State */
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-1000">
              <div className="w-20 h-20 rounded-[2.5rem] bg-blue-50/50 flex items-center justify-center text-blue-200 mb-6">
                <Waves size={40} strokeWidth={1} />
              </div>
              <p className="text-slate-400 font-[800] text-[10px] uppercase tracking-[0.3em] mb-2">
                Sanctuary Concierge
              </p>
              <h3 className="text-xl font-[800] text-slate-950 tracking-tight">
                Start your <span className="italic font-serif text-slate-500">conversation</span>
              </h3>
              <p className="text-slate-400 text-sm font-medium mt-2 max-w-[240px] text-center leading-relaxed">
                Connect with your host regarding your upcoming stay at the resort.
              </p>
            </div>
          ) : (
            /* 4. Date Separator & Message List */
            <div className="space-y-10">
              {/* This is where the MessageBubble components will be mapped */}
              {children}
              
              {/* Date Separator Example */}
              <div className="flex items-center gap-6 py-4">
                <div className="h-px flex-1 bg-blue-50"></div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
                  Today
                </span>
                <div className="h-px flex-1 bg-blue-50"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Edge Gradients for Smooth Transitions */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default MessagesContainer;