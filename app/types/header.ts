
export class Header {
    packetIdentifier: bigint
    queryResponseIndicator: bigint
    operationCode: bigint
    authoritativeAnswer: boolean
    truncation: boolean
    recursionDesired: boolean
    recursionAvailable: boolean
    reserved: bigint
    responsecode: bigint
    questionCount: bigint
    answerRecordCount: bigint
    authorityRecordCount: bigint
    additionalRecordCount: bigint


    constructor(packetIdentifier: bigint, queryResponseIndicator: bigint, operationCode: bigint, authoritativeAnswer: boolean, truncation: boolean, recursionDesired: boolean, recursionAvailable: boolean, reserved: bigint, reponseCode: bigint, questionCount: bigint, answerRecordCount: bigint, authorityRecordCount: bigint, additionalRecordCount: bigint) {
        this.packetIdentifier = packetIdentifier;
        this.queryResponseIndicator = queryResponseIndicator;
        this.operationCode = operationCode;
        this.authoritativeAnswer = authoritativeAnswer;
        this.truncation = truncation;
        this.recursionDesired = recursionDesired;
        this.recursionAvailable = recursionAvailable;
        this.reserved = reserved;
        this.responsecode = reponseCode;
        this.questionCount = questionCount;
        this.answerRecordCount = answerRecordCount;
        this.authorityRecordCount = authorityRecordCount;
        this.additionalRecordCount = additionalRecordCount;
    }

    public serialize(): Buffer {

        let buffer: any = Buffer.alloc(12);
        buffer.writeUInt16BE(Number(this.packetIdentifier), 0);
        let flags = 0;
        flags |= Number( this.queryResponseIndicator) << 15;
        flags |= Number( this.operationCode) << 11;
        flags |= (this.authoritativeAnswer ? 1 : 0) << 10;
        flags |= (this.truncation ? 1 : 0) << 9;
        flags |= (this.recursionDesired ? 1 : 0) << 8;
        flags |= (this.recursionAvailable ? 1 : 0) << 7;
        flags |= Number( this.reserved) << 4;
        flags |= Number ( this.responsecode);
        buffer.writeUInt16BE(Number(flags), 2);
        buffer.writeUInt16BE(Number(this.questionCount), 4);
        buffer.writeUInt16BE(Number(this.answerRecordCount), 6)
        buffer.writeUInt16BE(Number(this.authorityRecordCount), 8);
        buffer.writeUInt16BE(Number(this.additionalRecordCount), 10);


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView

        return buffer;
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


        return new Header(packetIdentifier, queryResponse ? 1n : 0n, opcode, authoritativeAnswer, truncation, recursionDesired, recursionAvailable, reserved, responseCode, questionCount, answerCount, authorityRecordCount, additionalRecordCount);


    }

}