import { PrismaClient } from "@prisma/client"
import { multjoins } from '@prisma/client/sql'

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

export async function GetFlatBookings(targetDate) {
    // const bookings = await prisma.flat_bookings.findFirst({
    //     where: {
    //         date: '2025-03-25',
    //     },
    //     include: {
    //         user: true,
    //     }
    // })

        const bookings = await prisma.$queryRawTyped(multjoins(targetDate));
        console.log('GetFlatBookings(): ', bookings);
        return bookings;
    
        // console.log('GetFlatBookings(): ', bookings)
        // return bookings
}