
export const globalError = (err,req,res,next)=>{
  res.status(err.statusCode || 500).json({ err:err.message,stack:err.stack})
}