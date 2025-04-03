--select * from EmployeeSales where employeeName = ?1 and month = ?2;
select employeeName, sum(salesAmount) as SalesTotal from EmployeeSales where employeeName = ?1;
