/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class HashMap
 */
export class HashMap<V> {
  private readonly map: Record<string, V[]> = {};

  public add(key: string, value: V): void {
    if(!Array.isArray(this.map[key])) {
      this.map[key] = [];
    }
    const exists = this.map[key].find(item => item === value);
    if(exists) {
      return;
    }
    this.map[key].push(value);
  }

  public get(key: string): V[] {
    return this.map[key] || [];
  }

  public remove(value: V): void {
    for(const key in this.map) {
      if(!this.map.hasOwnProperty(key)) {
        continue;
      }
      this.map[key] = this.map[key].filter(item => item !== value);
    }
  }
}
