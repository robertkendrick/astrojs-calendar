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
                // console.log('GetFlatBookings-targetdate: ', targetDate)
                // const bookings = await prisma.$queryRawTyped(multjoins(targetDate));
                // console.log('GetFlatBookings(): ', bookings);
                // return bookings[0];
                
                // console.log('GetFlatBookings(): ', bookings)
                // return bookings
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

function lastDay(date: Date){
    // const d = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    // Create a new Date object representing the last day of the specified month
    // By passing m + 1 as the month parameter and 0 as the day parameter, it represents the last day of the specified month
    return new Date(y, m + 1, 0).getDate();
}

export async function Get7MemberDays(startDay: number) {
    const lastDayInMonth = lastDay(new Date())
    let endDay = startDay+6
    if (endDay > lastDayInMonth) {
        endDay = endDay - lastDayInMonth
    }
    console.log('endDay: ', endDay)    
    const result = await prisma.memberDays.findMany({
        where: {
            day: {
                gte: startDay,
                lte: endDay,
            },
        },
        include: {
            memberFK: true,
        }
    })
    return result
}

export async function Get77MemberDays(startDay: number) {
    const lastDayInMonth = lastDay(new Date())

// Generates [28, 29, 30, 1, 2, 3, 4]
//const genBlock = [( (start_day + i - 1) % month_days ) + 1 for i in range(7)]

    const block = Array.from({ length: 7 }, (_, i) => ((startDay + i - 1) % lastDayInMonth) + 1);
    console.log(block)
    
    const result = await prisma.memberDays.findMany({   
        where: {
            day: {
                in: block
                // in: [1, 2, 3, 5, 8],
            },
        },
        include: {
            memberFK: true,
        },
    }) as []
    return DaysSort(result)
}


// Option 1: To sort records after prisma has retrieved them as it doesn't support SQL orderBy: (day < 28), day; 
// keeps the sequence logical (28, 29, 30, 31, 1, 2, 3)
// Fetch the data, then sort it using Array.sort() in your application code. 
// This is usually fine for smaller datasets.
function DaysSort(records: []) {
    records.sort((a, b) => {
        // console.log('AAAAAAA:', a)
        // console.log('AAAAAAA.day: ', a.day)
        // Sort by (day_number < 28)
        const aCustom = a.day > 27 ? 0 : 1;
        const bCustom = b.day > 27 ? 0 : 1;
  
        if (aCustom !== bCustom) {
            return aCustom - bCustom;
        }
  
        // Secondary sort by day_number
        return a.day - b.day;
    });
    console.log('RECORDS: ', records)
    return records
}

// OPTION 2 -- Use raw SQL to run query (need to write actual query)
// const results = await prisma.$queryRaw`
//   SELECT * FROM "ModelName"
//   ORDER BY (day_number < 28), day_number
// `;
