"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Loader2 } from "lucide-react";
import ChatItem from "./ChatItem";
import { IConversation } from "@/types/inbox.types";

interface ChatListProps {
  conversations: IConversation[];
  loading: boolean;
  currentUserId: string;
  activeConversationId: string | null;
  onSelectConversation: (conversation: IConversation) => void;
  isUserOnline: (userId: string) => boolean;
  onSearch?: (searchTerm: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  conversations,
  loading,
  currentUserId,
  activeConversationId,
  onSelectConversation,
  isUserOnline,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter conversations by search term (local filter)
  const filteredConversations = useMemo(() => {
    if (!conversations || conversations.length === 0) return [];
    if (!searchTerm.trim()) return conversations;

    return conversations.filter((conv) => {
      const otherParticipant = conv.participants.find(
        (p) => p._id !== currentUserId
      );
      if (!otherParticipant) return false;

      const name =
        `${otherParticipant.firstName || ""} ${otherParticipant.lastName || ""}`.toLowerCase();
      const email = otherParticipant.email?.toLowerCase() || "";

      return (
        name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase())
      );
    });
  }, [conversations, searchTerm, currentUserId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8 sm:pl-10 bg-gray-50 border-gray-200 focus:bg-white text-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {loading && (!conversations || conversations.length === 0) ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mb-2" />
            <p className="text-xs sm:text-sm">Loading conversations...</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
            <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 mb-3 opacity-50" />
            <p className="text-xs sm:text-sm font-medium">No conversations yet</p>
            <p className="text-[10px] sm:text-xs text-center mt-1">
              {searchTerm
                ? "No results found for your search"
                : "Start a new conversation to get started"}
            </p>
          </div>
        ) : (
          <div>
            {filteredConversations.map((conversation) => {
              const otherParticipant = conversation.participants.find(
                (p) => p._id !== currentUserId
              );

              return (
                <ChatItem
                  key={conversation._id}
                  conversation={conversation}
                  currentUserId={currentUserId}
                  isActive={activeConversationId === conversation._id}
                  isOnline={
                    otherParticipant
                      ? isUserOnline(otherParticipant._id)
                      : false
                  }
                  onClick={() => onSelectConversation(conversation)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
