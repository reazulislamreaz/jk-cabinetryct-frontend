export type UserRole = "admin" | "user" | "moderator";
export type MessageStatus = "sent" | "delivered" | "seen";
export type MessageType = "text" | "image" | "video" | "file" | "audio";

// --- User (Participant) ---
export interface IChatUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  profileImage: string;
  email: string;
  role: UserRole;
  status: "verified" | "unverified" | "banned";
}

// --- Message Content ---
export interface IMessageContent {
  messageType: MessageType;
  text?: string;
  fileUrls: string[];
}

// --- Reaction (simplified) ---
export interface IMessageReaction {
  emoji: string;
  userId: string;
  addedAt: string;
}

// --- Core Message (as received from server) ---
export interface IMessage {
  _id: string;
  id?: string; // alias from backend
  chatId: string;
  senderId: IChatUser; // can be ID (on send) or full object (on receive/fetch)
  receiverId: IChatUser;
  content: IMessageContent;
  deliveryStatus: MessageStatus;
  isPinned?: boolean;
  isDeleted?: boolean;
  priority?: "low" | "normal" | "high";
  seenBy: string[] | IChatUser[];
  deliveredTo?: string[];
  reactions: IMessageReaction[];
  deletedBy?: string[];
  unsentBy?: string[];
  editHistory?: { content: IMessageContent; editedAt: string }[];
  createdAt: string; // ISO string
  updatedAt: string;
  __v?: number;
  isUnread?: boolean;
}

// --- Conversation (from /conversation-list) ---
export interface IConversation {
  _id: string;
  id?: string;
  participants: IChatUser[];
  updatedAt: string;
  lastMessage?: {
    content: IMessageContent;
    _id: string;
    id?: string;
    senderId: IChatUser;
    createdAt: string;
    isUnread?: boolean;
  };
}

// --- Pagination (shared) ---
export interface PaginationMeta {
  page: number;
  limit: number;
  totalResult: number;
  totalPages: number;
}

// --- Standard API Response (Server → Client) ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  data: T;
}

// --- Paginated Response Wrapper (client-side normalized) ---
export interface PaginatedResponse<T> {
  results: T[];
  pagination: PaginationMeta;
}

export type ConversationList = PaginatedResponse<IConversation>;

/**
 * Paginated list of messages — used in /get-messages response
 */
export type MessagesResponseData = PaginatedResponse<IMessage>;
