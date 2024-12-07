// src/types/vimeo__player.d.ts (or a similar path in your project)
declare module "@vimeo/player" {
    class Player {
      constructor(element: HTMLElement, options: object);
      play(): Promise<void>;
      pause(): Promise<void>;
      setVolume(volume: number): void;
      getVolume(): Promise<number>;
      setPlaybackRate(rate: number): void;
      requestFullscreen(): Promise<void>;
      on(event: string, handler: Function): void;
    }
    export default Player;
  }
  