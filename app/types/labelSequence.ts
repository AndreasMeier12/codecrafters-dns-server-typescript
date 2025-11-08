export class LabelSequence {
    private labels: string[]


    constructor(labels: string[]) {
        this.labels = labels;
    }

    public serialize(): Buffer{
        let buffers: Buffer[] = []
        this.labels.forEach((val, index) => {

            let tempBuffer = Buffer.from(val, 'utf-8');
            let bufferoonis = [
                tempBuffer.length,
                ...tempBuffer

            ]
                        if (index == this.labels.length -1 ){
                bufferoonis.push(0x00);

            }
            let res = Buffer.from(bufferoonis)
            buffers.push(res)
        })
        return Buffer.concat(buffers)

    }

    public static from(buffer: Buffer): [LabelSequence, Buffer]{

        let parts: string[] = []
        let len: Number = 0;
        let curBuffer = buffer;
        while (curBuffer.length > 0 && curBuffer.readUint8(0) != 0){
            let result = this.parsePart(curBuffer);
            parts.push(result[0])
            curBuffer = result[1]

        }


        return [new LabelSequence(parts), curBuffer.subarray(1)]
    }

    static parsePart(buffer: Buffer): [string, Buffer]{
        let length = buffer.readUint8(0);
        return [buffer.subarray(1, 1 + length).toString(), buffer.subarray(1 + length)]

    }
}