import { Injectable, OnModuleDestroy } from "@nestjs/common"
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService
    extends ServerKafka
    implements OnModuleDestroy {

    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['valued-urchin-6152-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'dmFsdWVkLXVyY2hpbi02MTUyJONcc7zrAExT5pzGlQgHWIg3WIfX5F3FksghZcA',
                    password: '7ea3c0d1ac9f41e0856a5849577cba92',
                },
                ssl: true,
            }
        })
    }

    async onModuleDestroy() {
        await this.close()
    }
}