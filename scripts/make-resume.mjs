// Generates a real one-page PDF resume into public/. Content is drawn from the
// same facts as the site. No em-dashes or en-dashes. Run: node scripts/make-resume.mjs
import { writeFileSync } from 'node:fs';

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

// [text, font, size, gapBefore]
const F = 'F1'; // Helvetica
const B = 'F2'; // Helvetica-Bold
const lines = [
  ['Steven Draugel', B, 20, 0],
  ['Principal Full-Stack Software Engineer and Founder', F, 11, 6],
  ['Draugel Engineering, LLC   |   Charleston, South Carolina', F, 10, 4],
  ['sdraugel@gmail.com   |   linkedin.com/in/stevendraugel   |   github.com/Sdraugel', F, 10, 3],

  ['Summary', B, 12, 18],
  ['TS-cleared principal full-stack engineer and founder of Draugel Engineering. 10-plus years', F, 10, 6],
  ['architecting AI-driven platforms and cloud-native systems across .NET, Angular, React, and Azure.', F, 10, 2],
  ['Recently architected the platforms behind two new revenue lines that drove a company to its', F, 10, 2],
  ['first profitable year in five years. U.S. military veteran with an active Top Secret clearance.', F, 10, 2],

  ['Credentials', B, 12, 16],
  ['Active Top Secret clearance. U.S. military veteran.', F, 10, 6],
  ['B.S. Computer Science, College of Charleston, 2016. Minors in Physics and Mathematics.', F, 10, 2],

  ['Core skills', B, 12, 16],
  ['C# / .NET, Angular / TypeScript, React, Java / Spring, Python, PostgreSQL, Azure, AWS, Docker,', F, 10, 6],
  ['Terraform, Bicep, CI/CD, AI / LLM integration.', F, 10, 2],

  ['Experience', B, 12, 16],
  ['NIC MAP   |   Principal Full-Stack Engineer   |   Dec 2024 to Jun 2026', F, 10, 6],
  ['Booz Allen Hamilton   |   Technical Lead, R&D and 4CodeLabs   |   Feb 2024 to Dec 2024', F, 10, 2],
  ['Booz Allen Hamilton   |   Lead Full-Stack Engineer, Folio and IT Collect, GSA   |   Jun 2020 to Feb 2024', F, 10, 2],
  ['Blackbaud Labs   |   Staff Software Engineer   |   Mar 2018 to Jun 2020', F, 10, 2],
  ['Michelin   |   Mobile and Web Developer, R&D   |   May 2016 to Mar 2018', F, 10, 2],

  ['Career highlights', B, 12, 16],
  ['NIC MAP: Deal AI senior-living investment platform, Active Adult, a multi-provider LLM gateway,', F, 10, 6],
  ['and a schema-driven Angular UI system.', F, 10, 2],
  ['Booz Allen: Decision Assistant AI, the Folio CPIC platform for 17-plus federal agencies, and the', F, 10, 2],
  ['IT Collect ACRAPI that secured $500K in GSA funding.', F, 10, 2],
  ['Blackbaud Labs: an AI facial-recognition billing system.', F, 10, 2],
  ['College of Charleston: Journey to a Black Hole, an NSF-funded iOS app with a real-time', F, 10, 2],
  ['gravitational-lensing engine.', F, 10, 2],

  ['Mentorship and community', B, 12, 16],
  ['Mentored five engineers through Develop Carolina, all hired. Taught high-school computer science', F, 10, 6],
  ['for three years with Microsoft TEALS. Mentored College of Charleston Capstone students across', F, 10, 2],
  ['two cohorts.', F, 10, 2],
];

let y = 752;
const x = 56;
const ops = [];
for (const [text, font, size, gap] of lines) {
  y -= gap + size;
  ops.push(`BT /${font} ${size} Tf ${x} ${y.toFixed(1)} Td (${esc(text)}) Tj ET`);
}
const content = ops.join('\n');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) {
  pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

writeFileSync('public/steven-draugel-resume.pdf', pdf, 'latin1');
console.log('Wrote public/steven-draugel-resume.pdf', pdf.length, 'bytes');
