import { useSignOut } from "@/hooks/useSignout";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const SignOutButton = () => {
  const { handleSignOut } = useSignOut();

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Feather name="log-out" size={24} color="#1DA1F2" />
    </TouchableOpacity>
  );
};

export default SignOutButton;
