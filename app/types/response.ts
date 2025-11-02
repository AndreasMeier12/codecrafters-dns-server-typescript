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
            
            let res = Buffer.from([
                buffers.length,
                ...Buffer.from(val, 'utf-8')

            ])

            if (index < this.labels.length -1 ){
                res.writeUint8(0, res.length);

            }
            buffers.push(res)
        })


        let lol_buffer = Buffer.concat(buffers);
        lol_buffer.writeUInt16BE(Number(this.type), lol_buffer.length);
        lol_buffer.writeUInt16BE(Number(this.clazz), lol_buffer.length);

        return lol_buffer
    }

}