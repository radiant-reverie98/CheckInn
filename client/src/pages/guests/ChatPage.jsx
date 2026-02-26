import React from 'react';
import ChatHeader from './components/chat/ChatHeader';
import MessagesContainer from './components/chat/MessagesContainer';
import MessageBubble from './components/chat/MessageBubble';
import MessageInputBar from './components/chat/MessageInputBar';

const ChatPage = ({ messages = [], currentUser }) => {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 1. Header is sticky at the top */}
      <ChatHeader 
        hotelName="Azure Bay Sanctuary" 
        bookingId="#BK12345" 
        status="Active"
      />

      {/* 2. Container handles the scrollable area */}
      <MessagesContainer messages={messages}>
        {messages.map((msg, index) => {
          const isOwner = msg.senderId !== currentUser.id;
          
          // Logic for Grouping
          const prevMsg = messages[index - 1];
          const nextMsg = messages[index + 1];

          // It's the first in a group if the previous sender was different
          const isFirstInGroup = !prevMsg || prevMsg.senderId !== msg.senderId;
          
          // It's the last in a group if the next sender is different
          const isLastInGroup = !nextMsg || nextMsg.senderId !== msg.senderId;

          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwner={isOwner}
              isFirstInGroup={isFirstInGroup}
              isLastInGroup={isLastInGroup}
              status={msg.status}
            />
          );
        })}
      </MessagesContainer>

      {/* 3. Input bar stays at the bottom */}
      <MessageInputBar onSendMessage={(text) => console.log(text)} />
    </div>
  );
};

export default ChatPage;