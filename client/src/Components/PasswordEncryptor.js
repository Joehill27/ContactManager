const bcrypt = require('bcryptjs');

    async function encrpyt(password, salt) {
            const hashedPassword = await new Promise((resolve, reject) =>
            {
                bcrypt.hash(password, salt, function(err, hash)
                {
                    if (err) reject(err)
                    resolve(hash)
                });
            })
    
            return hashedPassword;
        };

    async function compare(password, dbHash) {
        const passwordCheck = await new Promise((resolve, reject) =>
        {
            bcrypt.compare(password, dbHash, function(err, check)
            {
                if(err) reject(err)
                resolve(check)
            })
        })
        
        return passwordCheck;
    };

export {encrpyt, compare};