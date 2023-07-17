let Vend = require('./Vendor.model')

exports.get = async (filter)=>{
  try {
    const { VendorId } = filter;
    const vendor = await Vend.find({ VendorId: VendorId });
    return{
      success: true,   
      items: vendor,
     };
  } catch (error) {
    return{
        success: false, 
        message: 'Failed to fetch Vendor From database',     
  };
}}

exports.create = async (form) =>{
  try{
    const vendor = new Vend(form);
      await vendor.save();
      return{
        success: true,
        record: vendor,
        code: 201,
      };

  }catch(err){
    console.log("error message", err.message);
    return{
      success: false,
      code: 500,
      error: "Unexpected Error !"
    }
  }
}

exports.update = async (VendorId, update) => {
  try{ 
   const vendor = await Vend.findOneAndUpdate({ 
    VendorId : VendorId ,
    update, 
    new: true,
    runValidators: true,
   });
   if (!vendor) {
     return{
       success: false,
       code: 500,
       error: `No Vendor with this ID`
     }
   }
   else{return{
     success: true,
     code: 200,
     data: vendor,
     
   }}
  }catch(err){
   console.log("Error", err.message);
     return{
       success: false,
       code: 500,
       error: "Unexpected Error"
     }
 }
 };

exports.delete = async (id)=>{
  try {
    await Vend.findByIdAndDelete(id);
    return{
      success: true,   
      message: "Successfully deleted Vendor From databasae",
     };
  } catch (error) {
    return{
        success: false, 
        error: 'Failed to Delete Vendor From databasae',     
  };
}}