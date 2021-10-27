import * as PIXI from 'pixi.js'

export interface animationOpt {
  animation: boolean
  during?: number
}

export default interface IWrapper {
  /** Coordinate */
  readonly x: number
  readonly y: number

  /** Size */
  readonly width: number
  readonly height: number

  setPosition(animationOpt: animationOpt, x: number, y: number): void

  setSize(animation: boolean, width: number, height: number): void

  /** Add Container to this Wrapper */
  addChild(child: IWrapper): void

  /** Add Container to this Wrapper */
  addContainer(child: any): void

  /** Get Pixi container */
  getContainer(): PIXI.Container

  setScale(animation: boolean, scale_x: number, scale_y: number): void

  setInteractive(interactive: boolean): void

  setRotation(animation: boolean, rotation: number): void

  setAlpha(animation: boolean, alpha: number): void

  removeChildren(): void

  on(event: string, listener: any): void

  onClick(listener: any): void

  onHover(listener: any): void
}
