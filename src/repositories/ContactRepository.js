const db = require('../models/ConnectDatabase')

class ContactRepository {
    async findAll(){
        const rows = await db.query(
            `select * from contacts;`
        )
        return rows
    }
    async findById(id){
        const [row] = await db.query(
            `select contacts. *, categories.name as category_name
            from contacts
            left join categories on categories.id = contacts.category_id
            where contacts.id = ?;
            `,
            [id]
        )
        return row
    }
    create(){

    }
    update(){

    }
    delete(){

    }
}

module.exports = new ContactRepository();