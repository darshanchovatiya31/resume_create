const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    const htmlPath = path.join(__dirname, 'resume.html');
    const pdfPath = path.join(__dirname, 'Darshan_Chovatiya_Resume.pdf');
    
    console.log('Starting PDF generation...');
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Read HTML file
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    await page.setContent(htmlContent, {
        waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    await page.pdf({
        path: pdfPath,
        format: 'Letter',
        margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in'
        },
        printBackground: true
    });
    
    await browser.close();
    
    console.log(`PDF generated successfully: ${pdfPath}`);
}

generatePDF().catch(console.error);

