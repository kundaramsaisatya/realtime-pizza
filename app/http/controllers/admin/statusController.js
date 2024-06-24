const Order = require('../../../models/order');

function statusController() {
    return {
        async update(req,res){
            try{
                await Order.updateOne({_id: req.body.orderId},{status: req.body.status})
                req.flash('success','Status Updated Successfully')
                return res.redirect('/admin/orders')
            } catch(err) {
                req.flash('error',"Error in updating status")
                return res.redirect('/admin/orders')
            }
                        
        }
    }
}

module.exports = statusController;
