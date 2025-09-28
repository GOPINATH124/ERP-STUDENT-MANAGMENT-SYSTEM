import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  MessageSquare,
  Calendar,
  Users,
  Plus,
  Pin,
  Eye,
  Bell,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import type { User } from "../../App";

interface NoticeBoardProps {
  user: User;
}

interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  priority: "low" | "medium" | "high" | "urgent";
  category:
    | "general"
    | "academic"
    | "exam"
    | "event"
    | "holiday"
    | "fee"
    | "transport";
  targetAudience: string[];
  isPinned: boolean;
  views: number;
}

interface Message {
  id: string;
  sender: string;
  senderRole: string;
  recipient: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
  type: "sent" | "received";
}

const mockNotices: Notice[] = [
  {
    id: "1",
    title: "Annual Sports Day - March 30th",
    content:
      "We are excited to announce our Annual Sports Day on March 30th, 2024. All students are encouraged to participate in various sporting events. Registration forms are available at the sports office.",
    author: "Dr. Sarah Johnson",
    authorRole: "Principal",
    date: "2024-03-15",
    priority: "high",
    category: "event",
    targetAudience: ["students", "parents"],
    isPinned: true,
    views: 245,
  },
  {
    id: "2",
    title: "Mid-Term Exam Schedule Released",
    content:
      "The mid-term examination schedule has been published. Please check your class timetables for specific dates and timings. Exam hall allocation will be announced soon.",
    author: "Prof. Michael Chen",
    authorRole: "Academic Coordinator",
    date: "2024-03-14",
    priority: "urgent",
    category: "exam",
    targetAudience: ["students", "parents", "teachers"],
    isPinned: true,
    views: 189,
  },
  {
    id: "3",
    title: "Library Closure for Maintenance",
    content:
      "The school library will remain closed from March 20-22 for annual maintenance and book inventory. Students can collect issued books from the temporary counter.",
    author: "Ms. Jennifer Davis",
    authorRole: "Librarian",
    date: "2024-03-13",
    priority: "medium",
    category: "general",
    targetAudience: ["students", "teachers"],
    isPinned: false,
    views: 76,
  },
  {
    id: "4",
    title: "Fee Payment Reminder",
    content:
      "This is a reminder that the quarterly fee payment is due by March 25th. Late payment charges will apply after the due date. Please visit the accounts office for any queries.",
    author: "Mr. Robert Wilson",
    authorRole: "Accounts Manager",
    date: "2024-03-12",
    priority: "high",
    category: "fee",
    targetAudience: ["students", "parents"],
    isPinned: false,
    views: 156,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Dr. Sarah Johnson",
    senderRole: "Principal",
    recipient: "Alex Rodriguez",
    subject: "Academic Performance Review",
    content:
      "Dear Alex, I would like to schedule a meeting to discuss your excellent academic performance this semester. Please see me during office hours.",
    date: "2024-03-15",
    isRead: false,
    type: "received",
  },
  {
    id: "2",
    sender: "Alex Rodriguez",
    senderRole: "Student",
    recipient: "Prof. Michael Chen",
    subject: "Assignment Extension Request",
    content:
      "Dear Professor, I would like to request a 2-day extension for the Mathematics assignment due to illness. I have attached the medical certificate.",
    date: "2024-03-14",
    isRead: true,
    type: "sent",
  },
];

export function NoticeBoard({ user }: NoticeBoardProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [selectedPriority, setSelectedPriority] =
    useState("all");
  const [isCreateNoticeOpen, setIsCreateNoticeOpen] =
    useState(false);
  const [isComposeMessageOpen, setIsComposeMessageOpen] =
    useState(false);
  const [selectedNotice, setSelectedNotice] =
    useState<Notice | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "high":
        return <Bell className="w-4 h-4 text-orange-600" />;
      case "medium":
        return <Info className="w-4 h-4 text-yellow-600" />;
      case "low":
        return (
          <CheckCircle className="w-4 h-4 text-green-600" />
        );
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "exam":
        return "bg-purple-100 text-purple-800";
      case "event":
        return "bg-green-100 text-green-800";
      case "holiday":
        return "bg-pink-100 text-pink-800";
      case "fee":
        return "bg-yellow-100 text-yellow-800";
      case "transport":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredNotices = mockNotices.filter((notice) => {
    const matchesCategory =
      selectedCategory === "all" ||
      notice.category === selectedCategory;
    const matchesPriority =
      selectedPriority === "all" ||
      notice.priority === selectedPriority;
    const hasAccess =
      notice.targetAudience.includes(user.role) ||
      user.role === "admin";
    return matchesCategory && matchesPriority && hasAccess;
  });

  const sortedNotices = filteredNotices.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return (
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  const renderNotices = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">
              Notice Board
            </h3>
            <p className="text-muted-foreground">
              Important announcements and updates
            </p>
          </div>
          {(user.role === "admin" ||
            user.role === "teacher") && (
            <Button onClick={() => setIsCreateNoticeOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Notice
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex space-x-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Categories
                  </SelectItem>
                  <SelectItem value="general">
                    General
                  </SelectItem>
                  <SelectItem value="academic">
                    Academic
                  </SelectItem>
                  <SelectItem value="exam">
                    Examinations
                  </SelectItem>
                  <SelectItem value="event">Events</SelectItem>
                  <SelectItem value="holiday">
                    Holidays
                  </SelectItem>
                  <SelectItem value="fee">
                    Fee Related
                  </SelectItem>
                  <SelectItem value="transport">
                    Transport
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedPriority}
                onValueChange={setSelectedPriority}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Priority
                  </SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notices List */}
        <div className="space-y-4">
          {sortedNotices.map((notice) => (
            <Card
              key={notice.id}
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                notice.isPinned
                  ? "border-blue-200 bg-blue-50"
                  : ""
              }`}
              onClick={() => setSelectedNotice(notice)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {notice.isPinned && (
                        <Pin className="w-4 h-4 text-blue-600" />
                      )}
                      {getPriorityIcon(notice.priority)}
                      <h4 className="font-semibold">
                        {notice.title}
                      </h4>
                      <Badge
                        className={getCategoryColor(
                          notice.category,
                        )}
                      >
                        {notice.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {notice.content}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {notice.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {notice.author} • {notice.authorRole}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {notice.views} views
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={getPriorityColor(
                      notice.priority,
                    )}
                  >
                    {notice.priority}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    const unreadCount = mockMessages.filter(
      (msg) => !msg.isRead && msg.type === "received",
    ).length;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Messages</h3>
            <p className="text-muted-foreground">
              Communication center • {unreadCount} unread
              messages
            </p>
          </div>
          <Button onClick={() => setIsComposeMessageOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Compose Message
          </Button>
        </div>

        <div className="space-y-4">
          {mockMessages.map((message) => (
            <Card
              key={message.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4
                          className={`font-medium ${!message.isRead && message.type === "received" ? "font-bold" : ""}`}
                        >
                          {message.type === "sent"
                            ? `To: ${message.recipient}`
                            : `From: ${message.sender}`}
                        </h4>
                        {!message.isRead &&
                          message.type === "received" && (
                            <Badge
                              variant="destructive"
                              className="text-xs"
                            >
                              New
                            </Badge>
                          )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {message.senderRole}
                      </p>
                      <h5 className="font-medium text-sm mb-2">
                        {message.subject}
                      </h5>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {message.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.date}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">
          Notice Board & Messages
        </h2>
        <p className="text-muted-foreground">
          Stay updated with announcements and communications
        </p>
      </div>

      <Tabs defaultValue="notices">
        <TabsList>
          <TabsTrigger value="notices">
            <MessageSquare className="w-4 h-4 mr-2" />
            Notices
          </TabsTrigger>
          <TabsTrigger value="messages">
            <Bell className="w-4 h-4 mr-2" />
            Messages
            {mockMessages.filter(
              (msg) => !msg.isRead && msg.type === "received",
            ).length > 0 && (
              <Badge
                variant="destructive"
                className="ml-1 text-xs"
              >
                {
                  mockMessages.filter(
                    (msg) =>
                      !msg.isRead && msg.type === "received",
                  ).length
                }
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notices">
          {renderNotices()}
        </TabsContent>

        <TabsContent value="messages">
          {renderMessages()}
        </TabsContent>
      </Tabs>

      {/* Notice Detail Dialog */}
      <Dialog
        open={!!selectedNotice}
        onOpenChange={() => setSelectedNotice(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center space-x-2">
              {selectedNotice?.isPinned && (
                <Pin className="w-4 h-4 text-blue-600" />
              )}
              {selectedNotice &&
                getPriorityIcon(selectedNotice.priority)}
              <DialogTitle>{selectedNotice?.title}</DialogTitle>
            </div>
            <DialogDescription>
              {selectedNotice?.author} •{" "}
              {selectedNotice?.authorRole} •{" "}
              {selectedNotice?.date}
            </DialogDescription>
          </DialogHeader>

          {selectedNotice && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Badge
                  className={getPriorityColor(
                    selectedNotice.priority,
                  )}
                >
                  {selectedNotice.priority}
                </Badge>
                <Badge
                  className={getCategoryColor(
                    selectedNotice.category,
                  )}
                >
                  {selectedNotice.category}
                </Badge>
              </div>

              <div className="prose max-w-none">
                <p>{selectedNotice.content}</p>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-4 h-4 mr-1" />
                {selectedNotice.views} views
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Notice Dialog */}
      <Dialog
        open={isCreateNoticeOpen}
        onOpenChange={setIsCreateNoticeOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Notice</DialogTitle>
            <DialogDescription>
              Post a new notice or announcement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter notice title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">
                      General
                    </SelectItem>
                    <SelectItem value="academic">
                      Academic
                    </SelectItem>
                    <SelectItem value="exam">
                      Examinations
                    </SelectItem>
                    <SelectItem value="event">
                      Events
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">
                      Medium
                    </SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">
                      Urgent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter notice content"
                rows={5}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsCreateNoticeOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsCreateNoticeOpen(false)}
            >
              Publish Notice
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Compose Message Dialog */}
      <Dialog
        open={isComposeMessageOpen}
        onOpenChange={setIsComposeMessageOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>
              Send a message to students, teachers, or parents
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Enter recipient name or email"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter message subject"
              />
            </div>

            <div>
              <Label htmlFor="messageContent">Message</Label>
              <Textarea
                id="messageContent"
                placeholder="Enter your message"
                rows={5}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsComposeMessageOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsComposeMessageOpen(false)}
            >
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}