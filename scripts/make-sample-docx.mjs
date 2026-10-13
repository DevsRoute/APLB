// Generates /public/templates/sample-loi.docx — a realistic, multi-feature LOI
// with {placeholders} the POCs can target. Run `npm run make:sample`.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle, UnderlineType,
} from 'docx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../public/templates/sample-loi.docx');

const bold = (t) => new TextRun({ text: t, bold: true });
const txt  = (t) => new TextRun({ text: t });
const tag  = (name) => new TextRun({ text: `[${name}]`, highlight: 'cyan' });
const underlined = (t) => new TextRun({ text: t, underline: { type: UnderlineType.SINGLE } });

const cell = (children, opts = {}) =>
  new TableCell({
    children: Array.isArray(children) ? children : [children],
    width: opts.width ?? { size: 50, type: WidthType.PERCENTAGE },
  });

const row = (left, right) =>
  new TableRow({ children: [cell(left, { width: { size: 25, type: WidthType.PERCENTAGE } }), cell(right)] });

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
  },
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [txt('Date: '), tag('today')],
        }),
        new Paragraph({ children: [tag('ll_broker')] }),
        new Paragraph({ children: [tag('ll_brokerage')] }),
        new Paragraph({ children: [tag('ll_broker_email')] }),
        new Paragraph({
          children: [txt('Re: '), tag('street'), txt(', '), tag('city'), txt(', '), tag('state')],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_2,
          children: [bold('NONBINDING LETTER OF INTENT')],
        }),
        new Paragraph({ children: [txt('Dear Landlord:')] }),
        new Paragraph({
          children: [
            txt(
              'This letter sets forth proposed terms for leasing the Premises described below. ' +
              'These proposed terms remain subject to final corporate approvals by Tenant and ' +
              'Landlord and negotiation of a Lease.',
            ),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            row(bold('Landlord:'), [new Paragraph({ children: [tag('ll_name')] })]),
            row(bold('Tenant:'), [new Paragraph({ children: [txt('Dollar Tree Stores, Inc., a VA corporation')] })]),
            row(bold('Shopping Center:'), [
              new Paragraph({
                children: [
                  tag('project_name'), txt(' containing approximately '),
                  tag('size'), txt(' square feet of gross leasable area, as shown on the site plan attached to this letter as '),
                  underlined('Exhibit A'), txt('.'),
                ],
              }),
            ]),
            row(bold('Premises:'), [
              new Paragraph({
                children: [
                  txt('Approx. '), tag('size'),
                  txt(' square feet in the Shopping Center, as shown on '),
                  underlined('Exhibit A'), txt('.'),
                ],
              }),
              new Paragraph({
                children: [bold('Address: '), tag('street'), txt(', '), tag('city'), txt(', '), tag('state')],
              }),
            ]),
            row(bold('Existing Tenant in Premises:'), [new Paragraph({ children: [tag('existing_tenant')] })]),
            row(bold('Landlord’s Property Ownership Status:'), [new Paragraph({ children: [tag('ownership_status')] })]),
            row(bold('Broker (Tenant):'), [
              new Paragraph({ children: [tag('broker'), txt(' — '), tag('brokerage')] }),
              new Paragraph({ children: [tag('broker_email')] }),
            ]),
          ],
        }),
        new Paragraph({
          children: [
            txt('This is a non-binding Letter of Intent intended to serve as the basis for ' +
                'negotiating a definitive Lease.  Each party shall bear its own costs.'),
          ],
        }),
        new Paragraph({ children: [txt('Sincerely,')] }),
        new Paragraph({ children: [txt('Dollar Tree Stores, Inc.')] }),
      ],
    },
  ],
});

mkdirSync(dirname(out), { recursive: true });
Packer.toBuffer(doc).then((buf) => {
  writeFileSync(out, buf);
  console.log('Wrote', out, `(${buf.length} bytes)`);
});
