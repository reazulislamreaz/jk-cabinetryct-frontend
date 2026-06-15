import { useLogoutMutation } from "@/store/api/authApi";
import { baseApi } from "@/store/api/baseApi";
import { useAppDispatch } from "@/store/hooks";
import { clearAuthTokens, getRefreshToken } from "@/utils/auth.utils";
import { disconnectSocket } from "@/utils/socket";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    const refreshToken = getRefreshToken();

    try {
      if (refreshToken) {
        await logoutMutation({ refreshToken }).unwrap();
      }
    } catch {
      // Continue local logout even if the API call fails
    }

    disconnectSocket();
    clearAuthTokens();
    dispatch(baseApi.util.resetApiState());
    window.location.href = "/auth/login";
  };

  return { logout };
};

export default useLogout;
