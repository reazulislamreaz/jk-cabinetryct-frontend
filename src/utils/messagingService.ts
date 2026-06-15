import {
  ApiResponse,
  ConversationList,
  IMessage,
  MessagesResponseData,
} from "@/types/inbox.types";
import { getSocket } from "./socket";

// --- Function Types (as before) ---
interface FetchListParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

interface FetchMessagesParams {
  page?: number;
  limit?: number;
}

// --- Strongly-Typed Functions ---

export const fetchConversationList = (
  params: FetchListParams = {}
): Promise<ConversationList> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) {
      reject(new Error("Socket not connected"));
      return;
    }

    socket.emit(
      "conversation-list",
      {
        page: params.page || 1,
        limit: params.limit || 50,
        searchTerm: params.searchTerm || "",
      },
      (response: ApiResponse<ConversationList>) => {
        if (response.success) {
          resolve(response.data); // ✅ type-safe
        } else {
          reject(
            new Error(response.message || "Failed to fetch conversation list")
          );
        }
      }
    );
  });
};

export const fetchMessages = (
  receiverId: string,
  params: FetchMessagesParams = {}
): Promise<MessagesResponseData> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) {
      reject(new Error("Socket not connected"));
      return;
    }

    socket.emit(
      "get-messages",
      {
        receiverId,
        page: params.page || 1,
        limit: params.limit || 50,
      },
      (response: ApiResponse<MessagesResponseData>) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response.message || "Failed to fetch messages"));
        }
      }
    );
  });
};

// For operations that return just success + maybe minimal payload (e.g., ID or boolean)
export const sendMessage = (messageData: {
  receiverId: string;
  message: string;
}): Promise<IMessage> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();

    if (!socket) {
      console.error("sendMessage: Socket is null");
      reject(new Error("Socket not connected"));
      return;
    }

    if (!socket.connected) {
      console.error(
        "sendMessage: Socket exists but not connected. Socket ID:",
        socket.id
      );
      reject(new Error("Socket not connected"));
      return;
    }

    console.log("sendMessage: Sending message via socket", {
      socketId: socket.id,
      connected: socket.connected,
      messageData,
    });

    // Set a timeout in case server doesn't respond
    const timeout = setTimeout(() => {
      console.error("sendMessage: Timeout - no response from server after 10s");
      reject(new Error("Message send timeout - no response from server"));
    }, 10000);

    socket.emit(
      "send-message",
      messageData,
      (response: ApiResponse<IMessage>) => {
        clearTimeout(timeout);
        console.log("sendMessage: Received response", response);

        if (response && response.success) {
          resolve(response.data);
        } else {
          const errorMsg = response?.message || "Failed to send message";
          console.error("sendMessage: Server returned error:", errorMsg);
          reject(new Error(errorMsg));
        }
      }
    );
  });
};

export const getUnviewedMessageCount = (): Promise<{ count: number }> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) {
      reject(new Error("Socket not connected"));
      return;
    }

    socket.emit(
      "get-unviewed-message-count",
      {},
      (response: ApiResponse<{ count: number }>) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(
            new Error(
              response.message || "Failed to get unviewed message count"
            )
          );
        }
      }
    );
  });
};

export const markMessageSeen = (
  messageId: string
): Promise<{ success: boolean; alreadySeen?: boolean }> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) {
      reject(new Error("Socket not connected"));
      return;
    }

    socket.emit(
      "mark-seen",
      { messageId },
      (response: ApiResponse<{ success: true }>) => {
        if (response.success) {
          resolve({ success: true });
        } else if (
          response.message?.toLowerCase().includes("not found") ||
          response.message?.toLowerCase().includes("already seen")
        ) {
          // Message not found or already seen is not an error - resolve gracefully
          resolve({ success: true, alreadySeen: true });
        } else {
          reject(
            new Error(response.message || "Failed to mark message as seen")
          );
        }
      }
    );
  });
};

export const deleteMessage = (
  messageId: string
): Promise<{ deleted: boolean }> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) {
      reject(new Error("Socket not connected"));
      return;
    }

    socket.emit(
      "delete-message",
      { messageId },
      (response: ApiResponse<{ deleted: boolean }>) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response.message || "Failed to delete message"));
        }
      }
    );
  });
};

export const updateMessage = (
  messageId: string,
  newContent: string
): Promise<IMessage> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) {
      reject(new Error("Socket not connected"));
      return;
    }

    socket.emit(
      "update-message",
      { messageId, message: newContent },
      (response: ApiResponse<IMessage>) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response.message || "Failed to update message"));
        }
      }
    );
  });
};

export const addReaction = (
  messageId: string,
  emoji: string
): Promise<IMessage> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) {
      reject(new Error("Socket not connected"));
      return;
    }

    socket.emit(
      "add-reaction",
      { messageId, emoji },
      (response: ApiResponse<IMessage>) => {
        // assuming full updated message is returned
        if (response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response.message || "Failed to add reaction"));
        }
      }
    );
  });
};

// Typing indicators are fire-and-forget → no promise needed (already void)
export const sendTypingStart = (receiverId: string): void => {
  const socket = getSocket();
  if (!socket) {
    console.error("Socket not connected");
    return;
  }
  socket.emit("typing-start", { receiverId });
};

export const sendTypingStop = (receiverId: string): void => {
  const socket = getSocket();
  if (!socket) {
    console.error("Socket not connected");
    return;
  }
  socket.emit("typing-stop", { receiverId });
};
