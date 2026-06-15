import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IConversation,
  IMessage,
  PaginationMeta,
  IChatUser,
} from "@/types/inbox.types";

interface MessagingState {
  // Conversations
  conversations: IConversation[];
  conversationsLoading: boolean;
  conversationsPagination: PaginationMeta | null;

  // Active conversation
  activeConversation: IConversation | null;
  activeReceiverId: string | null;

  // Messages for active conversation
  messages: IMessage[];
  messagesLoading: boolean;
  messagesPagination: PaginationMeta | null;

  // Unread count
  unreadCount: number;

  // UI state
  isMobileView: boolean;
  showConversationList: boolean;

  // Sending state
  sendingMessage: boolean;
}

const initialState: MessagingState = {
  conversations: [],
  conversationsLoading: false,
  conversationsPagination: null,

  activeConversation: null,
  activeReceiverId: null,

  messages: [],
  messagesLoading: false,
  messagesPagination: null,

  unreadCount: 0,

  isMobileView: false,
  showConversationList: true,

  sendingMessage: false,
};

const messagingSlice = createSlice({
  name: "messaging",
  initialState,
  reducers: {
    // Conversations
    setConversations: (
      state,
      action: PayloadAction<{
        conversations: IConversation[];
        pagination: PaginationMeta;
      }>
    ) => {
      state.conversations = action.payload.conversations;
      state.conversationsPagination = action.payload.pagination;
      state.conversationsLoading = false;
    },

    appendConversations: (
      state,
      action: PayloadAction<{
        conversations: IConversation[];
        pagination: PaginationMeta;
      }>
    ) => {
      state.conversations = [
        ...state.conversations,
        ...action.payload.conversations,
      ];
      state.conversationsPagination = action.payload.pagination;
      state.conversationsLoading = false;
    },

    setConversationsLoading: (state, action: PayloadAction<boolean>) => {
      state.conversationsLoading = action.payload;
    },

    updateConversationLastMessage: (
      state,
      action: PayloadAction<{ conversationId: string; message: IMessage }>
    ) => {
      const { conversationId, message } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (c) => c._id === conversationId
      );

      if (conversationIndex !== -1) {
        const conversation = state.conversations[conversationIndex];
        conversation.lastMessage = {
          _id: message._id,
          content: message.content,
          senderId: message.senderId,
          createdAt: message.createdAt,
          isUnread: true,
        };
        conversation.updatedAt = message.createdAt;

        // Move conversation to top
        state.conversations.splice(conversationIndex, 1);
        state.conversations.unshift(conversation);
      }
    },

    // Active conversation
    setActiveConversation: (
      state,
      action: PayloadAction<IConversation | null>
    ) => {
      state.activeConversation = action.payload;
      state.activeReceiverId = action.payload
        ? action.payload.participants.find(
            (p) => p._id !== state.activeReceiverId
          )?._id || null
        : null;
      state.messages = [];
      state.messagesPagination = null;

      // On mobile, hide conversation list when selecting a chat
      if (state.isMobileView && action.payload) {
        state.showConversationList = false;
      }
    },

    setActiveReceiverId: (state, action: PayloadAction<string | null>) => {
      state.activeReceiverId = action.payload;
    },

    // Messages
    setMessages: (
      state,
      action: PayloadAction<{
        messages: IMessage[];
        pagination: PaginationMeta;
      }>
    ) => {
      // Sort messages by createdAt (oldest first for display)
      state.messages = action.payload.messages.slice().sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      state.messagesPagination = action.payload.pagination;
      state.messagesLoading = false;
    },

    prependMessages: (
      state,
      action: PayloadAction<{
        messages: IMessage[];
        pagination: PaginationMeta;
      }>
    ) => {
      // Combine old and new messages, then sort by createdAt
      const allMessages = [
        ...action.payload.messages,
        ...state.messages,
      ];
      state.messages = allMessages.sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      state.messagesPagination = action.payload.pagination;
      state.messagesLoading = false;
    },

    addMessage: (state, action: PayloadAction<IMessage>) => {
      const message = action.payload;
      // Check if message already exists
      const exists = state.messages.some((m) => m._id === message._id);
      if (!exists) {
        // Add message and sort by createdAt to maintain proper sequence
        state.messages.push(message);
        state.messages.sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    },

    updateMessage: (
      state,
      action: PayloadAction<{ messageId: string; updates: Partial<IMessage> }>
    ) => {
      const { messageId, updates } = action.payload;
      const messageIndex = state.messages.findIndex((m) => m._id === messageId);
      if (messageIndex !== -1) {
        state.messages[messageIndex] = {
          ...state.messages[messageIndex],
          ...updates,
        };
      }
    },

    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((m) => m._id !== action.payload);
    },

    setMessagesLoading: (state, action: PayloadAction<boolean>) => {
      state.messagesLoading = action.payload;
    },

    // Message sending
    setSendingMessage: (state, action: PayloadAction<boolean>) => {
      state.sendingMessage = action.payload;
    },

    // Unread count
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },

    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },

    decrementUnreadCount: (state) => {
      state.unreadCount = Math.max(0, state.unreadCount - 1);
    },

    // Mark messages as read
    markMessagesAsRead: (state, action: PayloadAction<string[]>) => {
      const messageIds = action.payload;
      state.messages = state.messages.map((m) =>
        messageIds.includes(m._id)
          ? { ...m, deliveryStatus: "seen" as const, isUnread: false }
          : m
      );
    },

    // UI State
    setMobileView: (state, action: PayloadAction<boolean>) => {
      state.isMobileView = action.payload;
      if (!action.payload) {
        state.showConversationList = true;
      }
    },

    setShowConversationList: (state, action: PayloadAction<boolean>) => {
      state.showConversationList = action.payload;
    },

    toggleConversationList: (state) => {
      state.showConversationList = !state.showConversationList;
    },

    // Reset messaging state
    resetMessaging: () => initialState,
  },
});

export const {
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
  decrementUnreadCount,
  markMessagesAsRead,
  setMobileView,
  setShowConversationList,
  toggleConversationList,
  resetMessaging,
} = messagingSlice.actions;

export default messagingSlice.reducer;
