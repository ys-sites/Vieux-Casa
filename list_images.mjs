import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === '.git' || file === '.next') return;
        const originalFile = file;
        file = dir + '/' + file;
        
        if (originalFile.includes('1M8A') || originalFile.includes('media')) {
            results.push(file);
        }

        try {
          const stat = fs.statSync(file);
          if (stat && stat.isDirectory()) { 
              results = results.concat(walk(file));
          }
        } catch (e) {}
    });
    return results;
}

console.log(walk('.'));
