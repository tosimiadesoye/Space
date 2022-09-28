import {
  PerspectiveCamera,
  WebGL1Renderer,
  Renderer,
  Camera,
  Scene,
  FogExp2,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export const scene: any | Scene = new Scene();

export class Game {
  camera?: any | Camera;
  renderer?: Renderer;
  stats?: Stats;

  pointerX = 0;
  pointerY = 0;

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  constructor(readonly container: HTMLElement) {
    this.camera = this.camera;
    this.renderer = this.renderer;

    this.initialise();
  }
  initialise = async () => {
    this.camera = new PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      2,
      2000
    );
    this.camera.position.z = 1000;

    scene.fog = new FogExp2(0x000000, 0.001);

    this.renderer = new WebGL1Renderer();
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    document.body.style.touchAction = "none";
    document.body.addEventListener("pointermove", this.onPointerMove);

    //
    window.addEventListener("resize", this.onWindowResize);
  };

  onWindowResize = async () => {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  };
  onPointerMove = async (event: PointerEvent) => {
    if (event.isPrimary === false) return;

    this.pointerX = event.clientX - this.windowHalfX;
    this.pointerY = event.clientY - this.windowHalfY;
  };

  //

  animate = async () => {
    window.requestAnimationFrame(this.animate.bind(this));

    this.render();
    this.stats?.update();
  };

  render = async () => {
    const time = Date.now() * 0.00005;

    this.camera.position.x += (this.pointerX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.pointerY - this.camera.position.y) * 0.05;

    this.camera.lookAt(scene.position);

    const h = ((360 * (1.0 + time)) % 360) / 360;
    // this.material?.color.setHSL(h, 0.5, 0.5);

    this.renderer?.render(scene, this.camera);
  };
}
