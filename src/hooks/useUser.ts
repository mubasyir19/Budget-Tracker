import { logoutService, profileService } from "@/services/user";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const data = await profileService();
      setUser(data.data);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const logout = await logoutService();
      console.log("isi logout hooks = ", logout);
      if (logout.code === "SUCCESS") {
        router.push("/login");
        return logout;
      }
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { user, error, isLoading, handleLogout };
}
