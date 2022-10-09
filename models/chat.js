const db = require('../config/config');

const Chat = {};

Chat.findByUser1AndUser2 =(id_user1, id_user2)=>{
   
    const sql = `
         SELECT 
             id,
             id_user1,
             id_user2,
             timestamp 
         FROM
             chats
         WHERE
              (id_user1 = $1 AND id_user2 = $2)
         OR
              (id_user1 = $2 AND id_user2 = $1)
    `;
        
    return db.oneOrNone(sql,[       
        id_user1,
        id_user2        
    ]);
    
}

Chat.update = (chat) => {
    const sql = `
        UPDATE
            chats
        SET
            id = $1,
            id_user1 = $2,
            id_user2 = $3,
            timestamp = $4,            
            updated_at = $5            
        WHERE
            id = $1
    `;
   
    return db.oneOrNone(sql, [
        chat.id,
        chat.id_user1,
        chat.id_user2,
        new Date().getTime(),
        new Date(),
    ]);
}


Chat.create= (chat)=>{
    const sql = `
        INSERT INTO 
            chats(
                id_user1,
                id_user2,
                timestamp,
                created_at,
                updated_at
             )
        VALUES($1, $2, $3, $4, $5) RETURNING id
    `;

    return db.oneOrNone(sql, [
        chat.id_user1,
        chat.id_user2,
        new Date().getTime(),
        new Date(),
        new Date()
    ]);
}

module.exports = Chat;