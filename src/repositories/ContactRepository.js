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

    async findByEmail(email){
        const [rows] = await db.query(
            `SELECT * FROM contacts
            WHERE email = ?;
            `,
            [email]
        )
        return rows
    }

    async create(name, email, phone, category_id){
        const result = await db.query(
            `INSERT INTO contacts(name, email, phone, category_id)
            VALUES (?, ?, ?, ?)
            `,
            [name, email, phone, category_id]
        )
        const insertId = result.insertId
        return{
            id: insertId,
            name,
            email,
            phone,
            category_id
        }
    }

    update(){

    }

    async delete(id){
        const deleteItem = await db.query(
            `DELETE FROM contacts
            WHERE id = ?`,
            [id]
        )
        return deleteItem
    }
}

module.exports = new ContactRepository();
