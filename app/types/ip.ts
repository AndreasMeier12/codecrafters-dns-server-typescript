export class Ip{
    parts: bigint[]


    private constructor(parts: bigint[]) {
        this.parts = parts;
    }

    static from(parts: bigint[]): Ip{
        if (parts.length != 4){
            throw new Error("There should be four parts");
        }
        for (const part of parts){
            if (part < 0 || part > 255){
                throw new Error("Parts should be between 0 and 255")
            }

        }
        return new Ip(parts);
    }

    public serialize(): Buffer{

        return Buffer.from(this.parts.map(x => Number(x)));

    }

}