import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GetEmployeeSales() {
    const employeeSales = await prisma.employeeSales.findMany()
    console.log('GetEmployeeSales(): ', employeeSales)
    return employeeSales
}

// query with relation
export async function GetBookings() {
    const bookings = await prisma.bookings.findMany({
        where: {
            date: '2025-03-23'
        },
        include: {
            user: true,
        }
    })

    console.log('GetBookings(): ', bookings)
    return bookings
}
