import  {camera } from "../game";
import { AudioListener, AudioLoader } from "three";
import larry from '../assets/sounds/larry.mp3'
export const audio = () =>{
const listener: any | AudioListener = new AudioListener();
camera.add(listener)

let sound: any = new Audio(listener)

const audioLoader = new AudioLoader()
audioLoader.load(larry, (buffer) => {
sound.setBuffer(buffer)    
sound.setLoop(true)
sound.setVolume(0.5)
sound.play()
})

}