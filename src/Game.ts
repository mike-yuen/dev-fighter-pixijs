import * as PIXI from 'pixi.js'
import IWrapper from '@/components/_pixi/IWrapper'
import Loader from '@/components/_pixi/Loader'
import WrapperContainer from '@/components/_pixi/WrapperContainer'
import Loading from '@/components/Loading'
import imagePath from '@/config/imagePath'
import loadingPath from '@/config/loadingPath'
import sceneSize from '@/config/sceneSize'

export default class Game {
  private _app: PIXI.Application
  private _game: IWrapper
  private _loading: IWrapper

  constructor() {
    this._app = new PIXI.Application({
      width: sceneSize.width,
      height: sceneSize.height,
      resolution: window.devicePixelRatio || 1,
    })
    this._game = new WrapperContainer()
    this._loading = new WrapperContainer()
    this._game.addChild(this._loading)
    this._app.stage.addChild(this._game.getContainer())
    document.body.appendChild(this._app.view)

    // Load first page assets (bg, logo)
    this.loadImages(loadingPath)
      .then(() => {
        // Load all image assets
        return this.loadImages(imagePath, 1000)
      })
      .then(() => {
        this.setup()
      })
  }

  private loadImages(imagePath: any, delay?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let loading = new Loading()
        this._loading.addChild(loading)
        Loader.load(imagePath)
          .on((e: number) => {
            loading.update(e * 100)
          })
          .then(() => {
            return delay ? loading.done(delay) : null
          })
          .then(() => {
            resolve(null)
          })
      } catch (err) {
        reject(err)
      }
    })
  }

  private setup(): void {}
}
