import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { BASE_URL } from "../components/BaseURL";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${BASE_URL}/api/user/login`,
        { email, password }
      );

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return { login, isLoading, error };
};