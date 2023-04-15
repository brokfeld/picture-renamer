#!/usr/bin/env node

console.log(`hello world`, process.argv);



setTimeout(() => {
  console.log(`end`);
}, 60000)