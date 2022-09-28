import { SphereGeometry, TextureLoader, MeshBasicMaterial, Mesh } from "three";

export default class Planet {
  radius: number;
  positionX: number;
  textureFile: string;
  mesh?: Mesh;
  constructor(radius: number, positionX: number, textureFile: string) {
    this.radius = radius;
    this.positionX = positionX;
    this.textureFile = textureFile;
  }

  getMesh() {
    if (this.mesh === undefined || this.mesh === null) {
      const geometry = new SphereGeometry(this.radius);
      const texture = new TextureLoader().load(this.textureFile);
      const material = new MeshBasicMaterial({ map: texture });
      this.mesh = new Mesh(geometry, material);
      this.mesh.position.x += this.positionX;
    }
    return this.mesh;
  }
}
