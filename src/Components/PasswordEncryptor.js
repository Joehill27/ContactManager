const bcrypt = require('bcryptjs');

module.exports = 
{
    /*Salt: async function(saltRounds)
    {
        const salt = await new Promise((resolve, reject) =>
        {
            bcrypt.genSalt(saltRounds, function(err, salt)
            {
                if (err) reject(err)
                resolve(salt)
            })
        })

        return salt;
    },*/

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
