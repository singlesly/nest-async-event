/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @function Listener
 */
import { LISTENER } from "../constant/constant";
import "reflect-metadata";

export function Listener(name: string): ClassDecorator {
    return function (target) {
        Reflect.defineMetadata(LISTENER, name, target.prototype);
        Reflect.defineMetadata(LISTENER, name, target);
    }
}
