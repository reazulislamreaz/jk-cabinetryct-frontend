"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileImageUrl } from "@/utils/profile.utils";
import { cn } from "@/lib/utils";
import { IConversation } from "@/types/inbox.types";
import moment from "moment";

interface ChatItemProps {
  conversation: IConversation;
  currentUserId: string;
  isActive: boolean;
  isOnline: boolean;
  onClick: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  conversation,
  currentUserId,
  isActive,
  isOnline,
  onClick,
}) => {
  // Get the other participant (not current user)
  const otherParticipant = conversation.participants.find(
    (p) => p._id !== currentUserId
  );

  if (!otherParticipant) return null;

  const { firstName, lastName, profileImage, email } = otherParticipant;
  const displayName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : email || "Unknown User";
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : email?.[0]?.toUpperCase() || "U";

  // Format last message preview
  const lastMessage = conversation.lastMessage;
  const lastMessageText = lastMessage?.content?.text || "";
  const lastMessagePreview =
    lastMessageText.length > 40
      ? `${lastMessageText.substring(0, 40)}...`
      : lastMessageText || "No messages yet";

  // Format time
  const formatTime = (dateString: string) => {
    const date = moment(dateString);
    const now = moment();

    if (date.isSame(now, "day")) {
      return date.format("h:mm A");
    } else if (date.isSame(now.subtract(1, "day"), "day")) {
      return "Yesterday";
    } else if (date.isSame(now, "week")) {
      return date.format("ddd");
    } else {
      return date.format("MMM D");
    }
  };

  const isUnread =
    lastMessage?.isUnread && lastMessage?.senderId?._id !== currentUserId;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 cursor-pointer transition-all duration-200 border-b border-gray-100",
        "hover:bg-gray-50",
        isActive &&
          "bg-primary/10 hover:bg-primary/10 border-l-4 border-l-primary"
      )}
    >
      {/* Avatar with online indicator */}
      <div className="relative shrink-0">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
          <AvatarImage src={getProfileImageUrl(profileImage)} alt={displayName} />
          <AvatarFallback className="bg-primary text-white font-medium text-xs sm:text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-green-500 border-2 border-white" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
          <h4
            className={cn(
              "font-medium text-sm sm:text-base text-gray-900 truncate",
              isUnread && "font-semibold"
            )}
          >
            {displayName}
          </h4>
          <span
            className={cn(
              "text-[10px] sm:text-xs shrink-0 ml-2",
              isUnread ? "text-primary font-medium" : "text-gray-400"
            )}
          >
            {lastMessage ? formatTime(lastMessage.createdAt) : ""}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={cn(
              "text-xs sm:text-sm truncate",
              isUnread ? "text-gray-900 font-medium" : "text-gray-500"
            )}
          >
            {lastMessage?.senderId?._id === currentUserId && (
              <span className="text-gray-400">You: </span>
            )}
            {lastMessagePreview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
