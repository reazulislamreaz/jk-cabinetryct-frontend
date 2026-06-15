"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useSocket } from "@/context/SocketContext";
import {
  setConversations,
  appendConversations,
  setConversationsLoading,
  updateConversationLastMessage,
  setActiveConversation,
  setActiveReceiverId,
  setMessages,
  prependMessages,
  addMessage,
  updateMessage,
  removeMessage,
  setMessagesLoading,
  setSendingMessage,
  setUnreadCount,
  incrementUnreadCount,
  markMessagesAsRead,
  setMobileView,
  setShowConversationList,
} from "@/store/slices/messagingSlice";
import {
  fetchConversationList,
  fetchMessages,
  sendMessage as sendSocketMessage,
  getUnviewedMessageCount,
  markMessageSeen,
  deleteMessage,
  updateMessage as updateSocketMessage,
  sendTypingStart,
  sendTypingStop,
} from "@/utils/messagingService";
import { IConversation, IMessage, IMessageReaction } from "@/types/inbox.types";
import { useAuth } from "./useAuth";

type IMessageReactionWithAddedAt = IMessageReaction & { addedAt: string };

export const useMessaging = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { socket, isConnected, typingUsers, onlineUsers } = useSocket();
  const { user } = useAuth();

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  const {
    conversations,
    conversationsLoading,
    conversationsPagination,
    activeConversation,
    activeReceiverId,
    messages,
    messagesLoading,
    messagesPagination,
    unreadCount,
    sendingMessage,
    isMobileView,
    showConversationList,
  } = useSelector((state: RootState) => state.messaging);

  // Load conversations
  const loadConversations = useCallback(
    async (page = 1, searchTerm = "") => {
      if (!isConnected) return;

      dispatch(setConversationsLoading(true));
      try {
        const data = await fetchConversationList({
          page,
          limit: 50,
          searchTerm,
        });
        console.log("Conversation Data", data);
        if (page === 1) {
          dispatch(
            setConversations({
              conversations: data?.results,
              pagination: data.pagination,
            })
          );
        } else {
          dispatch(
            appendConversations({
              conversations: data?.results,
              pagination: data.pagination,
            })
          );
        }
      } catch (error) {
        console.error("Failed to load conversations:", error);
        dispatch(setConversationsLoading(false));
      }
    },
    [dispatch, isConnected]
  );

  // Load messages for active conversation
  const loadMessages = useCallback(
    async (receiverId: string, page = 1) => {
      if (!isConnected || !receiverId) return;

      dispatch(setMessagesLoading(true));
      try {
        const data = await fetchMessages(receiverId, { page, limit: 50 });
        if (page === 1) {
          dispatch(
            setMessages({
              messages: data?.results,
              pagination: data.pagination,
            })
          );
        } else {
          dispatch(
            prependMessages({
              messages: data?.results,
              pagination: data.pagination,
            })
          );
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
        dispatch(setMessagesLoading(false));
      }
    },
    [dispatch, isConnected]
  );

  // Load more messages (pagination)
  const loadMoreMessages = useCallback(() => {
    if (
      !activeReceiverId ||
      !messagesPagination ||
      messagesLoading ||
      messagesPagination.page >= messagesPagination.totalPages
    ) {
      return;
    }
    loadMessages(activeReceiverId, messagesPagination.page + 1);
  }, [activeReceiverId, messagesPagination, messagesLoading, loadMessages]);

  // Select a conversation
  const selectConversation = useCallback(
    (conversation: IConversation) => {
      dispatch(setActiveConversation(conversation));

      // Find the other participant (receiver)
      const receiver = conversation.participants.find(
        (p) => p._id !== user?._id
      );

      if (receiver) {
        dispatch(setActiveReceiverId(receiver._id));
        loadMessages(receiver._id);

        // Mark all messages from this user as seen
        socket?.emit(
          "mark-seen",
          { receiverId: receiver._id },
          (response: { success: boolean; message: string }) => {
            if (response?.success) {
              console.log("Marked messages as seen for:", receiver._id);
            }
          }
        );
      }
    },
    [dispatch, user, loadMessages, socket]
  );

  // Send a message
  const sendMessage = useCallback(
    async (text: string) => {
      if (!activeReceiverId || !text.trim()) {
        console.warn("sendMessage: No activeReceiverId or empty text");
        return;
      }

      if (!isConnected) {
        console.error("sendMessage: Socket not connected");
        throw new Error("Socket not connected. Please check your connection.");
      }

      console.log(
        "useMessaging.sendMessage: Starting to send message to",
        activeReceiverId
      );
      dispatch(setSendingMessage(true));

      try {
        const message = await sendSocketMessage({
          receiverId: activeReceiverId,
          message: text.trim(),
        });
        dispatch(addMessage(message));

        // Update conversation's last message
        if (activeConversation) {
          dispatch(
            updateConversationLastMessage({
              conversationId: activeConversation._id,
              message,
            })
          );
        }

        return message;
      } catch (error) {
        console.error(
          "useMessaging.sendMessage: Failed to send message:",
          error
        );
        throw error;
      } finally {
        dispatch(setSendingMessage(false));
      }
    },
    [dispatch, activeReceiverId, activeConversation, isConnected]
  );

  // Delete a message
  const deleteMessageById = useCallback(
    async (messageId: string) => {
      try {
        await deleteMessage(messageId);
        dispatch(removeMessage(messageId));
      } catch (error) {
        console.error("Failed to delete message:", error);
        throw error;
      }
    },
    [dispatch]
  );

  // Edit a message
  const editMessage = useCallback(
    async (messageId: string, newContent: string) => {
      try {
        const updatedMessage = await updateSocketMessage(messageId, newContent);
        dispatch(
          updateMessage({
            messageId,
            updates: updatedMessage,
          })
        );
        return updatedMessage;
      } catch (error) {
        console.error("Failed to edit message:", error);
        throw error;
      }
    },
    [dispatch]
  );

  // Mark message as seen
  const markAsSeen = useCallback(
    async (messageId: string) => {
      try {
        await markMessageSeen(messageId);
        dispatch(markMessagesAsRead([messageId]));
      } catch (error) {
        console.error("Failed to mark message as seen:", error);
      }
    },
    [dispatch]
  );

  // Load unread count
  const loadUnreadCount = useCallback(async () => {
    if (!isConnected) return;
    try {
      const data = await getUnviewedMessageCount();
      dispatch(setUnreadCount(data.count));
    } catch (error) {
      console.error("Failed to load unread count:", error);
    }
  }, [dispatch, isConnected]);

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (!activeReceiverId) return;

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      sendTypingStart(activeReceiverId);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      if (activeReceiverId) {
        sendTypingStop(activeReceiverId);
        isTypingRef.current = false;
      }
    }, 2000);
  }, [activeReceiverId]);

  // Stop typing indicator
  const stopTyping = useCallback(() => {
    if (activeReceiverId && isTypingRef.current) {
      sendTypingStop(activeReceiverId);
      isTypingRef.current = false;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [activeReceiverId]);

  // Check if current chat partner is typing
  const isPartnerTyping = useCallback(() => {
    if (!activeReceiverId) return false;
    return typingUsers.has(activeReceiverId);
  }, [activeReceiverId, typingUsers]);

  // Check if a user is online
  const isUserOnline = useCallback(
    (userId: string) => {
      return onlineUsers.has(userId);
    },
    [onlineUsers]
  );

  // UI controls
  const setMobile = useCallback(
    (isMobile: boolean) => {
      dispatch(setMobileView(isMobile));
    },
    [dispatch]
  );

  const goBackToList = useCallback(() => {
    dispatch(setShowConversationList(true));
  }, [dispatch]);

  // Socket event listeners for real-time updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    // New message received (from other users)
    const handleNewMessage = (message: IMessage) => {
      console.log("Socket event: new-message received", message);

      const senderId =
        typeof message.senderId === "string"
          ? message.senderId
          : message.senderId._id;
      const receiverId =
        typeof message.receiverId === "string"
          ? message.receiverId
          : message.receiverId._id;

      const isActiveChat =
        activeReceiverId === senderId || activeReceiverId === receiverId;

      if (isActiveChat) {
        dispatch(addMessage(message));
        // Mark as seen since user is in this chat
        if (senderId !== user?._id) {
          markMessageSeen(message._id).catch(console.error);
        }
      }

      // Update unread count if message is not in active chat
      if (senderId !== user?._id && !isActiveChat) {
        dispatch(incrementUnreadCount());
      }
    };

    // Message sent confirmation (your own sent message)
    const handleMessageSent = (message: IMessage) => {
      console.log("Socket event: message-sent received", message);
      // Message already added via callback, but this confirms server received it
      dispatch(
        updateMessage({
          messageId: message._id,
          updates: { deliveryStatus: "sent" as const },
        })
      );
    };

    // Message seen - API format: { messageId, seenBy, timestamp }
    const handleMessageSeen = ({
      messageId,
      seenBy,
    }: {
      messageId: string;
      seenBy: string;
      timestamp: string;
    }) => {
      console.log("Socket event: message-seen", { messageId, seenBy });
      // If the person who saw the message is our active receiver, update our messages
      if (seenBy === activeReceiverId) {
        dispatch(
          updateMessage({
            messageId,
            updates: { deliveryStatus: "sent" as const, isUnread: false },
          })
        );
      }
    };

    // Message updated - API format: { message, updatedBy, timestamp }
    const handleMessageUpdated = ({
      message,
    }: {
      message: IMessage;
      updatedBy: string;
      timestamp: string;
    }) => {
      console.log("Socket event: message-updated", message);
      dispatch(
        updateMessage({
          messageId: message._id,
          updates: message,
        })
      );
    };

    // Message deleted - API format: { messageId, deletedBy, chatId, timestamp }
    const handleMessageDeleted = ({
      messageId,
    }: {
      messageId: string;
      deletedBy: string;
      chatId: string;
      timestamp: string;
    }) => {
      console.log("Socket event: message-deleted", messageId);
      dispatch(removeMessage(messageId));
    };

    // Conversation updated - API format: { lastMessage, chatId, timestamp }
    const handleConversationUpdated = ({
      lastMessage,
      chatId,
    }: {
      lastMessage: IMessage;
      chatId: string;
      timestamp: string;
    }) => {
      console.log("Socket event: conversation-updated", {
        chatId,
        lastMessage,
      });
      dispatch(
        updateConversationLastMessage({
          conversationId: chatId,
          message: lastMessage,
        })
      );
    };

    // Unviewed count updated - API format: { unviewedCount, userId }
    const handleUnviewedCountUpdated = ({
      unviewedCount,
    }: {
      unviewedCount: number;
      userId: string;
    }) => {
      console.log("Socket event: unviewed-count-updated", unviewedCount);
      dispatch(setUnreadCount(unviewedCount));
    };

    // Reaction added
    const handleReactionAdded = ({
      messageId,
      reactions,
    }: {
      messageId: string;
      userId: string;
      emoji: string;
      reactions: IMessageReactionWithAddedAt[];
      timestamp: string;
    }) => {
      console.log("Socket event: reaction-added", { messageId, reactions });
      dispatch(
        updateMessage({
          messageId,
          updates: { reactions },
        })
      );
    };

    // Reaction removed
    const handleReactionRemoved = ({
      messageId,
      reactions,
    }: {
      messageId: string;
      userId: string;
      emoji: string;
      reactions: IMessageReactionWithAddedAt[];
      timestamp: string;
    }) => {
      console.log("Socket event: reaction-removed", { messageId, reactions });
      dispatch(
        updateMessage({
          messageId,
          updates: { reactions },
        })
      );
    };

    socket.on("new-message", handleNewMessage);
    socket.on("message-sent", handleMessageSent);
    socket.on("message-seen", handleMessageSeen);
    socket.on("message-updated", handleMessageUpdated);
    socket.on("message-deleted", handleMessageDeleted);
    socket.on("conversation-updated", handleConversationUpdated);
    socket.on("unviewed-count-updated", handleUnviewedCountUpdated);
    socket.on("reaction-added", handleReactionAdded);
    socket.on("reaction-removed", handleReactionRemoved);

    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("message-sent", handleMessageSent);
      socket.off("message-seen", handleMessageSeen);
      socket.off("message-updated", handleMessageUpdated);
      socket.off("message-deleted", handleMessageDeleted);
      socket.off("conversation-updated", handleConversationUpdated);
      socket.off("unviewed-count-updated", handleUnviewedCountUpdated);
      socket.off("reaction-added", handleReactionAdded);
      socket.off("reaction-removed", handleReactionRemoved);
    };
  }, [socket, isConnected, activeReceiverId, user, dispatch]);

  // Initial load
  useEffect(() => {
    if (isConnected) {
      loadConversations();
      loadUnreadCount();
    }
  }, [isConnected, loadConversations, loadUnreadCount]);

  // Cleanup typing on unmount
  useEffect(() => {
    return () => {
      stopTyping();
    };
  }, [stopTyping]);

  return {
    // State
    conversations,
    conversationsLoading,
    conversationsPagination,
    activeConversation,
    activeReceiverId,
    messages,
    messagesLoading,
    messagesPagination,
    unreadCount,
    sendingMessage,
    isMobileView,
    showConversationList,
    isConnected,

    // Actions
    loadConversations,
    loadMessages,
    loadMoreMessages,
    selectConversation,
    sendMessage,
    deleteMessageById,
    editMessage,
    markAsSeen,
    loadUnreadCount,

    // Typing
    handleTyping,
    stopTyping,
    isPartnerTyping,

    // Online status
    isUserOnline,

    // UI controls
    setMobile,
    goBackToList,
  };
};

export default useMessaging;
