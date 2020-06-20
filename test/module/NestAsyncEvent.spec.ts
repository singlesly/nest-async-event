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

        const moduleFixture = await Test.createTestingModule({
            imports: [
                await NestAsyncEventModule.register(new EventEmitter())
            ],
            providers: [
                TestTwoListener,
                TestListener,
            ]
        }).compile();

        await moduleFixture.init();

        const ee = moduleFixture.get(EVENT_EMITTER_INTERFACE);

        await ee.emit({name: "test"});

        done();
    });
});
