import { Notification } from "@/types";
import { formatDate } from "@/utils/formatters";
import { Feather } from "@expo/vector-icons";
import { View, Text, Alert, Image, TouchableOpacity } from "react-native";

interface NotificationCardProps {
  notification: Notification;
  onDelete: (notificationId: string) => void;
}

const NotificationCard = ({
  notification,
  onDelete,
}: NotificationCardProps) => {
  const getNotificationText = () => {
    const name = `${notification.from.firstName} ${notification.from.lastName}`;

    switch (notification.type) {
      case "like":
        return `${name} liked your post`;
      case "comment":
        return `${name} commented on your post`;
      case "follow":
        return `${name} started following you`;
      default:
        return "";
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "like":
        return <Feather name="heart" size={20} color="#E0245E" />;
      case "comment":
        return <Feather name="message-circle" size={20} color="#1DA1F2" />;
      case "follow":
        return <Feather name="user-plus" size={20} color="#17BF63" />;
      default:
        return <Feather name="bell" size={20} color="#657786" />;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(notification._id),
        },
      ]
    );
  };

  return (
    <View className="bg-white border-gray-100 border-b">
      <View className="flex-row p-4">
        <View className="relative mr-3">
          <Image
            source={{ uri: notification.from.profilePicture }}
            className="rounded-full size-12"
          />

          <View className="-right-1 -bottom-1 justify-center items-center bg-white size-6 abolute">
            {getNotificationIcon()}
          </View>
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <View className="flex-1">
              <Text className="mb-1 text-gray-900 text-base leading-5">
                <Text className="font-semibold">
                  {notification.from.firstName} {notification.from.lastName}
                </Text>

                <Text className="text-gray-500">
                  {" "}
                  @{notification.from.username}
                </Text>
              </Text>

              <Text className="mb-2 text-gray-700 text-sm">
                {getNotificationText()}
              </Text>
            </View>

            <TouchableOpacity className="ml-2 p-1" onPress={handleDelete}>
              <Feather name="trash" size={16} color="#E0245E" />
            </TouchableOpacity>
          </View>

          {notification.post && (
            <View className="bg-gray-50 mb-2 p-3 rounded-lg">
              <Text className="mb-1 text-gray-700 text-sm" numberOfLines={3}>
                {notification.post.content}
              </Text>

              {notification.post.image && (
                <Image
                  source={{ uri: notification.post.image }}
                  className="mt-2 rounded-lg w-full h-32"
                  resizeMode="cover"
                />
              )}
            </View>
          )}

          {notification.comment && (
            <View className="bg-blue-50 mb-2 p-3 rounded-lg">
              <Text className="mb-1 text-gray-600 text-xs">Comment:</Text>

              <Text className="text-gray-700 text-sm" numberOfLines={2}>
                &ldquo;{notification.comment.content}&rdquo;
              </Text>
            </View>
          )}

          <Text className="text-gray-400 text-xs">
            {formatDate(notification.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default NotificationCard;
