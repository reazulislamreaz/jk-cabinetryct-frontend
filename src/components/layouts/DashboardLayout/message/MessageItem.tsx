"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { IMessage } from "@/types/inbox.types";
import { Check, CheckCheck, Copy, Edit, MoreVertical, Trash2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface MessageItemProps {
  message: IMessage;
  isOwn: boolean;
  showAvatar: boolean;
  showTimestamp: boolean;
  onDelete?: (messageId: string) => void;
  onEdit?: (messageId: string, content: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isOwn,
  showAvatar,
  showTimestamp,
  onDelete,
  onEdit,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sender = message.senderId;
  const senderName =
    sender.firstName && sender.lastName
      ? `${sender.firstName} ${sender.lastName}`
      : sender.email || "Unknown";
  const senderInitials =
    sender.firstName && sender.lastName
      ? `${sender.firstName[0]}${sender.lastName[0]}`.toUpperCase()
      : sender.email?.[0]?.toUpperCase() || "U";

  const formatTime = (dateString: string) => {
    return moment(dateString).format("h:mm A");
  };

  const formatDate = (dateString: string) => {
    const date = moment(dateString);
    const now = moment();

    if (date.isSame(now, "day")) {
      return "Today";
    } else if (date.isSame(now.subtract(1, "day"), "day")) {
      return "Yesterday";
    } else if (date.isSame(now, "year")) {
      return date.format("MMMM D");
    } else {
      return date.format("MMMM D, YYYY");
    }
  };

  const renderDeliveryStatus = () => {
    if (!isOwn) return null;

    switch (message.deliveryStatus) {
      case "sent":
        return <Check className="h-3.5 w-3.5 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="h-3.5 w-3.5 text-gray-400" />;
      case "seen":
        return <CheckCheck className="h-3.5 w-3.5 text-primary" />;
      default:
        return null;
    }
  };

  const handleCopy = () => {
    if (message.content.text) {
      navigator.clipboard.writeText(message.content.text);
      toast.success("Message copied to clipboard");
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(message._id);
    }
  };

  const renderContent = () => {
    const { content } = message;

    // Text message
    if (content.messageType === "text" && content.text) {
      return (
        <p className="text-sm whitespace-pre-wrap wrap-break-word">{content.text}</p>
      );
    }

    // Image message
    if (content.messageType === "image" && content.fileUrls?.length > 0) {
      return (
        <div className="space-y-2">
          {content.text && (
            <p className="text-sm whitespace-pre-wrap wrap-break-word mb-2">
              {content.text}
            </p>
          )}
          <div className="grid gap-2">
            {content.fileUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Image ${index + 1}`}
                width={280}
                height={200}
                className="max-w-[280px] rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(url, "_blank")}
              />
            ))}
          </div>
        </div>
      );
    }

    // File message
    if (content.messageType === "file" && content.fileUrls?.length > 0) {
      return (
        <div className="space-y-2">
          {content.text && (
            <p className="text-sm whitespace-pre-wrap wrap-break-word mb-2">
              {content.text}
            </p>
          )}
          <div className="space-y-1">
            {content.fileUrls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span className="text-sm text-primary truncate max-w-[200px]">
                  {url.split("/").pop() || "File"}
                </span>
              </a>
            ))}
          </div>
        </div>
      );
    }

    return <p className="text-sm text-gray-500 italic">Unsupported message type</p>;
  };

  return (
    <div className="px-4">
      {/* Date separator */}
      {showTimestamp && (
        <div className="flex items-center justify-center my-4">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {formatDate(message.createdAt)}
          </span>
        </div>
      )}

      {/* Message bubble */}
      <div
        className={cn(
          "flex items-end gap-2 mb-1",
          isOwn ? "justify-end" : "justify-start"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Avatar (only for received messages) */}
        {!isOwn && (
          <div className="shrink-0">
            {showAvatar ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={`${sender?.profileImage}`} alt={senderName} />
                <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                  {senderInitials}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-8" />
            )}
          </div>
        )}

        {/* Message actions (left side for own messages) */}
        {isOwn && (
          <div
            className={cn(
              "flex items-center transition-opacity",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </DropdownMenuItem>
                {onEdit && message.content.messageType === "text" && (
                  <DropdownMenuItem
                    onClick={() => onEdit(message._id, message.content.text || "")}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            "max-w-[70%] rounded-2xl px-4 py-2",
            isOwn
              ? "bg-primary text-white rounded-br-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-sm"
          )}
        >
          {renderContent()}

          {/* Time and delivery status */}
          <div
            className={cn(
              "flex items-center gap-1 mt-1",
              isOwn ? "justify-end" : "justify-start"
            )}
          >
            <span
              className={cn(
                "text-[10px]",
                isOwn ? "text-white/70" : "text-gray-400"
              )}
            >
              {formatTime(message.createdAt)}
            </span>
            {renderDeliveryStatus()}
          </div>
        </div>

        {/* Message actions (right side for received messages) */}
        {!isOwn && (
          <div
            className={cn(
              "flex items-center transition-opacity",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
