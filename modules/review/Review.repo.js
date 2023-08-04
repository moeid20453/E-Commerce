let Reviews = require("./Review.Model")
let Prod = require("../product/Product.Model")

exports.isExists = async(userId, productId)=>{
  try{

    let alreadySubmitted =  await Reviews.findOne({
      product: productId,
      userId: userId,
    });
    if(alreadySubmitted){
      return{
        success: true
      }
    }
    else{
      return{
        success: false
      }
    }
  }catch{
    return{
      success: false, 
      message: 'Failed to fetch Reviews',     
};
  }
}


exports.get = async (filter)=>{
  try {
    const { userId, productId,reviewId} = filter
    if(userId){
      const UserReviews = await Reviews.find({ userId: userId });
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
    }if(reviewId){
      const ProductReviews = await Reviews.find({ _id: reviewId });
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

exports.create = async (filter ) =>{
  try{
    const { userId, productId , Rating, Title, Comment} = filter
    const exists = await this.isExists(userId,productId)
    if(exists.success == true ){
      return{
        success: false,
        code: 500,
        error: "User already has a review for this product"
      }
    }
    const newreview = new Reviews({userId : userId , rating: Rating, title: Title, comment: Comment, product: productId});
    await newreview.save();

    let productreviews = await this.get({productId: productId})
    let ratings = 0;
    const numOfReviews = productreviews.length;
    for (const review of productreviews) {
      ratings += review.rating;
    }
    let averageRating = ratings / numOfReviews

    Prod.findByIdAndUpdate({
      productId, 
      $push : {reviews: newreview},
      averageRating: averageRating,
      numOfReviews: numOfReviews,
      new: true,
      runValidators: true,})

      return{
        success: true,
        data: newreview,
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

exports.delete = async (id)=>{
  try {
    
    let review = await Reviews.findByIdAndDelete(id);
    return{
      success: true,   
      data: review,
     };
  } catch (error) {
    return{
        success: false, 
        error: 'Failed to Delete wishlisted item',     
  };
}}