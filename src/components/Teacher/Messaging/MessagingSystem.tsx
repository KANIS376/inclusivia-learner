import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Send, Paperclip, MoreVertical, Phone, 
  Video, Users, ChevronLeft, User, Clock, MessageSquare
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: { type: string; url: string; name: string }[];
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    lastSeen?: Date;
    role: 'student' | 'teacher';
  }[];
  messages: Message[];
  unreadCount: number;
  lastMessage?: {
    content: string;
    timestamp: Date;
  };
  isGroupChat: boolean;
}

// Mock data
const mockUser = {
  id: 'teacher-1',
  name: 'Alex Morgan',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  isOnline: true,
  role: 'teacher' as const
};

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [
      {
        id: 'student-1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        isOnline: true,
        role: 'student'
      },
      mockUser
    ],
    messages: [
      {
        id: 'msg-1',
        senderId: 'student-1',
        content: 'Hello Ms. Morgan, I had a question about the homework assignment.',
        timestamp: new Date('2023-05-05T09:30:00'),
        status: 'read'
      },
      {
        id: 'msg-2',
        senderId: 'teacher-1',
        content: 'Hi Sarah, I\'d be happy to help. What specifically are you having trouble with?',
        timestamp: new Date('2023-05-05T09:35:00'),
        status: 'read'
      },
      {
        id: 'msg-3',
        senderId: 'student-1',
        content: 'I\'m not sure how to approach problem #5. I keep getting the wrong answer.',
        timestamp: new Date('2023-05-05T09:40:00'),
        status: 'read'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      content: 'I\'m not sure how to approach problem #5. I keep getting the wrong answer.',
      timestamp: new Date('2023-05-05T09:40:00')
    },
    isGroupChat: false
  },
  {
    id: 'conv-2',
    participants: [
      {
        id: 'student-2',
        name: 'David Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        isOnline: false,
        lastSeen: new Date('2023-05-05T08:20:00'),
        role: 'student'
      },
      mockUser
    ],
    messages: [
      {
        id: 'msg-4',
        senderId: 'student-2',
        content: 'Ms. Morgan, will we need to bring our laptops to class tomorrow?',
        timestamp: new Date('2023-05-04T14:20:00'),
        status: 'read'
      },
      {
        id: 'msg-5',
        senderId: 'teacher-1',
        content: 'Yes, we\'ll be doing a coding exercise in class.',
        timestamp: new Date('2023-05-04T14:25:00'),
        status: 'read'
      },
      {
        id: 'msg-6',
        senderId: 'student-2',
        content: 'Great, thank you!',
        timestamp: new Date('2023-05-04T14:30:00'),
        status: 'read'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      content: 'Great, thank you!',
      timestamp: new Date('2023-05-04T14:30:00')
    },
    isGroupChat: false
  },
  {
    id: 'conv-3',
    participants: [
      {
        id: 'student-3',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        isOnline: true,
        role: 'student'
      },
      mockUser
    ],
    messages: [
      {
        id: 'msg-7',
        senderId: 'student-3',
        content: 'Hi Ms. Morgan, I wanted to let you know I\'ll be missing class next Monday for a doctor\'s appointment.',
        timestamp: new Date('2023-05-03T10:15:00'),
        status: 'read'
      },
      {
        id: 'msg-8',
        senderId: 'teacher-1',
        content: 'Thanks for letting me know, Emma. I\'ll make sure you get the materials you\'ll miss.',
        timestamp: new Date('2023-05-03T10:20:00'),
        status: 'read'
      },
      {
        id: 'msg-9',
        senderId: 'student-3',
        content: 'I appreciate that. Will there be any important assignments?',
        timestamp: new Date('2023-05-03T10:25:00'),
        status: 'read'
      },
      {
        id: 'msg-10',
        senderId: 'teacher-1',
        content: 'We\'ll be starting a new project, but I\'ll send you all the details and you can get started when you return.',
        timestamp: new Date('2023-05-03T10:30:00'),
        status: 'delivered'
      }
    ],
    unreadCount: 1,
    lastMessage: {
      content: 'We\'ll be starting a new project, but I\'ll send you all the details and you can get started when you return.',
      timestamp: new Date('2023-05-03T10:30:00')
    },
    isGroupChat: false
  },
  {
    id: 'conv-4',
    participants: [
      {
        id: 'student-4',
        name: 'Group: Advanced Physics',
        avatar: '',
        isOnline: false,
        role: 'student'
      },
      {
        id: 'student-1',
        name: 'Sarah Johnson',
        avatar: '',
        isOnline: true,
        role: 'student'
      },
      {
        id: 'student-2',
        name: 'David Lee',
        avatar: '',
        isOnline: false,
        role: 'student'
      },
      {
        id: 'student-3',
        name: 'Emma Wilson',
        avatar: '',
        isOnline: true,
        role: 'student'
      },
      mockUser
    ],
    messages: [
      {
        id: 'msg-11',
        senderId: 'teacher-1',
        content: 'Hello everyone, I\'m creating this group for our Physics class discussions.',
        timestamp: new Date('2023-05-02T11:00:00'),
        status: 'read'
      },
      {
        id: 'msg-12',
        senderId: 'student-1',
        content: 'Great idea, Ms. Morgan!',
        timestamp: new Date('2023-05-02T11:05:00'),
        status: 'read'
      },
      {
        id: 'msg-13',
        senderId: 'student-3',
        content: 'Will this be where you post homework assignments as well?',
        timestamp: new Date('2023-05-02T11:10:00'),
        status: 'read'
      }
    ],
    unreadCount: 0,
    lastMessage: {
      content: 'Will this be where you post homework assignments as well?',
      timestamp: new Date('2023-05-02T11:10:00')
    },
    isGroupChat: true
  }
];

const MessagingSystem: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);
  
  const filteredConversations = conversations.filter(conversation => {
    const participantNames = conversation.participants
      .filter(p => p.id !== mockUser.id)
      .map(p => p.name.toLowerCase());
    
    return participantNames.some(name => name.includes(searchQuery.toLowerCase()));
  });
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setIsMobileConversationOpen(true);
    }
    
    if (conversation.unreadCount > 0) {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === conversation.id) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map(msg => ({
              ...msg,
              status: 'read' as const
            }))
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
    }
  };
  
  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: mockUser.id,
      content: message,
      timestamp: new Date(),
      status: 'sent'
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: {
            content: message,
            timestamp: new Date()
          }
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setMessage('');
    
    setSelectedConversation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: {
          content: message,
          timestamp: new Date()
        }
      };
    });
  };
  
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatConversationTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return formatMessageTime(date);
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.id !== mockUser.id);
  };
  
  const handleBackToList = () => {
    setIsMobileConversationOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with your students and manage conversations.
        </p>
      </div>
      
      <div className="h-[calc(100vh-250px)] border rounded-lg overflow-hidden">
        <div className="grid h-full" style={{ gridTemplateColumns: isMobile ? '1fr' : '350px 1fr' }}>
          {(!isMobile || !isMobileConversationOpen) && (
            <div className="border-r">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <ScrollArea className="h-[calc(100vh-315px)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => {
                    const otherParticipant = getOtherParticipant(conversation);
                    return (
                      <div
                        key={conversation.id}
                        className={`p-3 border-b cursor-pointer hover:bg-accent/50 transition-colors ${
                          selectedConversation?.id === conversation.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="flex items-center space-x-3">
                          {conversation.isGroupChat ? (
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                          ) : (
                            <div className="relative">
                              {otherParticipant?.avatar ? (
                                <img
                                  src={otherParticipant.avatar}
                                  alt={otherParticipant.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                  <User className="h-5 w-5 text-primary" />
                                </div>
                              )}
                              {otherParticipant?.isOnline && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                              )}
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm truncate">
                                {conversation.isGroupChat 
                                  ? otherParticipant?.name 
                                  : otherParticipant?.name}
                              </h4>
                              {conversation.lastMessage && (
                                <span className="text-xs text-muted-foreground">
                                  {formatConversationTime(conversation.lastMessage.timestamp)}
                                </span>
                              )}
                            </div>
                            <div className="flex justify-between items-center">
                              {conversation.lastMessage && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {conversation.lastMessage.content}
                                </p>
                              )}
                              {conversation.unreadCount > 0 && (
                                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    No conversations found.
                  </div>
                )}
              </ScrollArea>
            </div>
          )}
          
          {(!isMobile || isMobileConversationOpen) && (
            <div className="flex flex-col h-full">
              {selectedConversation ? (
                <>
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {isMobile && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={handleBackToList}
                          className="mr-1"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                      )}
                      
                      {selectedConversation.isGroupChat ? (
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      ) : (
                        <div className="relative">
                          {getOtherParticipant(selectedConversation)?.avatar ? (
                            <img
                              src={getOtherParticipant(selectedConversation)?.avatar}
                              alt={getOtherParticipant(selectedConversation)?.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                          )}
                          {getOtherParticipant(selectedConversation)?.isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                          )}
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-medium">
                          {getOtherParticipant(selectedConversation)?.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {getOtherParticipant(selectedConversation)?.isOnline 
                            ? 'Online' 
                            : getOtherParticipant(selectedConversation)?.lastSeen 
                              ? `Last seen ${formatConversationTime(getOtherParticipant(selectedConversation)?.lastSeen!)}` 
                              : 'Offline'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View profile</DropdownMenuItem>
                          <DropdownMenuItem>Clear chat</DropdownMenuItem>
                          <DropdownMenuItem>Block</DropdownMenuItem>
                          <DropdownMenuItem>Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message) => {
                        const isCurrentUser = message.senderId === mockUser.id;
                        const participant = selectedConversation.participants.find(
                          p => p.id === message.senderId
                        );
                        
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className="flex items-end space-x-2">
                              {!isCurrentUser && participant?.avatar && (
                                <img
                                  src={participant.avatar}
                                  alt={participant.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              )}
                              
                              {!isCurrentUser && !participant?.avatar && (
                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-primary" />
                                </div>
                              )}
                              
                              <div
                                className={`max-w-[75%] rounded-lg p-3 ${
                                  isCurrentUser
                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <div className={`text-xs mt-1 flex items-center space-x-1 ${
                                  isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                }`}>
                                  <span>{formatMessageTime(message.timestamp)}</span>
                                  {isCurrentUser && message.status === 'read' && (
                                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M2 12L7 17L17 7M7 12L12 17L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                  {isCurrentUser && message.status === 'delivered' && (
                                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  <div className="p-3 border-t">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!message.trim()}
                        size="icon"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Conversation Selected</h2>
                  <p className="text-muted-foreground">
                    Select a conversation from the list to start messaging.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;
