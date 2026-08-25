import userRouter from "../routes/user.route.js";
import { prisma } from "../utils/db.js";
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = Number(req.params.id);
        if (!jobId) {
            return res.status(404).json({
                message: "Job is required",
                success: false
            })
        }
        const existingApplication = await prisma.application.findFirst({
            where: {
                jobId: jobId,
                applicant: userId,
            }
        })
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }
        const job = await prisma.job.findFirst({
            where: {
                id: jobId,
            }
        })
        if (!job) {
            return res.status(400).json({
                message: "job is not found",
                status: false
            })
        }
        const newApplication = await prisma.application.create({
            data: {
                job: {
                    connect: {
                        id: jobId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        return res.status(200).json({
            message: "job applied successfully",
            application: newApplication,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
export const getApplyJob = async (req, res) => {
    try {
        const userId = req.id;
        const application = await prisma.application.findMany({
            where: {
                applicant: userId
            },
            include: {
                job: {
                    include: {
                        company: true
                    }
                }
            },
            orderBy: {
                createdat: "desc"
            }
        })
        if (application.length === 0) {
            return res.status(404).json({
                message: "No application",
                success: "false"
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getApllicants = async (req, res) => {
    try {
        const jobId = Number(req.params.id);
        const job = await prisma.job.findFirst({
            where: {
                id: jobId
            },
            include: {
                applications: {
                    include: {
                        user:{
                            include:{
                                profile:true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        if (!job) {
            return res.status(200).json({
                message: "job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = Number(req.params.id);
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        }
        //find application by applicant id
        const application = await prisma.application.findFirst({
            where: {
                id: applicationId
            },
        })
        if (!application) {
            return res.status(400).json({
                message: "Application not found",
                success: false
            })
        }
        const newStatus = status.toLowerCase();
        if (!["pending", "accepted", "rejected"].includes(newStatus)) {
            return res.status(400).json({
                message: "Invalid status",
                success: false
            })
        }
        const updateApplication = await prisma.application.update({
            where: {
                id: applicationId,
            },
            data: {
                status: newStatus
            }
        })
        return res.status(200).json({
            message: "status updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}