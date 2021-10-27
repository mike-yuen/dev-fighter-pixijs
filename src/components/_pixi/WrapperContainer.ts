import * as PIXI from 'pixi.js'
import IWrapper from '@/components/_pixi/IWrapper'
import * as WrapperType from '@/components/_pixi/IWrapper'
import gsap from 'gsap'

/** My encapsulation use Container. Don't call native addChild directly. */
export default class WrapperContainer implements IWrapper {
  protected _container: PIXI.Container

  constructor(obj?: IWrapper) {
    this._container = new PIXI.Container()
    obj ? this.addChild(obj) : null
  }

  public setPosition(
    animationOpt: WrapperType.animationOpt,
    x: number,
    y: number
  ) {
    if (animationOpt.animation) {
      gsap.to(this._container, {
        duration: animationOpt.during ? animationOpt.during : 0.6,
        x: x,
        y: y,
      })
    } else {
      this._container.x = x
      this._container.y = y
    }
  }

  public setSize(animation: boolean, width: number, height: number) {
    if (animation) {
      gsap.to(this._container, { duration: 0.6, width: width, height: height })
    } else {
      this._container.width = width
      this._container.height = height
    }
  }

  public addChild(child: IWrapper): IWrapper {
    this._container.addChild(child.getContainer())
    return this
  }

  public addContainer(obj: any): IWrapper {
    this._container.addChild(obj)
    return this
  }

  public getContainer(): PIXI.Container {
    return this._container
  }

  public setScale(animation: boolean, scale_x: number, scale_y: number) {
    if (animation) {
      gsap.to(this._container.scale, { duration: 0.6, x: scale_x, y: scale_y })
    } else {
      this._container.scale.x = scale_x
      this._container.scale.y = scale_y
    }
  }

  public setInteractive(interactive: boolean): void {
    this._container.interactive = interactive
  }

  public setRotation(animation: boolean, rotation: number): void {
    if (animation) {
      gsap.to(this._container, { duration: 0.6, rotation: rotation })
    } else {
      this._container.rotation = rotation
    }
  }

  public setAlpha(animation: boolean, alpha: number) {
    if (animation) {
      gsap.to(this._container, {
        duration: 0.6,
        alpha: alpha,
      })
    } else {
      this._container.alpha = alpha
    }
  }

  public removeChildren(): void {
    this._container.removeChildren()
  }

  public on(event: string, listener: any) {
    this._container.on(event, listener)
  }

  public onClick(listener: any) {
    this._container.on('click', listener)
    this._container.on('tap', listener)
  }

  public onHover(listener: any) {
    this._container.on('mouseover', listener)
    this._container.on('pointerover', listener)
  }

  get x(): number {
    return this._container.x
  }

  set x(num: number) {
    this._container.x = num
  }

  get y(): number {
    return this._container.y
  }

  set y(num: number) {
    this._container.y = num
  }

  get width(): number {
    return this._container.width
  }

  set width(num: number) {
    this._container.width = num
  }

  get height(): number {
    return this._container.height
  }

  set height(num: number) {
    this._container.height = num
  }
}
