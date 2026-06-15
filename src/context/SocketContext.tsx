"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { Socket } from "socket.io-client";
import { initSocket, disconnectSocket } from "@/utils/socket";
import { getAccessToken } from "@/utils/auth.utils";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  disconnect: () => void;
  onlineUsers: Set<string>;
  typingUsers: Map<string, boolean>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [typingUsers, setTypingUsers] = useState<Map<string, boolean>>(
    new Map()
  );
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const connectRef = useRef<() => void>(() => {});

  const connect = useCallback(() => {
    const token = getAccessToken();
    if (!token) {
      console.warn("No access token available for socket connection");
      return;
    }

    if (isConnected || isConnecting) {
      return;
    }

    setIsConnecting(true);

    try {
      const socketInstance = initSocket(token);
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance.id);
        setIsConnected(true);
        setIsConnecting(false);
        reconnectAttempts.current = 0;

        // Get initial online users list
        socketInstance.emit(
          "get-online-users",
          (response: { success: boolean; data: { onlineUsers: string[] } }) => {
            if (response?.success && response.data?.onlineUsers) {
              setOnlineUsers(new Set(response.data.onlineUsers));
            }
          }
        );
      });

      socketInstance.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        setIsConnected(false);

        // Auto-reconnect logic
        if (reason === "io server disconnect" || reason === "transport close") {
          if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current++;
            setTimeout(() => {
              connectRef.current();
            }, Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000));
          }
        }
      });

      socketInstance.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setIsConnecting(false);
        setIsConnected(false);
      });

      // User connected event
      socketInstance.on(
        "user:connected",
        (data: { userId: string; status: string; timestamp: string }) => {
          console.log("User connected:", data);
        }
      );

      // Online users tracking - API uses single "user:online" event with isOnline flag
      socketInstance.on(
        "user:online",
        (data: {
          userId: string;
          isOnline: boolean;
          userProfile?: unknown;
        }) => {
          setOnlineUsers((prev) => {
            const updated = new Set(prev);
            if (data.isOnline) {
              updated.add(data.userId);
            } else {
              updated.delete(data.userId);
            }
            return updated;
          });
        }
      );

      // Typing indicators - API uses "user-typing" with isTyping flag
      socketInstance.on(
        "user-typing",
        ({
          userId,
          isTyping,
        }: {
          userId: string;
          receiverId: string;
          chatId?: string;
          isTyping: boolean;
          timestamp: string;
        }) => {
          setTypingUsers((prev) => {
            const newMap = new Map(prev);
            if (isTyping) {
              newMap.set(userId, true);
            } else {
              newMap.delete(userId);
            }
            return newMap;
          });
        }
      );

      // Rate limiting handler
      socketInstance.on(
        "rate-limited",
        (data: { event: string; message: string; retryAfter: number }) => {
          console.warn(
            `Rate limited on ${data.event}. Retry after ${data.retryAfter}s`
          );
        }
      );

      // Auth error handler
      socketInstance.on("auth-error", (error: { message: string }) => {
        console.error("Socket authentication error:", error.message);
        // Could trigger token refresh or logout here
      });
    } catch (error) {
      console.error("Failed to initialize socket:", error);
      setIsConnecting(false);
    }
  }, [isConnected, isConnecting]);

  // Keep the ref updated with the latest connect function
  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  const disconnect = useCallback(() => {
    disconnectSocket();
    setSocket(null);
    setIsConnected(false);
    setIsConnecting(false);
    setOnlineUsers(new Set());
    setTypingUsers(new Map());
  }, []);

  // Auto-connect on mount if token exists
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      connect();
    }

    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: SocketContextType = {
    socket,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    onlineUsers,
    typingUsers,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
