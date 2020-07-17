/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class NestAsyncEventModule
 */
import { DynamicModule, Module, OnModuleInit } from "@nestjs/common";
import { EventEmitter } from "./EventEmitter";
import { DiscoveryModule, DiscoveryService } from "@nestjs-plus/discovery";
import { EventEmitterInterface } from "./EventEmitterInterface";
import { EVENT_EMITTER_INTERFACE, LISTENER } from "./constant/constant";
import { InjectEventEmitter } from "./decorator/InjectEventEmitter";
import { ModuleRef } from "@nestjs/core";
import { ListenerInterface } from "./ListenerInterface";

@Module({
    imports: [
        DiscoveryModule
    ],
    providers: [
        {
            provide: EVENT_EMITTER_INTERFACE,
            useClass: EventEmitter,
        },
    ],
    exports: [
        {
            provide: EVENT_EMITTER_INTERFACE,
            useClass: EventEmitter,
        }
    ],
})
export class NestAsyncEventModule implements OnModuleInit {

    constructor(
        private readonly discoveryService: DiscoveryService,
        @InjectEventEmitter() private readonly eventEmitter: EventEmitterInterface,
        private readonly moduleRef: ModuleRef
    ) {}

    public async onModuleInit(): Promise<void> {
        const discoveredListeners = await this.discoveryService.providersWithMetaAtKey(LISTENER);
        discoveredListeners.forEach(listener => this.eventEmitter.addListener(listener.discoveredClass.instance as ListenerInterface));
    }


    public static forRoot(eventEmitter: EventEmitterInterface = new EventEmitter()): DynamicModule {
        return {
            ...NestAsyncEventModule.register(new EventEmitter()),
            global: true,
        };
    }

    public static register(eventEmitter: EventEmitterInterface = new EventEmitter()): DynamicModule {
        return {
            providers: [
                {
                    provide: EVENT_EMITTER_INTERFACE,
                    useValue: eventEmitter,
                },
            ],
            exports: [
                {
                    provide: EVENT_EMITTER_INTERFACE,
                    useValue: eventEmitter
                }
            ],
            module: NestAsyncEventModule,
        }
    }
}
