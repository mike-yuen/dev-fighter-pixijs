import * as PIXI from 'pixi.js'
import IWrapper from '@/components/_pixi/IWrapper'
import Texture from '@/components/_pixi/Texture'
import WrapperContainerCenter from '@/components/_pixi/WrapperContainerCenter'
import loadingPath from '@/config/loadingPath'
import sceneSize from '@/config/sceneSize'

export default class Loading extends WrapperContainerCenter {
  private _loadingText: IWrapper
  private _loadLogo: IWrapper
  private _loadBg: IWrapper
  private _status: boolean = false

  constructor() {
    super()
    let rect = new PIXI.Graphics()
    rect.beginFill(0xff0000)
    rect.drawRect(0, 0, sceneSize.width, sceneSize.height)
    rect.endFill()
    rect.alpha = 0
    this._centerContainer.addContainer(rect)

    this._loadingText = new WrapperContainerCenter()
    this._loadLogo = new WrapperContainerCenter()
    this._loadBg = new WrapperContainerCenter()

    this._centerContainer.addChild(this._loadBg)
    this._loadBg.addChild(new Texture(loadingPath.bg))
    this._loadBg.setSize(false, sceneSize.width, sceneSize.height)
    this._loadBg.setAlpha(false, 0)
    this._loadBg.setAlpha(true, 1)
    this._loadBg.setPosition({ animation: false }, 0, 0)

    this._centerContainer.addChild(this._loadLogo)
    this._loadLogo.addChild(new Texture(loadingPath.logo))
    this._loadLogo.setAlpha(false, 0)
    this._loadLogo.setAlpha(true, 1)
    this._loadLogo.setPosition(
      { animation: false },
      sceneSize.width / 2 - this._loadLogo.width / 2,
      sceneSize.height / 2 - this._loadLogo.width / 2
    )

    this._centerContainer.addChild(this._loadingText)
    this._loadingText.addChild(new Texture(loadingPath.text))
    this._loadingText.setAlpha(false, 0)
    this._loadingText.setAlpha(true, 1)
    this._loadingText.setPosition(
      { animation: false },
      sceneSize.width / 2 - this._loadingText.width / 2,
      sceneSize.height / 2 - this._loadingText.height / 2 + 100
    )

    // this.animation()
  }

  public done(delay?: number) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          this._status = true
          this._loadingText.removeChildren()
          this._loadingText.addChild(new Texture(loadingPath.startgame))
          this._loadingText.setAlpha(false, 0)
          this._loadingText.setAlpha(true, 1)
          this._loadingText.setPosition(
            { animation: false },
            sceneSize.width / 2 - this._loadingText.width / 2,
            sceneSize.height / 2 - this._loadingText.height / 2 + 100
          )
          setTimeout(() => {
            resolve(null)
          }, 0)
        },
        delay ? delay : 0
      )
    })
  }

  public update(process: number) {
    this._loadingText.removeChildren()
    this._loadingText.addChild(new Texture(loadingPath.text))
    this._loadingText.setPosition(
      { animation: false },
      sceneSize.width / 2 - this._loadingText.width / 2,
      sceneSize.height / 2 - this._loadingText.height / 2 + 100
    )
  }

  private animation() {
    let _reverse = false
    let timeout = setInterval(() => {
      _reverse
        ? this._loadLogo.setPosition(
            { animation: true, during: 1 },
            this._loadLogo.x,
            this._loadLogo.y - 50
          )
        : this._loadLogo.setPosition(
            { animation: true, during: 1 },
            this._loadLogo.x,
            this._loadLogo.y + 50
          )
      _reverse = !_reverse
      if (this._status) {
        clearInterval(timeout)
      }
    }, 700)
  }
}
