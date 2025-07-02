import {QSTASH_URL,QSTASH_TOKEN,} from "../config/env.js";
import {Client as WorkflowClient} from "@upstash/workflow";
export const upstashClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
})