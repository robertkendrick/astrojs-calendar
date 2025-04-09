--
select
  fb.date,
  a.username as hour8,
  b.username as hour9,
  c.username as hour10,
  d.username as hou11,
  e.username as hour12,
  f.username as hour13,
  g.username as hour14,
  h.username as hour15,
  i.username as hour16,
  j.username as hour17,
  k.username as hour18,
  l.username as hour19,
  m.username as hour20,
  n.username as hour21  
from flat_bookings fb
join users a on fb.h8 = a.id
join users b on fb.h9 = b.id
join users c on fb.h10 = c.id
join users d on fb.h11 = d.id
join users e on fb.h12 = e.id
join users f on fb.h13 = f.id
join users g on fb.h14 = g.id
join users h on fb.h15 = h.id
join users i on fb.h16 = i.id
join users j on fb.h17 = j.id
join users k on fb.h18 = k.id
join users l on fb.h19 = l.id
join users m on fb.h20 = m.id
join users n on fb.h21 = n.id
where date = :date;