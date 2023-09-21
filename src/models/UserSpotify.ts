import UserObjectPublic = SpotifyApi.UserObjectPublic;


export default interface UserSpotify extends UserObjectPublic {
    following: number;
    playlists: number;
}