import { useEffect, useRef } from "react";
import useSWR from "swr";
import fetcher from "./fetcher";
import { User } from "../components/types/types";

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);
  return {
    user: data as User,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", fetcher);
  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
