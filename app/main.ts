import * as dgram from "dgram";
import {Header} from "./types/header.ts";
import {Response} from "./types/response.ts";
import {LabelSequence} from "./types/labelSequence.ts";
import {Answer} from "./types/answer.ts";
import {Ip} from "./types/ip.ts";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");


const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        let header: Header = new Header(1234n, 1n, 0n, false, false, false, false, 0n, 0n, 1n, 1n, 0n, 0n);
        let question = new LabelSequence(["codecrafters", "io"]);
        let ip = Ip.from([8n,8n,8n,8n]);
        let answer: Answer = new Answer(question, 1n, 1n, 60n, 0n, ip);
        let response_struct = new Response(header, [question], 1n, 1n, [answer]);
        const response = response_struct.serialize();
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
