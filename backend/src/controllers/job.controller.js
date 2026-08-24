import { prisma } from "../utils/db.js";
//admin
export const postJob = async (req, res) => {
    console.log("post controller hit")
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId,experienceLevel } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experienceLevel) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const job = await prisma.job.create({
            data: {
                title,
                description,
                requirements,
                experienceLevel,
                salary: Number(salary),
                location,
                jobType,
                position: Number(position),
                companyId: Number(companyId),
                userId: userId
            }
        })
        return res.status(201).json({
            message: "New Job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}
export const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { title: { $regex: keyword, $option: "i" } },
                { description: { $regex: keyword, $option: "i" } }
            ]
        }
        const jobs = await prisma.job.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: keyword,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            include:{
                company:true
            }
        })
        if (jobs.length===0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    const jobId = Number(req.params.id);
    const job = await prisma.job.findFirst({
        where: {
            id: jobId
        },
        include:{
            applications:true
        }
    })
    if (!job) {
        return res.status(400).json({
            message: "Jobs not found",
            success: false
        })
    }
    return res.status(200).json({
        job,
        success: true
    })
}
//admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await prisma.job.findMany({
            where: {
                userId: adminId
            },
            include:{
                company:true    
            }
        })
        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
} 