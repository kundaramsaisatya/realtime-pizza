const Menu = require('../../models/menu');
function homeController() {
    return{
        async index(req,res){
            const pizzas = await Menu.find()
            res.render('home',{pizzas: pizzas});
            // console.log("Pizzas: ",pizzas);
        }
    }
    
}
module.exports = homeController;