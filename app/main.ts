import * as dgram from "dgram";
import {Header} from "./types/header.ts";
import {Response} from "./types/response.ts";
import {LabelSequence} from "./types/labelSequence.ts";
import {Answer} from "./types/answer.ts";
import {Ip} from "./types/ip.ts";
import {DnsRequest} from "./types/request.ts";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");


const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}: ${data.toString('hex')}`);
                let request = DnsRequest.from(data);
                console.log(`parsed request: ${JSON.stringify(request, (_, v) => typeof v === 'bigint' ? v.toString() : v)}`)


        let opcode = request.header.operationCode == 0n ? 0n: 4n;
        let header: Header = new Header(request.header.packetIdentifier, 1n, request.header.operationCode, request.header.authoritativeAnswer, false, request.header.recursionDesired, false, 0n, opcode, 1n, 1n, 0n, 0n);

        let question = new LabelSequence(["codecrafters", "io"]);
        let ip = Ip.from([8n,8n,8n,8n]);
        let answer: Answer = new Answer(question, 1n, 1n, 60n, 0n, ip);
        let response_struct = new Response(header, [question], 1n, 1n, [answer]);
        const response = response_struct.serialize();
        console.log(`Responding with ${response.toString('hex')}`)
        let reparsed = DnsRequest.from(response_struct.serialize());
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
