import { prisma } from "../utils/db.js";
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }
        const existingCompany = await prisma.company.findFirst({
            where: {
                name:companyName
            }
        })
        if (existingCompany) {
            return res.status(400).json({
                message: "You have already register a company",
                success: false
            })
        }
        const company = await prisma.company.create({
            data: {
                name: companyName,
                userId: req.id
            }
        })
        return res.status(201).json({
            message: "Company register successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await prisma.company.findMany({
            where: {
                userId: userId
            },
            include:{
                job:true
            }
        })
        if (!companies) {
            return res.status(400).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            message:"data fetched",
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompanyById = async (req, res) => {
    try {
        const companyId = Number(req.params.id);
        const company = await prisma.company.findFirst({
            where: {
                id: companyId
            },
            include:{
                job:true
            }
        })
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            sucess: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const companyId = Number(req.params.id);
        const file = req.file;
        const company = await prisma.company.update({
            where: {
                id: companyId
            },
            data: {
                name,
                description,
                website,
                location
            }
        })
        if (!company) {
            return res.status(404).json({
                message: "Compnay not found",
                success: true
            })
        }
        return res.status(200).json({
            message: "Company information updated",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}