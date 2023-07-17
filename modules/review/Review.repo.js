let Reviews = require("./Review.Model")


exports.get = async (filter)=>{
  try {
    const { userId, productId} = filter
    if(userId){
      const UserReviews = await Reviews.find({ userid: userId });
      return{
        success: true,   
        items: UserReviews,
       };
    }if(productId){
      const ProductReviews = await Reviews.find({ product: productId });
      return{
        success: true,   
        items: ProductReviews,
       };
    }
  } catch (error) {
    return{
        success: false, 
        message: 'Failed to fetch Reviews',     
  };
}}

exports.create = async (userId , product ) =>{
  try{
    const { userId, productId , Rating, Title, Comment} = filter
    const newList = new Reviews({userid : userId });
      await newList.save();
      return{
        success: true,
        record: newList,
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
exports.update = async (id,form) => {
  try{ 
      const Review = await Reviews.findOneAndUpdate({_id : id},form);
   if (!Review) {
     return{
       success: false,
       code: 500,
       error: `No Reviews with that ID`
     }
   }
   else{return{
     success: true,
     code: 200,
     data: Review,
     
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

exports.delete = async (filter)=>{
  try {
    const { ReviewId } = filter;
    await Reviews.findByIdAndDelete(ReviewId);
    return{
      success: true,   
      items: wishlistItems,
     };
  } catch (error) {
    return{
        success: false, 
        message: 'Failed to Delete wishlisted item',     
  };
}}