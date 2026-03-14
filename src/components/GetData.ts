// import { PrismaClient } from "@prisma/client"
// import { PrismaClient } from './generated/prisma'
// import { PrismaClient } from '../../prisma/generated/prisma'

// import { multjoins } from '@prisma/client/sql'

// const prisma = new PrismaClient()

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../prisma/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

export async function GetEmployeeSales() {
    const employeeSales = await prisma.employeeSales.findMany()
    console.log('GetEmployeeSales(): ', employeeSales)
    return employeeSales
}

// query with relation
export async function GetBookings(targetDate: string) {
    const bookings = await prisma.bookings.findMany({
        where: {
            date: targetDate,
        },
        include: {
            user: true,
        }
    })

    console.log('GetBookings(): ', bookings)
    return bookings
}

export async function GetMemberDays() {
    console.log('--------------GetMemberDays()')
    const memberDays = await prisma.memberDays.findMany({
        include: {
            memberFK: true,
        }
    })
    return memberDays
}

export async function GetFlatBookings(targetDate: string) {
    // const bookings = await prisma.flat_bookings.findFirst({
    //     where: {
    //         date: '2025-03-25',
    //     },
    //     include: {
    //         user: true,
    //     }
    // })
        // const tDate = targetDate.toString()
        console.log('GetFlatBookings-targetdate: ', targetDate)
        const bookings = await prisma.$queryRawTyped(multjoins(targetDate));
        console.log('GetFlatBookings(): ', bookings);
        return bookings[0];
    
        // console.log('GetFlatBookings(): ', bookings)
        // return bookings
}