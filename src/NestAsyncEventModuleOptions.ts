/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @interface NestAsyncEventModuleOptions
 */
import { ListenerInterface } from "./ListenerInterface";

export interface NestAsyncEventModuleOptions {
    listeners?: ListenerInterface[];
}
