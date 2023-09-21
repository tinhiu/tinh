import UserObjectPublic = SpotifyApi.UserObjectPublic;


export interface UserSpotify extends UserObjectPublic {
    following: number;
    playlists: number;
}