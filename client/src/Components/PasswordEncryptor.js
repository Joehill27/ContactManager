const bcrypt = require('bcryptjs');

module.exports = class PasswordEncryptor
{
    plaintextPassword;
    saltRounds;
    salt;

    PasswordEncryptor(plaintextPassword, saltRounds)
    {
        this.plaintextPassword = plaintextPassword;
        this.saltRounds = saltRounds;
    }

    // This allows us to recover the salt used if we want to store that in the database
    async EncryptSaveSalt()
    {
        const hashedPassword = await new Promise((resolve, reject) =>
        {
            bcrypt.genSalt(saltRounds, function(err, salt)
            {
                bcrypt.hash(this.plaintextPassword, salt, function(err, hash)
                {
                    if(err) reject(err)
                    resolve(hash)

                    Salt = salt;
                });
            });
        })

        return hashedPassword;
    }

    // Standard encrypt function that doesn't save our salt
    async Encrypt() {
        const hashedPassword = await new Promise((resolve, reject) =>
        {
            bcrypt.hash(this.plaintextPassword, saltRounds, function(err, hash)
            {
                if(err) reject(err)
                resolve(hash)
            });
        })

        return hashedPassword;
    };

    // Standard compare function that will return a true/false 
    async Compare(dbHash) {
        const passwordCheck = await new Promise((resolve, reject) =>
        {
            bcrypt.compare(this.plaintextPassword, dbHash, function(err, check)
            {
                if(err) reject(err)
                resolve(check)
            })
        })
        
        return passwordCheck;
    };
}

export {EncryptSaveSalt, Encrypt, Compare};
