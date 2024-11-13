const ContactRepository = require('../repositories/ContactRepository')

class ContactController{

    async index(request, response){
        const contacts = await ContactRepository.findAll()
        response.json(contacts)
    }

    async show(request, response){
        const {id} = request.params
        const contact = await ContactRepository.findById(id)
        if(!contact){
            return response.status(404).json({error: "Contact not found :("})
        }
        response.status(200).json(contact)
    }

    async store(request, response){
        const {name, email, phone, category_id} = request.body
        if(!name){
            return response.status(400).json({error: "Name is required"})
        }
        if(email){
            const contactByEmail = await ContactRepository.findByEmail(email);
            if(contactByEmail){
                return response.status(400).json({error: "This e-mails is already in use"})
            }
        }
        const contact = await ContactRepository.create({
            name,
            email: email || null,
            phone: phone || null,
            category_id: category_id || null
        });
        response.status(201).json(contact)  
    }

    update(){

    }
    
    async delete(request, response){
        const {id} = request.params
        if(!id)
            return response.status(400).json({error: 'Invalid'})
    await ContactRepository.delete(id);
    response.sendStatus(204);
}
}

module.exports = new ContactController();
