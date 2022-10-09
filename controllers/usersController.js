const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../util/cloud_storage');


module.exports = {

    async getAll(req, res, next){
        try {
            console.log(`Usuarios ${req.params.id}`);
            const id = req.params.id;
            const data = await User.gettAll(id);
          
            console.log(`Usuarios ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);          
          
            return res.status(501).json(
                {
                    succes : false,
                    message : 'Error al obtener los Usuarios'
                });
        }
    },

    async register(req, res, next){
        try {
            
            const user = req.body;
            const data = await User.create(user);

            return res.status(201).json({
                succes: true,
                message: 'El Registro Se Realizado Correctamente',
                data: data.id
            });

        } catch (error) {
            console.log(`Error: ${error} `);
            return res.status(501).json({
                succes: false,
                message: 'Hubo un Error en el Registro del Usuario',
                error : error
            });
            
        }
    },


    async registerWithImage(req, res, nex){
        try {
            
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${user}`);

            const files = req.files;
            if(files.length >0){
                const pathImage = `image_${Date.now()}`; //nombre del archivo
                const url = await storage(files[0], pathImage);

                if(url != undefined && url != null){
                    user.image = url;
                }

            }
            const data = await User.create(user);

            return res.status(201).json({
                succes: true,
                message: 'El Registro Se Realizado Correctamente',
                data: data.id
            });

        } catch (error) {
            console.log(`Error: ${error} `);
            return res.status(501).json({
                succes: false,
                message: 'Hubo un Error en el Registro del Usuario',
                error : error
            });
            
        }
    },

    async login(req,res,nex){
        try {
            
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if(!myUser){
                return res.status(401).json({
                    succes : false,
                    message: 'Email no fue encontrado'
                })
            }
             const isPasswordValid = await bcrypt.compare(password, myUser.password);
             if(isPasswordValid){
                const token = jwt.sign({ id: myUser.id, email: myUser.email}, keys.secretOrKey,{   
            // expiresIn
              })
             const data = {
                id: myUser.id,
                name:myUser.name,
                lastname:myUser.lastname,
                email:myUser.email,
                phone:myUser.phone,
                image:myUser.image,
                session_token: `JWT ${token}`

             };

             return res.status(201).json({
                succes: true,
                message: 'El usuario ha sido autenticado',
                data : data
             });

            }
            else{
                return res.status(401).json({
                    succes: false,
                    message: 'la contraseña es incorrecta',
                    data : data
                 });
            }

        } catch (error) {
            
            console.log(`Error: ${error} `);
            return res.status(501).json({
                succes: false,
                message: 'Hubo un Error en el Login del Usuario',
                error : error
            });
        }
    }

};