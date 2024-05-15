const Job = require('../models/job')

const createJobPost = async(req, res, next) =>{
    try{
        const {
            conpanyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            jobType,
            information,
        } = req.body;

        companyName();
        
        if( !conpanyName ||
            !logoUrl ||
            !title||
            !description||
            !salary||
            !location||
            !duration||
            !locationType||
            !skills||
            !jobType||
            !information
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const jobDetails = new Job({
            conpanyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            jobType,
            information,
        });

        await jobDetails.save();
        res.json({message : "Job created successsfully"});

    }catch (error){
        next(error);
    }
}

module.exports = {
    createJobPost,
}