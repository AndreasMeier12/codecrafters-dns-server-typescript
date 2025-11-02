import {type Header} from "./header.ts";
import  {type LabelSequence} from "./labelSequence.ts";
import  {type Answer} from "./answer.ts";

export class Response {

    header: Header;
    questions: LabelSequence[]
    type: bigint
    clazz: bigint
    answers: Answer[]


    constructor(header: Header, questions: LabelSequence[], type: bigint, clazz: bigint, answers: Answer[]) {
        this.header = header;
        this.questions = questions;
        this.type = type;
        this.clazz = clazz;
        this.answers = answers;
    }

    public serialize(): Buffer {
        let buffers: Buffer[] = []
        buffers.push(this.header.serialize())

        for (const question of this.questions){
            buffers.push(question.serialize())
        }


        buffers.push(Buffer.from([0x00, Number(this.type)]))
        buffers.push(Buffer.from([0x00, Number(this.clazz)]))
        for (const answer of this.answers){
            buffers.push(answer.serialize())
        }

        return Buffer.concat(buffers);
    }

}