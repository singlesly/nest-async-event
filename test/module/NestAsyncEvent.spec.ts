/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 */
import { Test } from "@nestjs/testing";
import { NestAsyncEventModule } from "../../src/NestAsyncEventModule";
import { ListenerInterface } from "../../src/ListenerInterface";
import { Listener } from "../../src/decorator/Listener";
import { EventInterface } from "../../src/EventInterface";
import { EVENT_EMITTER_INTERFACE } from "../../src/constant/constant";
import { EventEmitter } from "../../src/EventEmitter";
import { Module } from "@nestjs/common";
import { EventEmitterInterface, InjectEventEmitter } from "../../src";

describe("NestAsyncEvent test", () => {
    it("test", async (done) => {

        @Listener("test")
        class TestListener implements ListenerInterface {
            public async listen(event: EventInterface): Promise<void> {
                expect(event.name).toBe("test");
            }

        }

        @Listener("test")
        class TestTwoListener implements ListenerInterface {
            public async listen(event: EventInterface): Promise<void> {
                expect(event.name).toBe("test");
            }
        }

        @Listener('test', 'same')
        class TestArrayEvents implements ListenerInterface {
            public count = 0;
            public async listen(event: EventInterface): Promise<void> {
                this.count++;
            }
        }

        const moduleFixture = await Test.createTestingModule({
            imports: [
                await NestAsyncEventModule.register(new EventEmitter())
            ],
            providers: [
                TestTwoListener,
                TestListener,
                TestArrayEvents
            ]
        }).compile();

        await moduleFixture.init();

        const ee = moduleFixture.get(EVENT_EMITTER_INTERFACE);

        await ee.emit({name: "test", same: "fuck you"});
        await ee.emit({name: "same", same: "rich"});

        expect(moduleFixture.get(TestArrayEvents).count).toBe(2);
        done();
    });

    it("should be call with child modules", async (done) => {

        class Provider {
            constructor(
                @InjectEventEmitter() private readonly ee: EventEmitterInterface
            ) {}
        }

        @Module({
            providers: [
                Provider
            ]
        })
        class Child {}

        @Listener('test.event')
        class RL implements ListenerInterface {
            public async listen(event: EventInterface): Promise<void> {
                expect(event.name).toBe('test.event');
            }

        }

        const fixture = (await Test.createTestingModule({
            imports: [
                NestAsyncEventModule.forRoot(),
                Child
            ],
        }).compile());

        await fixture.init();

        const ee: EventEmitterInterface = fixture.get(EVENT_EMITTER_INTERFACE);

        await ee.emit({name: 'test.event'});
        done();

    });
});
