import { Ionicons } from "@expo/vector-icons";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "../components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";
import { useState } from "react";
import PostComposer from "../components/PostComposer";
import { usePosts } from "@/hooks/usePosts";
import PostsList from "../components/PostsList";

const HomeScreen = () => {
  useUserSync();

  const [isRefetching, setIsRefetching] = useState(false);
  const { refetch: refetchPosts } = usePosts();

  const handlePullToRefresh = async () => {
    setIsRefetching(true);

    await refetchPosts();
    setIsRefetching(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-gray-100 border-b">
        <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />

        <Text className="font-bold text-gray-900 text-xl">Home</Text>

        <SignOutButton />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handlePullToRefresh}
            tintColor={"#1DA1F2"}
          />
        }
      >
        <PostComposer />

        <PostsList />
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
