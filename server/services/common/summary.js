import mongoose from "mongoose"
import {getDateDDMMYY} from "../../utils/getDateDDMMYY.js";
import {clientRedis} from "../../index.js";

export const summaryService= async (Req, Model, name) => {
    try{

        const dateNow = getDateDDMMYY()
        const redisKeySummary = `${dateNow}.summary.${name}`
        const cached = await clientRedis.get(redisKeySummary)
        if(cached){
            return {status: "success", data: JSON.parse(cached)}
        }



        let data=await  Model.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(Req.user.id)}},
            {
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            TotalAmount:{$sum:"$total"}
                        }
                    }],
                    Last30Days:[{
                        $group:{
                            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }},
                            TotalAmount:{$sum:"$total"}
                        }},
                        { $sort: { _id: -1 } },
                        { $limit: 30 }
                    ]
                }
            }
        ])

        await clientRedis.set(redisKeySummary, JSON.stringify(data))
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}