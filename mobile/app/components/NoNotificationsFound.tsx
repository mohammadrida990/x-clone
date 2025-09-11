import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

const NoNotificationsFound = () => {
  return (
    <View
      className="flex-1 justify-center items-center px-8"
      style={{ minHeight: 400 }}
    >
      <View className="items-center">
        <Feather name="bell" size={80} color="#E1E8ED" />

        <Text className="mt-6 mb-3 font-semibold text-gray-500 text-2xl">
          No notifications yet
        </Text>

        <Text className="max-w-xs text-gray-400 text-base text-center leading-6">
          When people like, comment, or follow you, you&apos;ll see it here.
        </Text>
      </View>
    </View>
  );
};
export default NoNotificationsFound;
