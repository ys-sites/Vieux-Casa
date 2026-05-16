const fs = require('fs');
let c = fs.readFileSync('src/components/ReservationForm.tsx', 'utf8');
c = c.replace(/\\\$\{/g, '${');
fs.writeFileSync('src/components/ReservationForm.tsx', c);
