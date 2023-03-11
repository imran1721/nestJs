import * as bcrypt from 'bcrypt';
export const hashPassword =async (plaintextPassword: string | Buffer) :Promise<any>=> {
    console.log(plaintextPassword, "passsword   ");
    const hashPassword = await bcrypt.hash(plaintextPassword, 10)
        // .then( hash => {
        //     console.log(hash);
        //     return hash
        // })
        // .catch(err => {
        //     return err;
        // })
   console.log(hashPassword, "password121");
}

export const comparePassword =async (plaintextPassword: any, hash: any) => {
    return bcrypt.compare(plaintextPassword, hash)
        .then((result: any) => {
            return result
        })
        .catch((err: any) => {
            console.log(err)
        })
}
