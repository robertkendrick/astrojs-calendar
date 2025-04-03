select load_extension('./pivotvtab');
--.load dist/pivotvtab

create virtual table v_sales using pivot_vtab (
  -- rows
  (select distinct employeeName from EmployeeSales),
  -- columns
  (select distinct month, month from EmployeeSales),
  -- cells
  (select sum(salesAmount) from EmployeeSales where employeeName = ?1 and month = ?2)
);

--select * from v_sales;