export class LabelSequence {
    private labels: string[]


    constructor(labels: string[]) {
        this.labels = labels;
    }

    public serialize(): Buffer {
        let buffers: Buffer[] = []
        this.labels.forEach((val, index) => {

            let tempBuffer = Buffer.from(val, 'utf-8');
            let bufferoonis = [
                tempBuffer.length,
                ...tempBuffer

            ]
            if (index == this.labels.length - 1) {
                bufferoonis.push(0x00);

            }
            let res = Buffer.from(bufferoonis)
            buffers.push(res)
        })
        return Buffer.concat(buffers)

    }

    public static from(buffer: Buffer, offset: number): [LabelSequence, number] {
            const compression_offset: number = 0xC0;

        let parts: string[] = []
        let pos: number = offset;
        let yeses: number[] = []
        for (let i = 12; i < buffer.length; i++){
            let yesyes = (buffer.readUint8(i) & compression_offset) == compression_offset
            if (yesyes){
                yeses.push(i)
            }
        }


        let first = buffer.readUint8(pos)
        let compression = (first & compression_offset) > 0;


        while (buffer.length > pos && (buffer.readUint8(pos) != 0 || compression)) {
            first = buffer.readUint8(pos);
            let is_compression = first & compression_offset;
            if (is_compression > 0) {
                let newOffset = first & (~compression_offset)
                let result = this.from(buffer, newOffset + 12);
                parts.push(...result[0].labels)
                return [new LabelSequence(parts), pos + 1]

            }
            let result = this.parsePart(buffer, pos);
            parts.push(result[0])
            pos = result[1]
            first = buffer.readUInt16BE(pos);
            is_compression = first & compression_offset;
            compression = is_compression > 0;

        }
        return [new LabelSequence(parts), pos +1 ]
    }

    static parsePart(buffer: Buffer, offset: number): [string, number] {
        let length = buffer.readUint8(offset);
        return [buffer.subarray(offset + 1, offset + 1 + length).toString(), offset + length + 1]

    }
}