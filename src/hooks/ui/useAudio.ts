// Howler.js 기반 오디오 훅

import { Howl } from "howler";

const sounds = {
  forest: new Howl({ src: ["/assets/sounds/forest-ambient.mp3"], loop: true }),
  shuffle: new Howl({ src: ["/assets/sounds/shuffle.mp3"] }),
  cardflip: new Howl({ src: ["/assets/sounds/cardflip.mp3"] }),
  magic: new Howl({ src: ["/assets/sounds/magic.mp3"] }),
};

export function useAudio() {
  const play = (key: keyof typeof sounds) => sounds[key].play();
  const stop = (key: keyof typeof sounds) => sounds[key].stop();
  const fadeIn = (key: keyof typeof sounds) => sounds[key].fade(0, 1, 1500);
  return { play, stop, fadeIn };
}
