import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "../components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";

const HomeScreen = () => {
  useUserSync();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-gray-100 border-b">
        <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />

        <Text className="font-bold text-gray-900 text-xl">Home</Text>

        <SignOutButton />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
