import {type Header} from "./header.ts";
import type {Question} from "./question.ts";

export class Response {

    header: Header;
    questions: Question[]
    type: bigint
    clazz: bigint


    constructor(header: Header, questions: Question[], type: bigint, clazz: bigint) {
        this.header = header;
        this.questions = questions;
        this.type = type;
        this.clazz = clazz;
    }

    public serialize(): Buffer {
        let buffers: Buffer[] = []
        buffers.push(this.header.serialize())

        for (const question of this.questions){
            buffers.push(question.serialize())
        }


        buffers.push(Buffer.from([0x00, Number(this.type)]))
        buffers.push(Buffer.from([0x00, Number(this.clazz)]))




        return Buffer.concat(buffers);
    }

}