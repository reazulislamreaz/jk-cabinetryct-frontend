"use client";

import React from "react";
import ChatList from "./ChatList";
import { useMessaging } from "@/hooks/useMessaging";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const ChatListContainer: React.FC = () => {
  const { user } = useAuth();
  const {
    conversations,
    conversationsLoading,
    activeConversation,
    selectConversation,
    isUserOnline,
    loadConversations,
    isMobileView,
    showConversationList,
  } = useMessaging();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.length >= 3) {
      loadConversations(1, searchTerm);
    } else if (searchTerm.length === 0) {
      loadConversations(1, "");
    }
  };

  if (!user) return null;

  // On mobile, hide the list when a conversation is selected
  if (isMobileView && !showConversationList) {
    return null;
  }
  return (
    <div
      className={cn(
        "border-r border-gray-200 bg-white h-full overflow-hidden",
        isMobileView ? "w-full" : "w-full md:w-80 lg:w-96",
        "shrink-0"
      )}
    >
      <ChatList
        conversations={conversations}
        loading={conversationsLoading}
        currentUserId={user._id}
        activeConversationId={activeConversation?._id || null}
        onSelectConversation={selectConversation}
        isUserOnline={isUserOnline}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ChatListContainer;
