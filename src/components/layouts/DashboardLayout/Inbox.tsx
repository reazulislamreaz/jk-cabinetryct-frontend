"use client";

import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useMessaging } from "@/hooks/useMessaging";
import { useSocket } from "@/context/SocketContext";
import ChatListContainer from "./chat/ChatListContainer";
import MessageAreaContainer from "./message/MessageAreaContainer";
import { Loader2, WifiOff, MessageCircle } from "lucide-react";

const Inbox = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { isConnected, isConnecting, connect } = useSocket();
  const { unreadCount, setMobile } = useMessaging();

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [setMobile]);

  // Connect socket when component mounts
  useEffect(() => {
    if (user && !isConnected && !isConnecting) {
      connect();
    }
  }, [user, isConnected, isConnecting, connect]);

  // Loading state
  if (authLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Messages
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Chat with our support team</p>
        </div>
        <Card className="border-gray-200 min-h-[400px] sm:min-h-[500px] max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="flex flex-col items-center text-gray-400">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mb-2" />
            <p className="text-xs sm:text-sm">Loading...</p>
          </div>
        </Card>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Messages
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Chat with our support team</p>
        </div>
        <Card className="border-gray-200 min-h-[400px] sm:min-h-[500px] max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="flex flex-col items-center text-gray-400">
            <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 mb-3 opacity-50" />
            <p className="text-xs sm:text-sm font-medium">
              Please sign in to view messages
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Messages
              </h1>
              {unreadCount > 0 && (
                <Badge className="bg-primary hover:bg-primary-hover text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
              Chat with our support team
              {!isConnected && (
                <span className="inline-flex items-center gap-1 text-orange-500 text-[10px] sm:text-xs">
                  <WifiOff className="h-3 w-3" />
                  {isConnecting ? "Connecting..." : "Offline"}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="border-gray-200 h-[calc(100vh-200px)] sm:h-[calc(100vh-220px)] md:h-[calc(100vh-250px)] flex shadow-none overflow-hidden">
        <ChatListContainer />
        <MessageAreaContainer />
      </Card>
    </div>
  );
};

export default Inbox;
