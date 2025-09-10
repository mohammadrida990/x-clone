import { CONVERSATIONS, ConversationType } from "@/data/conversations";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState("");
  const [conversationsList, setConversationsList] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const deleteConversation = (conversationId: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversationsList((prev) =>
              prev.filter((conv) => conv.id !== conversationId)
            );
          },
        },
      ]
    );
  };

  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChatModal = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // update last message in conversation
      setConversationsList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );

      setNewMessage("");
      Alert.alert(
        "Message Sent!",
        `Your message has been sent to ${selectedConversation.user.name}`
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row justify-between items-center px-4 py-3 border-gray-100 border-b">
        <Text className="font-bold text-gray-900 text-xl">Messages</Text>

        <TouchableOpacity>
          <Feather name="edit" size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3 border-gray-100 border-b">
        <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-full">
          <Feather name="search" size={20} color="#657786" />

          <TextInput
            placeholder="Search for people and groups"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {conversationsList.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            className="flex-row items-center active:bg-gray-50 p-4 border-gray-50 border-b"
            onPress={() => openConversation(conversation)}
            onLongPress={() => deleteConversation(conversation.id)}
          >
            <Image
              source={{ uri: conversation.user.avatar }}
              className="mr-3 rounded-full size-12"
            />

            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <View className="flex-row items-center gap-1">
                  <Text className="font-semibold text-gray-900">
                    {conversation.user.name}
                  </Text>

                  {conversation.user.verified && (
                    <Feather
                      name="check-circle"
                      size={16}
                      color="#1DA1F2"
                      className="ml-1"
                    />
                  )}

                  <Text className="ml-1 text-gray-500 text-sm">
                    @{conversation.user.username}
                  </Text>
                </View>

                <Text className="text-gray-500 text-sm">
                  {conversation.time}
                </Text>
              </View>

              <Text className="text-gray-500 text-sm" numberOfLines={1}>
                {conversation.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="bg-gray-50 px-4 py-2 border-gray-100 border-t">
        <Text className="text-gray-500 text-xs text-center">
          Tap to open • Long press to delete
        </Text>
      </View>

      <Modal
        visible={isChatOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedConversation && (
          <SafeAreaView className="flex-1">
            {/* Chat Header */}
            <View className="flex-row items-center px-4 py-3 border-gray-100 border-b">
              <TouchableOpacity onPress={closeChatModal} className="mr-3">
                <Feather name="arrow-left" size={24} color="#1DA1F2" />
              </TouchableOpacity>

              <Image
                source={{ uri: selectedConversation.user.avatar }}
                className="mr-3 rounded-full size-10"
              />

              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="mr-1 font-semibold text-gray-900">
                    {selectedConversation.user.name}
                  </Text>

                  {selectedConversation.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" />
                  )}
                </View>

                <Text className="text-gray-500 text-sm">
                  @{selectedConversation.user.username}
                </Text>
              </View>
            </View>

            <ScrollView className="flex-1 px-4 py-4">
              <View className="mb-4">
                <Text className="mb-4 text-gray-400 text-sm text-center">
                  This is the beginning of your conversation with{" "}
                  {selectedConversation.user.name}
                </Text>

                {selectedConversation.messages.map((message) => (
                  <View
                    key={message.id}
                    className={`flex-row mb-3 ${message.fromUser ? "justify-end" : ""}`}
                  >
                    {!message.fromUser && (
                      <Image
                        source={{ uri: selectedConversation.user.avatar }}
                        className="mr-2 rounded-full size-8"
                      />
                    )}

                    <View
                      className={`flex-1 ${message.fromUser ? "items-end" : ""}`}
                    >
                      <View
                        className={`rounded-2xl px-4 py-3 max-w-xs ${
                          message.fromUser ? "bg-blue-500" : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={
                            message.fromUser ? "text-white" : "text-gray-900"
                          }
                        >
                          {message.text}
                        </Text>
                      </View>

                      <Text className="mt-1 text-gray-400 text-xs">
                        {message.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            <View className="flex-row items-center px-4 py-3 border-gray-100 border-t">
              <View className="flex-row flex-1 items-center bg-gray-100 mr-3 px-4 py-3 rounded-full">
                <TextInput
                  className="flex-1 text-base"
                  placeholder="Start a message..."
                  placeholderTextColor="#657786"
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
              </View>

              <TouchableOpacity
                onPress={sendMessage}
                className={`size-10 rounded-full items-center justify-center ${
                  newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
                }`}
                disabled={!newMessage.trim()}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessagesScreen;
