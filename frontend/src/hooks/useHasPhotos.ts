import type { Album } from "../types/types";
import { useFetchPhotosQuery } from "../store";
import { skipToken } from "@reduxjs/toolkit/query";
export function useHasPhotos(album: Album, shouldRunQuery: boolean) {
  const initialCount = album._count.photos;

  const { data, isSuccess } = useFetchPhotosQuery(shouldRunQuery ? album : skipToken);
  console.log("hasPhotos", data?.length, "initialcount", initialCount, shouldRunQuery, isSuccess);
  

  return isSuccess ? !!data?.length : initialCount > 0;
}
