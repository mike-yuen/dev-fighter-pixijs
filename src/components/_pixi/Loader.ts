import * as PIXI from 'pixi.js'

/**
 * Loader will automatically load all the srcs of the configuration file
 */
class Loader {
  private onChange: Function = () => {}
  
  public load(srcs: any) {
    let on = (onChange: Function): Promise<any> => {
      this.onChange = onChange
      return then()
    }

    let then = (): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          let res = []
          let totalResource = Object.keys(srcs).length
          let loadedResource = 0
          for (let i in srcs) {
            res.push(await this.loaderAdd(srcs[i]))
            loadedResource++
            this.onChange(loadedResource / totalResource)
          }
          resolve(res)
        } catch (err) {
          reject(err)
        }
      })
    }
    return {
      then: then,
      on: on,
    }
  }

  private loaderAdd(path: string) {
    return new Promise((resolve, reject) => {
      PIXI.Loader.shared.add(path).load(resolve).onError.add(reject)
    })
  }
}

export default new Loader()
