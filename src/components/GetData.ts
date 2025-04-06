import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GetData() {
    const employeeSales = await prisma.employeeSales.findMany()
    console.log('Getdata(): ', employeeSales)
    return employeeSales
}