/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @function Listener
 */
import { LISTENER } from "../constant/constant";

export function Listener(name: string): ClassDecorator {
    return function (target) {
        Reflect.defineMetadata(target, LISTENER, name);
    }
}
