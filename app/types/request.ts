import  {Header} from "./header.ts";

export class DnsRequest{
    public readonly header: Header


    private constructor(header: Header) {
        this.header = header;
    }

    public static from(buffer: Buffer){
        let packetIdentifier = BigInt(buffer.readUInt16BE(0)) ;
        const flags = buffer.readUInt16BE(2);
        let queryResponse = (flags >>> 15) as 0 | 1 == 1;
        let opcode = BigInt((flags >>> 11) & 0xF) ;
        let authoritativeAnswer = ((flags >>> 10) & 1) as 0 | 1 == 1;
        let truncation = ((flags >>> 9) & 1) as 0 | 1 == 1;
        let recursionDesired = ((flags >>> 8) & 1) as 0 | 1 == 1;
        let recursionAvailable = ((flags >>> 7) & 1) as 0 | 1 == 1;
        let reserved = BigInt((flags >>> 4) & 0x7) ;
        let responseCode = BigInt(flags & 0xF);

        
        let questionCount = BigInt(buffer.readUInt16BE(4));
        let answerCount = BigInt(buffer.readUInt16BE(6)) ;
        let authorityRecordCount = BigInt(buffer.readUInt16BE(8)) ;
        let additionalRecordCount = BigInt(buffer.readUInt16BE(10)) ;


        const header = new Header(packetIdentifier, queryResponse ? 1n : 0n, opcode, authoritativeAnswer, truncation, recursionDesired, recursionAvailable, reserved, responseCode, questionCount, answerCount, authorityRecordCount, additionalRecordCount);
        return new DnsRequest(header);


    }
}