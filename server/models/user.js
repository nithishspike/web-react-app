import {mongoose,Schema,model} from "mongoose"

let userschema=new Schema({username:{type:String,unique:true},
password:String,},{timestamps:true});

let UserModel=model('user',userschema);
// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   password: String,
// }, { timestamps: true });

// export default UserModel = mongoose.model('User', UserSchema);
export default UserModel
  