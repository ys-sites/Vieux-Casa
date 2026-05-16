import cp from 'child_process';
try {
  console.log(cp.execSync('find /home/project -name "*media*" 2>/dev/null').toString());
} catch(e){}
