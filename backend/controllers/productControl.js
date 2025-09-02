const Product = require("../model/productModel")
exports. getAllProducts = async (res,req)=>{
   try {
     const products = await Product.find();
        if(!products){
            return res.status(404).json({
                success:false,
                message:"Users not found!",
            });
        }
          req.status(200).json({
        success:true,
        products,
    });
    
   } catch (error) {
    
      res.status(500).json({
            success: false,
            message:error.message
        })
   }
}
exports.addProduct = async(req,res)=>{

    console.log("req.body---->", req.body);
    try{
        const {productName,productPrice,productDiscription} = req.body
        const productPhotos = req?.files?.map((file)=>file.path)  ??  [];
        const productData = {
            productName,
            productPrice,
            productDiscription,
            productPhotos
        }
        const product = await Product.create(productData);
        
        console.log("product--->",product);
        

        res.status(201).json({
            success:true,
            product,
            message:("product add successfully!")
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message:error.message
        })
    }


    //  product.push(product);
    // res.send('Product added successfully!')
}
exports.editProduct = async(req,res)=>{

    try {

        const {id} = req.params;
        console.log("id-->",id);
        
        const { productName, productPrice, productDiscription, productPhoto } = req.body;

       
        if(!productName || !productPrice || !productDiscription || !productPhoto){
             return res.status(404).json({
                success:false,
                message:"Product not found!",
            });
        }
      const product = await Product.findByIdAndUpdate(id,req.body,{
        new:true,
      });

       
        res.status(200).json({
            success:true,
            message:"Product edited successfully!",
            product
        });

    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
exports.deleteProduct = async(req,res)=>{
     try {
        const {id} = req.params;
            const product = await Product.findByIdAndDelete(id);
    
            if(!product){
                  return res.status(404).json({
                    success:false,
                    message:"product not found!",
                });
            }
    
                res.status(200).json({
                success:true,
                message:"porduct deleted successfully!",
                product
            });
    
    
        } catch (error) {
             res.status(500).json({
                success:false,
                message:error.message,
            })
        }
}