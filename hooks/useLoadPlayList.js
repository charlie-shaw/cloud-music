import {usePlayerStore} from '../store/player.js'
export default function useLoadPlayList(songList){
	const playStore = usePlayerStore()
	const playList =  Array.isArray(songList) ? songList : [];
	playStore.playSongList = playList

	
}