import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const OAuthSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setName, setUserId, setProfileImage } = useContext(UserContext) as {
    setName: (name: string) => void;
    setUserId: (id: number) => void;
    setProfileImage: (image: string | null) => void;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jwt = params.get("jwt");
    const email = params.get("email");
    const userId = params.get("user_id");

    if (jwt && email && userId) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("userId", userId);

      const formattedName = email.split("@")[0].toUpperCase();
      setName(formattedName);
      setUserId(Number(userId));
      // If you get profileImage from URL or elsewhere, set it here, otherwise:
      setProfileImage(null);

      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location, navigate, setName, setUserId, setProfileImage]);

  return <div>Logging you in...</div>;
};
