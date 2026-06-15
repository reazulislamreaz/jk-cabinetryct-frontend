"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send, Smile, Loader2 } from "lucide-react";

interface MessageInputProps {
  onSend: (text: string) => void | Promise<unknown>;
  onTyping: () => void;
  disabled?: boolean;
  sending?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  onTyping,
  disabled = false,
  sending = false,
  placeholder = "Type a message...",
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [message]);

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    if (sending) return;

    try {
      await onSend(trimmedMessage);
      setMessage("");

      // Reset textarea height and focus
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.focus();
      }
    } catch {
      // If send fails, keep the message and focus for retry
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onTyping();
  };

  const isButtonDisabled = disabled || sending || !message.trim();

  return (
    <div className="border-t border-gray-200 bg-white p-2 sm:p-4">
      {/* Input area */}
      <div className="flex items-end gap-1.5 sm:gap-2">
        {/* Message input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || sending}
            rows={1}
            className={cn(
              "resize-none min-h-10 sm:min-h-11 max-h-[100px] sm:max-h-[120px] py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base",
              "border-gray-200 focus:border-primary focus:ring-primary",
              "rounded-xl bg-gray-50 focus:bg-white"
            )}
          />

          {/* Emoji button (placeholder) */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1.5 sm:right-2 bottom-1 sm:bottom-1.5 h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-gray-600"
            disabled={disabled}
          >
            <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Send button */}
        <Button
          type="button"
          size="icon"
          className={cn(
            "shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full",
            "bg-primary hover:bg-primary-hover text-white",
            "transition-all duration-200",
            isButtonDisabled && "opacity-50"
          )}
          onClick={handleSend}
          disabled={isButtonDisabled}
        >
          {sending ? (
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          ) : (
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
