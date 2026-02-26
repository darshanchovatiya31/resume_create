const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    const htmlPath = path.join(__dirname, 'resume-v3.html');
    const pdfPath = path.join(__dirname, 'Darshan_Chovatiya_Resume_V3.pdf');
    
    console.log('Starting PDF generation (Version 3)...');
    
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
            top: '0.45in',
            right: '0.45in',
            bottom: '0.45in',
            left: '0.45in'
        },
        printBackground: true
    });
    
    await browser.close();
    
    console.log(`PDF generated successfully: ${pdfPath}`);
}

generatePDF().catch(console.error);

