import React from 'react';
import { CheckCheck, Check } from 'lucide-react';

const MessageBubble = ({ 
  message, 
  isOwner = false, 
  isFirstInGroup = true, 
  isLastInGroup = true,
  status = "seen" // "sent", "delivered", "seen"
}) => {
  
  // Dynamic alignment and styling
  const containerClasses = `flex flex-col w-full ${isOwner ? 'items-start' : 'items-end'} ${isFirstInGroup ? 'mt-6' : 'mt-1'}`;
  
  const bubbleClasses = `
    max-w-[75%] px-6 py-4 rounded-[1.8rem] text-sm leading-relaxed transition-all duration-300 animate-in fade-in slide-in-from-bottom-2
    ${isOwner 
      ? 'bg-white border border-blue-50 text-slate-950 shadow-sm' 
      : 'bg-blue-50/80 text-slate-900 shadow-sm shadow-blue-900/5'
    }
    ${isOwner && isFirstInGroup ? 'rounded-tl-lg' : ''}
    ${!isOwner && isFirstInGroup ? 'rounded-tr-lg' : ''}
  `;

  return (
    <div className={containerClasses}>
      {/* The Message Bubble */}
      <div className={bubbleClasses}>
        {message.text}
      </div>

      {/* Meta Information Row */}
      {isLastInGroup && (
        <div className={`flex items-center gap-2 mt-2 px-2 ${isOwner ? 'flex-row' : 'flex-row-reverse'}`}>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            {message.timestamp}
          </span>
          
          {!isOwner && (
            <div className="flex items-center">
              {status === "seen" ? (
                <CheckCheck size={12} className="text-blue-400" />
              ) : (
                <Check size={12} className="text-slate-300" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;