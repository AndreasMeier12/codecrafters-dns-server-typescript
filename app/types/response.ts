import {type Header} from "./header.ts";

export class Response {

    header: Header;
    labels: string[]
    type: bigint
    clazz: bigint


    constructor(header: Header, labels: string[], type: bigint, clazz: bigint) {
        this.header = header;
        this.labels = labels;
        this.type = type;
        this.clazz = clazz;
    }

    public serialize(): Buffer {
        let buffers: Buffer[] = []
        buffers.push(this.header.serialize())

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

        buffers.push(Buffer.from([0x00, Number(this.type)]))
        buffers.push(Buffer.from([0x00, Number(this.clazz)]))




        return lol_buffer;
    }

}