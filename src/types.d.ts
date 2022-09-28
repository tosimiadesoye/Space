import type * as THREE from "three";

// declare module '*';

declare global {
  interface Window {
    THREE: typeof THREE;
  }
}
