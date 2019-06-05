import { Service } from 'typedi'

@Service()
export abstract class JSONUtils {
  public commonUserProperties = [
    'blog',
    'createdAt',
    'id',
    'email',
    'nickname',
    'filePath',
    'fileName',
    'token',
  ]

  /**
   * This function filters keys supplied in parameter from JSON object
   * @param data - Data to clean
   * @param toAdd - Keys to be added
   * @returns Filtered object
   */
  public filterDataFromObject(data: any, toAdd: string[]): any {
    return Object.assign(
      {},
      ...toAdd.map(k => (k in data ? { [k]: data[k] } : {}))
    )
  }
  /**
   * This function filters keys supplied in parameter for JSON objects
   * @param dataSet - Dataset to be cleaned
   * @param toAdd - Keys to be added
   * @returns Filtered objects
   */
  public filterDataFromObjects(dataSet: any[], toAdd: string[]): any[] {
    const filteredData = []
    dataSet.forEach(data => {
      filteredData.push(this.filterDataFromObject(data, toAdd))
    })
    return filteredData
  }
}
