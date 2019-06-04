const bcrypt = require('bcryptjs');

module.exports =
{
    Encrypt: async function (password, salt)
    {
        const hashedPassword = await new Promise((resolve, reject) =>
        {
            bcrypt.hash(password, salt, function(err, hash)
            {
                if (err) reject(err)
                resolve(hash)
            });
        })

        return hashedPassword;
    },

    Compare: async function (password, dbHash)
    {
        const passwordCheck = await new Promise((resolve, reject) =>
        {
            bcrypt.compare(password, dbHash, function(err, check)
            {
                if(err) reject(err)
                resolve(check)
            })
        })
        
        return passwordCheck;
    }
}
