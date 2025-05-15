// src/app/services/pdf.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generatePdf(elementId: string, filename: string) {
    const element = document.getElementById(elementId);
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 200;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const position = 10;

        pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
        pdf.save(`${filename}.pdf`);
      });
    }
  }
}
