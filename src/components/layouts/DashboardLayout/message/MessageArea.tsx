"use client";

import React, { useRef, useEffect } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { IMessage, IChatUser } from "@/types/inbox.types";
import moment from "moment";

interface MessageAreaProps {
  messages: IMessage[];
  loading: boolean;
  currentUserId: string;
  receiver: IChatUser | null;
  isOnline: boolean;
  isTyping: boolean;
  sendingMessage: boolean;
  isMobileView: boolean;
  onSend: (text: string) => void | Promise<unknown>;
  onTyping: () => void;
  onDelete?: (messageId: string) => void;
  onEdit?: (messageId: string, content: string) => void;
  onBack?: () => void;
  onLoadMore?: () => void;
  hasMoreMessages?: boolean;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  loading,
  currentUserId,
  receiver,
  isOnline,
  isTyping,
  sendingMessage,
  isMobileView,
  onSend,
  onTyping,
  onDelete,
  onEdit,
  onBack,
  onLoadMore,
  hasMoreMessages,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Check if we should show date separator
  const shouldShowDateSeparator = (
    currentMessage: IMessage,
    previousMessage: IMessage | null
  ): boolean => {
    if (!previousMessage) return true;

    const currentDate = moment(currentMessage.createdAt).startOf("day");
    const previousDate = moment(previousMessage.createdAt).startOf("day");

    return !currentDate.isSame(previousDate);
  };

  // Check if we should show avatar (last message in a group from same sender)
  const shouldShowAvatar = (
    currentMessage: IMessage,
    nextMessage: IMessage | null
  ): boolean => {
    if (!nextMessage) return true;

    const currentSenderId =
      typeof currentMessage.senderId === "string"
        ? currentMessage.senderId
        : currentMessage.senderId._id;
    const nextSenderId =
      typeof nextMessage.senderId === "string"
        ? nextMessage.senderId
        : nextMessage.senderId._id;

    // Show avatar if next message is from different sender
    if (currentSenderId !== nextSenderId) return true;

    // Show avatar if time gap is more than 5 minutes
    const timeDiff = moment(nextMessage.createdAt).diff(
      moment(currentMessage.createdAt),
      "minutes"
    );
    return timeDiff > 5;
  };

  // Handle scroll for pagination
  const handleScroll = () => {
    if (!messagesContainerRef.current || !hasMoreMessages || loading) return;

    const { scrollTop } = messagesContainerRef.current;

    // Load more when scrolled near top
    if (scrollTop < 100) {
      onLoadMore?.();
    }
  };

  // Receiver display info
  const receiverName = receiver
    ? receiver.firstName && receiver.lastName
      ? `${receiver.firstName} ${receiver.lastName}`
      : receiver.email || "Unknown"
    : "";

  const receiverInitials = receiver
    ? receiver.firstName && receiver.lastName
      ? `${receiver.firstName[0]}${receiver.lastName[0]}`.toUpperCase()
      : receiver.email?.[0]?.toUpperCase() || "U"
    : "";

  // Render empty state
  if (!receiver) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50 p-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3 sm:mb-4">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-1 sm:mb-2">
          Select a conversation
        </h3>
        <p className="text-xs sm:text-sm text-center max-w-xs">
          Choose a conversation from the list to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Back button for mobile */}
          {isMobileView && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 mr-0.5 sm:mr-1"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          )}

          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
              <AvatarImage src={receiver.profileImage} alt={receiverName} />
              <AvatarFallback className="bg-primary text-white font-medium text-xs sm:text-sm">
                {receiverInitials}
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500 border-2 border-white" />
            )}
          </div>

          {/* Name and status */}
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
              {receiverName}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-500">
              {isTyping ? (
                <span className="text-primary">typing...</span>
              ) : isOnline ? (
                <span className="text-green-500">Online</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto py-4 bg-gray-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Loading indicator for older messages */}
        {loading && messages.length > 0 && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}

        {/* Initial loading */}
        {loading && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
            <p className="text-sm text-gray-400">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs mt-1">
              Send a message to start the conversation
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const previousMessage = index > 0 ? messages[index - 1] : null;
              const nextMessage =
                index < messages.length - 1 ? messages[index + 1] : null;

              const senderId =
                typeof message.senderId === "string"
                  ? message.senderId
                  : message.senderId._id;

              return (
                <MessageItem
                  key={message._id}
                  message={message}
                  isOwn={senderId === currentUserId}
                  showAvatar={shouldShowAvatar(message, nextMessage)}
                  showTimestamp={shouldShowDateSeparator(
                    message,
                    previousMessage
                  )}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              );
            })}
          </>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="px-4 py-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={receiver.profileImage} alt={receiverName} />
                <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                  {receiverInitials}
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-2xl px-4 py-3 rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSend={onSend}
        onTyping={onTyping}
        sending={sendingMessage}
        disabled={loading}
      />
    </div>
  );
};

export default MessageArea;
