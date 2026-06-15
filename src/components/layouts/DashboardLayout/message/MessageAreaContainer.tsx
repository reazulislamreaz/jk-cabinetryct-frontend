"use client";

import React, { useMemo } from "react";
import MessageArea from "./MessageArea";
import { useMessaging } from "@/hooks/useMessaging";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MessageAreaContainer: React.FC = () => {
  const { user } = useAuth();
  const {
    messages,
    messagesLoading,
    messagesPagination,
    activeConversation,
    activeReceiverId,
    sendingMessage,
    isMobileView,
    showConversationList,
    sendMessage,
    handleTyping,
    deleteMessageById,
    editMessage,
    goBackToList,
    loadMoreMessages,
    isPartnerTyping,
    isUserOnline,
  } = useMessaging();

  // Get the receiver from active conversation
  const receiver = useMemo(() => {
    if (!activeConversation || !user) return null;

    return (
      activeConversation.participants.find((p) => p._id !== user._id) || null
    );
  }, [activeConversation, user]);

  // Check if there are more messages to load
  const hasMoreMessages = useMemo(() => {
    if (!messagesPagination) return false;
    return messagesPagination.page < messagesPagination.totalPages;
  }, [messagesPagination]);

  const handleSend = async (text: string) => {
    try {
      console.log("MessageAreaContainer: Calling sendMessage with:", text);
      const result = await sendMessage(text);
      console.log("MessageAreaContainer: sendMessage result:", result);
      return result;
    } catch (error) {
      console.error("MessageAreaContainer: Failed to send message:", error);
      // Show error to user
      alert(error instanceof Error ? error.message : "Failed to send message. Please try again.");
      // Re-throw so MessageInput knows the send failed
      throw error;
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      await deleteMessageById(messageId);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const handleEdit = async (messageId: string, content: string) => {
    // For now, we can implement an edit dialog
    // This is a placeholder for edit functionality
    const newContent = prompt("Edit message:", content);
    if (newContent && newContent !== content) {
      try {
        await editMessage(messageId, newContent);
      } catch (error) {
        console.error("Failed to edit message:", error);
      }
    }
  };

  if (!user) return null;

  // On mobile, hide message area when conversation list is shown
  if (isMobileView && showConversationList) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex-1 min-w-0 h-full flex flex-col overflow-hidden",
        isMobileView ? "w-full" : ""
      )}
    >
      <MessageArea
        messages={messages}
        loading={messagesLoading}
        currentUserId={user._id}
        receiver={receiver}
        isOnline={activeReceiverId ? isUserOnline(activeReceiverId) : false}
        isTyping={isPartnerTyping()}
        sendingMessage={sendingMessage}
        isMobileView={isMobileView}
        onSend={handleSend}
        onTyping={handleTyping}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onBack={goBackToList}
        onLoadMore={loadMoreMessages}
        hasMoreMessages={hasMoreMessages}
      />
    </div>
  );
};

export default MessageAreaContainer;
