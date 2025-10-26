
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
        buffer.writeUInt16BE(Number(1234), 0);
        let flags = 0n;
        flags |= this.queryResponseIndicator << 15n;
        flags |= this.operationCode << 11n;
        flags |= this.authoritativeAnswer ? 1n : 0n << 10n;
        flags |= this.truncation ? 1n : 0n << 9n;
        flags |= this.recursionDesired ? 1n : 0n << 8n;
        flags |= this.recursionAvailable ? 1n : 0n << 7n;
        flags |= this.reserved << 4n;
        flags |= this.responsecode;
        buffer.writeUInt16BE(Number(flags), 2);
        buffer.writeUInt16BE(Number(this.questionCount), 4);
        buffer.writeUInt16BE(Number(this.answerRecordCount), 6)
        buffer.writeUInt16BE(Number(this.authorityRecordCount), 8);
        buffer.writeUInt16BE(Number(this.additionalRecordCount), 10);


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView

        return buffer;
    }

}