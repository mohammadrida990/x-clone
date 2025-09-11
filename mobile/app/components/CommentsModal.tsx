import { useComments } from "@/hooks/useComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Post } from "@/types";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

interface CommentsModalProps {
  selectedPost: Post;
  onClose: () => void;
}

const CommentsModal = ({ selectedPost, onClose }: CommentsModalProps) => {
  const { commentText, setCommentText, createComment, isCreatingComment } =
    useComments();
  const { currentUser } = useCurrentUser();

  const handleClose = () => {
    onClose();
    setCommentText("");
  };

  return (
    <Modal
      visible={!!selectedPost}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {/* MODAL HEADER */}
      <View className="flex-row justify-between items-center px-4 py-3 border-gray-100 border-b">
        <TouchableOpacity onPress={handleClose}>
          <Text className="text-blue-500 text-lg">Close</Text>
        </TouchableOpacity>

        <Text className="font-semibold text-lg">Comments</Text>

        <View className="w-12" />
      </View>

      {selectedPost && (
        <ScrollView className="flex-1">
          {/* ORIGINAL POST */}
          <View className="bg-white p-4 border-gray-100 border-b">
            <View className="flex-row">
              <Image
                source={{ uri: selectedPost.user.profilePicture }}
                className="mr-3 rounded-full size-12"
              />

              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="mr-1 font-bold text-gray-900">
                    {selectedPost.user.firstName} {selectedPost.user.lastName}
                  </Text>

                  <Text className="ml-1 text-gray-500">
                    @{selectedPost.user.username}
                  </Text>
                </View>

                {selectedPost.content && (
                  <Text className="mb-3 text-gray-900 text-base leading-5">
                    {selectedPost.content}
                  </Text>
                )}

                {selectedPost.image && (
                  <Image
                    source={{ uri: selectedPost.image }}
                    className="mb-3 rounded-2xl w-full h-48"
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          </View>

          {/* COMMENTS LIST */}
          {selectedPost.comments.map((comment) => (
            <View
              key={comment._id}
              className="bg-white p-4 border-gray-100 border-b"
            >
              <View className="flex-row">
                <Image
                  source={{ uri: comment.user.profilePicture }}
                  className="mr-3 rounded-full w-10 h-10"
                />

                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="mr-1 font-bold text-gray-900">
                      {comment.user.firstName} {comment.user.lastName}
                    </Text>

                    <Text className="ml-1 text-gray-500 text-sm">
                      @{comment.user.username}
                    </Text>
                  </View>

                  <Text className="mb-2 text-gray-900 text-base leading-5">
                    {comment.content}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* ADD COMMENT INPUT */}

          <View className="p-4 border-gray-100 border-t">
            <View className="flex-row">
              <Image
                source={{ uri: currentUser?.profilePicture }}
                className="mr-3 rounded-full size-10"
              />

              <View className="flex-1">
                <TextInput
                  className="mb-3 p-3 border border-gray-200 rounded-lg text-base"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />

                <TouchableOpacity
                  className={`px-4 py-2 rounded-lg self-start ${
                    commentText.trim() ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onPress={() => createComment(selectedPost._id)}
                  disabled={isCreatingComment || !commentText.trim()}
                >
                  {isCreatingComment ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <Text
                      className={`font-semibold ${
                        commentText.trim() ? "text-white" : "text-gray-500"
                      }`}
                    >
                      Reply
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Modal>
  );
};

export default CommentsModal;
