import { AppError } from "../utils/AppError.js";


export function validation(schema) {
  return (req, res, next) => {
        let { error } = schema.validate(req.body, { abortEarly: false });
        if (!error) {
          next();
        } else {
          next(new AppError(error, 404));
        }  
    }
  };

