import cp from 'child_process';
try {
  console.log(cp.execSync('ls -la /').toString());
} catch (e) {
  console.log(e.toString());
}
