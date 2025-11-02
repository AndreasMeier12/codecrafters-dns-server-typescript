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
}