/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class NestAsyncEvent
 */
import { NestAsyncEventModuleOptions } from "./NestAsyncEventModuleOptions";
import { DynamicModule, Module } from "@nestjs/common";
import { EventEmitter } from "./EventEmitter";

@Module({})
export class NestAsyncEvent {
    public static async register(options?: NestAsyncEventModuleOptions): Promise<DynamicModule> {
        if(!options) {
            options.listeners = [];
        }

        const ee = new EventEmitter(options.listeners);

        return {
            global: true,
            providers: [
                {
                    provide: EventEmitter,
                    useValue: ee,
                },
            ],
            exports: [
                {
                    provide: EventEmitter,
                    useValue: ee
                }
            ],
            module: NestAsyncEvent,
        }
    }
}
