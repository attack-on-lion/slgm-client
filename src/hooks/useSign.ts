import { useSignStore } from "@/stores/sign";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/services/api/user";

export default function useSign() {
  const { user, setUser } = useSignStore();

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getUserProfile(user?.user_id || 1),
    enabled: !!user?.user_id, // user_id가 있을 때만 쿼리 실행
    retry: false, // 실패 시 재시도하지 않음
  });

  const isAuthenticated = !!user?.user_id;
  const userId = user?.user_id;

  return { 
    user, 
    setUser, 
    userData, 
    isLoading, 
    error,
    isAuthenticated,
    userId 
  };
};	