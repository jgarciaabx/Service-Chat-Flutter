const db = require('../config/config');
const brcrypt = require('bcryptjs');

const User = {};

User.gettAll = (id) =>{
    const sql = `
    SELECT 
    	id,
    	email,
        name,
    	lastname,
    	phone,
    	image,
    	session_token
    FROM 
    	users
    WHERE
    	id != $1
        `;

    return db.manyOrNone(sql, id);

}

User.findByEmail = (email) => {
    const sql = `
    SELECT
	    id,
	    email,
	    name,
	    lastname,
	    image,
	    phone, 
	    password, 
	    session_token
    FROM 
    	users 
    WHERE 
    	email = $1
    `;
    return db.oneOrNone(sql, email);
}


User.findById = (id,callback) =>{
    const sql = `
    SELECT
	    id,
	    email,
	    name,
	    lastname,
	    image,
	    phone, 
	    password, 
	    session_token
    FROM 
    	users 
    WHERE 
    	id = $1
        `;
    return db.oneOrNone(sql, id).then(user =>{callback(null,user)})

}


User.create = async (user) =>{

    //REGISTRAR CON CONTRASEÑA ENCRIPTA EL HASH
    const hash = await brcrypt.hash(user.password, 10);

    const sql = `
    INSERT INTO
        users(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
        )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        hash,
        new Date(),
        new Date()
    ]);
}

module.exports = User;