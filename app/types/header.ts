
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

}