import  {Header} from "./header.ts";
import  {LabelSequence} from "./labelSequence.ts";

export class DnsRequest{
    public readonly header: Header
    public readonly questions: LabelSequence[]


    constructor(header: Header, questions: LabelSequence[]) {
        this.header = header;
        this.questions = questions;
    }

    public static from(buffer: Buffer){
        let header: Header = Header.from(buffer.subarray(0, 12))
        if (buffer.length == 12){
            return new DnsRequest(header, [])
        }

        let curBuffer = buffer.subarray(12);


        let curLabels: LabelSequence[] = []
        for (let i = 0; i < header.questionCount; i++){
            let result = LabelSequence.from(curBuffer)
            curLabels.push(result[0])
            curBuffer = result[1]
        }

        return new DnsRequest(header, curLabels);


    }
}