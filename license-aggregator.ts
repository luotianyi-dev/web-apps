import fs from 'fs'
import pkg from './package.json'

const LICENSE_HEADER: string = `
Copyright (c) 2024 Tianyi Network, Mozilla Public License Version 2.0\n
`;

export const packages = [
  {
    name: `Tianyi Network Apps`,
    licenseText: LICENSE_HEADER + fs.readFileSync(`${__dirname}/LICENSE`, 'utf-8'),
  },
  {
    name: 'Vsinger 同人创作规约',
    licenseText: fs.readFileSync(`${__dirname}/src/resources/licenses/vsinger.txt`, 'utf-8'),
  },
  ...Object.keys(pkg.dependencies).map(name => ({
    name,
    licenseText: fs.readFileSync(`${__dirname}/node_modules/${name}/LICENSE`, 'utf-8'),
  })),
];
