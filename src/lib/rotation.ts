import { BoxGeometry, MeshNormalMaterial, Mesh } from "three";

export default class Rotation {
  planetPositionX: any;
  showRotation: boolean;
  mesh?: Mesh;
  constructor(planetMesh: Mesh, showRotation = false) {
    this.planetPositionX = planetMesh.position.x;
    this.showRotation = showRotation;
  }

  getMesh() {
    if (this.mesh === undefined || this.mesh === null) {
      const geometry = new BoxGeometry(this.planetPositionX, 0.25, 0.25);
      const material = new MeshNormalMaterial();
      this.mesh = new Mesh(geometry, material);
      this.mesh.position.x += this.planetPositionX / 2;
      this.mesh.visible = this.showRotation;
    }
    return this.mesh;
  }
}
