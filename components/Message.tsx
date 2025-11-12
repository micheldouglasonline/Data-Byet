
import React from 'react';
import { ChatMessage, MessageRole } from '../types';
import { UserIcon, SparklesIcon } from './Icons';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUserModel = message.role === MessageRole.MODEL;

  const messageContainerClasses = isUserModel
    ? 'flex justify-start items-start space-x-3'
    : 'flex justify-end items-start space-x-3';

  const avatarClasses = isUserModel
    ? 'w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0'
    : 'w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0';
    
  const messageBubbleClasses = isUserModel
    ? 'p-4 bg-gray-800 rounded-lg rounded-bl-none max-w-lg lg:max-w-xl break-words'
    : 'p-4 bg-blue-600 text-white rounded-lg rounded-br-none max-w-lg lg:max-w-xl break-words';
    
  const formattedContent = message.content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
  ));

  return (
    <div className={messageContainerClasses}>
      {isUserModel && (
        <div className={avatarClasses}>
          <SparklesIcon className="w-6 h-6 text-white" />
        </div>
      )}
      <div className={messageBubbleClasses}>
        <p className="text-base leading-relaxed">{formattedContent}</p>
      </div>
      {!isUserModel && (
        <div className={avatarClasses}>
          <UserIcon className="w-6 h-6 text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default Message;
