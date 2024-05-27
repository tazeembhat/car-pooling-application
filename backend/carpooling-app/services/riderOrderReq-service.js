import RiderOrderReq from '../model/RiderRequest.js';

export const saveRiderOrderReq = async (newRiderOrderReq) =>{
    //return value of asyn func is promise
   const riderOrderReq = new RiderOrderReq(newRiderOrderReq);
   return riderOrderReq.save();
}

export const getRiderOrderReq = async (id) =>{
    //return value of asyn func is promise
   const riderOrderReq =  RiderOrderReq.findOne({RiderId:id}).exec();
   return riderOrderReq;
}


export const getDriverOrderNumberReq = async (id) =>{
    //return value of asyn func is promise
   const riderOrderReq =  RiderOrderReq.find({DriverOrderNumber:id}).exec();
   return riderOrderReq;
}

export const removeRiderOrderReq = async (id) =>{
    //return value of asyn func is promise
   const riderOrderReq =  RiderOrderReq.findByIdAndDelete(id).exec();
   return riderOrderReq;
}

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedriderOrderReq) =>{
    //return value of asyn func is promise
    //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
    const riderOrderReqNew = {...updatedriderOrderReq};
    const riderOrderReq =  RiderOrderReq.findOneAndUpdate({ RiderId: id } ,{ $set: riderOrderReqNew },{new: true}).exec();
    //const riderOrderReq =  RiderOrderReq.findOneAndUpdate({ RiderId: id } ,{ $push: { ratings: riderOrderReqNew.ratings } },riderOrderReqNew,{new: true}).exec();
   return riderOrderReq;
}

/* 
export const updateRiderOrderReq = async (id, updatedCommuter) => {
    const riderOrderReqwithdate  = {...updateRiderOrderReq, lastUpdatedDate: Date.now()}
    const riderOrderReq = RiderOrderReq.findByIdAndUpdate(id, riderOrderReqwithdate, {new: true}).exec();
    return riderOrderReq;      
} */

export const searchRiderOrderReq = async (params) =>{
    //return value of asyn func is promise
   const riderOrderReqs =  RiderOrderReq.find(params).exec();
   return riderOrderReqs;
}

