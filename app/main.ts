import * as dgram from "dgram";
import {Header} from "./types/header.ts";
import {Response} from "./types/response.ts";
import {LabelSequence} from "./types/labelSequence.ts";
import {Answer} from "./types/answer.ts";
import {Ip} from "./types/ip.ts";
import {DnsRequest} from "./types/request.ts";
import {handle} from "./handling/handler.ts";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");


const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}: ${data.toString('hex')}`);
                let request = DnsRequest.from(data);
                console.log(`parsed request: ${JSON.stringify(request, (_, v) => typeof v === 'bigint' ? v.toString() : v)}`)


        const response = handle(request).serialize();
        console.log(`Responding with ${response.toString('hex')}`)
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}: ${e.stack}`);
    }
});
