import type {DnsRequest} from "../types/request.ts";
import {Response} from "../types/response.ts";
import {Header} from "../types/header.ts";
import {LabelSequence} from "../types/labelSequence.ts";
import {Ip} from "../types/ip.ts";
import {Answer} from "../types/answer.ts";

export function handle(request: DnsRequest): Response{
        let opcode = request.header.operationCode == 0n ? 0n: 4n;

        let ip = Ip.from([8n,8n,8n,8n]);
        let answers = request.questions.map(x => new Answer(x, 1n, 1n, 60n, 0n, ip))

    let header: Header = new Header(request.header.packetIdentifier, 1n, request.header.operationCode, request.header.authoritativeAnswer, false, request.header.recursionDesired, false, 0n, opcode, request.header.questionCount, BigInt(answers.length), 0n, 0n);
        let response_struct = new Response(header, request.questions, 1n, 1n, answers);

        return response_struct


}