import  {type LabelSequence} from "./labelSequence.ts";
import  {type Ip} from "./ip.ts";

export class Answer{
    labels: LabelSequence;
    type: bigint;
    clazz: bigint;
    ttl: bigint;
    length: bigint;
    data: Ip;


    constructor(labels: LabelSequence, type: bigint, clazz: bigint, ttl: bigint, length: bigint, data: Ip) {
        this.labels = labels;
        this.type = type;
        this.clazz = clazz;
        this.ttl = ttl;
        this.length = length;
        this.data = data;
    }


    public serialize(): Buffer{
        let buffers: Buffer[] = []
        buffers.push(this.labels.serialize())
        buffers.push(Buffer.from([0x00, Number(this.type)]))
        buffers.push(Buffer.from([0x00, Number(this.clazz)]))

        {
            let lolbuf: Buffer = Buffer.alloc(4);
            lolbuf.writeUint32BE(Number(this.ttl))
            buffers.push(lolbuf)
        }
        let ip_buf = this.data.serialize()
        let length = ip_buf.length;
                {
            let lolbuf: Buffer = Buffer.alloc(2);
            lolbuf.writeUint16BE(Number(length))
            buffers.push(lolbuf)
        }
        buffers.push(ip_buf)



        return Buffer.concat(buffers)

    }

}