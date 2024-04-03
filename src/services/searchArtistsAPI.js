const searchArtistsAPI = async () => {
  const artistNames = [
    "YG Marley",
    "Jack Johnson",
    "Cardi B",
    "bob sinclar",
    "David Guetta",
    "Snoop Dogg",
    "akon",
    "Dr. Dre",
    "Eminem",
    "Drake",
    "Jorja Smith",
    "John Mayer",
    "Linkin Park",
    "Katy Perry",
    "Bob marley",
    "Kendrick Lamar",
    "Playboi Carti",
    "Elton John",
    "Mac Miller",
    "Travis Scott",
    "Luke Combs",
    "Jimmy Cliff",
    "Noah Kahan",
    "Billie Eilish",
  ];
  const artistNamesURL = artistNames.map((artist) =>
    encodeURI(artist).replaceAll("%20", "+")
  );

  const albumPromises = artistNamesURL.map(async (artistURL) => {
    const getAlbumsApiURL = `https://itunes.apple.com/search?entity=album&term=${artistURL}&attribute=allArtistTerm`;
    const APIResponse = await fetch(getAlbumsApiURL);
    const { results } = await APIResponse.json();
    const response = results.map(
      ({
        artistId,
        artistName,
        collectionId,
        collectionName,
        collectionPrice,
        artworkUrl100,
        releaseDate,
        trackCount,
      }) => ({
        artistId,
        artistName,
        collectionId,
        collectionName,
        collectionPrice,
        artworkUrl100,
        releaseDate,
        trackCount,
      })
    );
    return response[0];
  });

  const albums = await Promise.all(albumPromises);

  return albums;
};

export default searchArtistsAPI;
