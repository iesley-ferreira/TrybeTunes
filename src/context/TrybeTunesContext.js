import React, { createContext, useContext, useState } from "react";

const TrybeTunesContext = createContext();

export const TrybeTunesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [albunsList, setAlbunsList] = useState();
  const [topArtists, setTopArtists] = useState([]);
  const [artist, setArtist] = useState([]);

  return (
    <TrybeTunesContext.Provider
      value={{
        loading,
        setLoading,
        albunsList,
        setAlbunsList,
        topArtists,
        setTopArtists,
        artist,
        setArtist,
      }}
    >
      {children}
    </TrybeTunesContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(TrybeTunesContext);
  return [context.loading, context.setLoading];
};

export const useAlbunsList = () => {
  const context = useContext(TrybeTunesContext);
  return [context.albunsList, context.setAlbunsList];
};

export const useTopArtists = () => {
  const context = useContext(TrybeTunesContext);
  return [context.topArtists, context.setTopArtists];
};

export const useArtist = () => {
  const context = useContext(TrybeTunesContext);
  return [context.artist, context.setArtist];
};
