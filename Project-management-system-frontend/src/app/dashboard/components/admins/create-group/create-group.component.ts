import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent implements OnInit {

  constructor(private service:AdminService){}
  adminsGroup :any[] =[]
  adminGroup = [
    {
      id : "",
      group_name : "",
      createdDate : "",
      description : ""
    }
  ]

  ngOnInit(): void {
    this.service.getAllGroups().subscribe(res=>{
      if(res!==null){
        this.adminGroup = res;
      }
    },err=>{
      console.log(err);
      
    })
    this.fetchallGroups()
  }
  
  fetchallGroups() {
    if (this.adminsGroup) {
      this.service.getAllGroups().subscribe(data => {
        console.log(data);
        
        this.adminGroup = data;
        
      });
    }
  }
  
  downloadPDF() {
    const doc = new jsPDF();
    const companyTitle = 'Code Crafters Services';
    const email = 'codecrafterservices@gmail.com';
    const phone = '9518366964';
    const addressLines = [
      'R.S.NO.590, Office No.3, First Floor,',
      'Shahupuri Complex, Vyapari Peth,',
      'Kolhapur.'
    ];
    const reportTitle = 'Admin Groups List';
  
    // Page dimensions
    const pageWidth = doc.internal.pageSize.width;
  
    // Base64 strings for icons (Replace these with your actual Base64 strings)
    const emailIconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABEElEQVR4nO3UPS9EQRTG8Z+XiEQoVBL7YSRaKjodHZ3GV1Aolbai0+lU2i1pVHyA/QLeWVk5Jte1V3bYVWzuPzm5c2fOPM/N3DmHmppRZgGX6AwprtEomy7Hcx6tIZi2Qrvo9cEj1mM8g/MBml5gLrRXcV807ia8YDPep3A6ANMzTIfmBp5j/otxN96wG3MTOPqD6TEmQ2sHr4W1b8afsR/zYzj4hekhxkNjr8d6pXE/m6uin49OVImcFI5ru3Rc5Sj/puYPuYmcC/LUIyf3Yib6KYnZyF3BXWHtAWuZpZjIbQJLuMVNjHObTyKn7S3q3W6vMnQSOaXSxlb03UaM25kaic4/R6I27oz8UdfUjA7vZuyuMsipCFsAAAAASUVORK5CYII='; // Replace with actual Base64 string for email icon
    const phoneIconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA40lEQVR4nO3Vvw7BUBTH8a/EJEZikoinEO/AEyDegt3KI0gfQYmZWUQHg8kTsKlBJVSaHHLT1N+ebn7JmXpzPuntOSn882XmgG+UB9RQjBcCfKCvCewjAEsTWEYAK03AigAuQFYLaD95g7QWkAfORvMNUEA5tjTfCqieigBHoERCmQpiJwWUAVeQTlJIQ4Ar0HxyJpiuTBykZyDd0LNgABzZE0d2aADUvwFSBhLUGChK83XEzgR1+vW6DtLAlRH2X9TPH37ypnEs4J4qMAptvCpwTw5oAUNgAezkfzJ7nPiHD3IDdftjhkFxZisAAAAASUVORK5CYII='; // Replace with actual Base64 string for phone icon
    const addressIconBase64 ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVR4nM2VP0sDQRDFf6nS+B+xEWtBBAtbOxtFLEQsxEqLWKgB/RjB9Po5YiGoIFioEDClpRhLETSSRmJk4AWGeHfx9izyYGB35r2ZvZm7PegD5IEicAd8ymx9oFgmTAI1oB1jD+IEn7ymRM/AOjAoWwMeXZGgJym65GMRcfPVxdkPKXAvsZ3csAK8KOmyfBvi3IYUaEhsLcGdtvNUhiHtP0IKvEo8nFBgRHvjpsaNxNYa1Ja6ki/JtyqOcVPjSOKzBM65OIchBSaAJvANzEbE5xRrihuEsk54DeS6YleKHZMB427Ym86/5YZrnEzYUbI3YEpXQ6foNv+AHFBRwgvgUutKRNv+hIJ730vyjQJPzl93rSk5v2l7ouoELWBR/gXgS2ZrFGs5vmkTMe+GF3VD7sm6kXdzsRyxOM3w6pWlPYkjDADvIs0EFJjWh9fQJfgLuwl/rnZKK/QablarBnSgT/EDPyWXfXf1lQ0AAAAASUVORK5CYII='; // Replace with actual Base64 string for address icon
  
    // Icon dimensions
    const iconSize = 6; // Adjust size as needed
  
    // Add the company title at the top center
    doc.setFontSize(16);
    doc.text(companyTitle, pageWidth / 2, 20, { align: 'center' });
  
    // Starting Y position for contact information
    let contactY = 30;
  
    // Add email with icon
    if (emailIconBase64) {
      doc.addImage(emailIconBase64, 'PNG', 10, contactY - 5, iconSize, iconSize);
    }
    doc.setFontSize(10);
    doc.text(email, 20, contactY);
  
    // Add phone with icon
    contactY += 10;
    if (phoneIconBase64) {
      doc.addImage(phoneIconBase64, 'PNG', 10, contactY - 5, iconSize, iconSize);
    }
    doc.text(phone, 20, contactY);
  
    // Add address with icon
    contactY += 10;
    if (addressIconBase64) {
      doc.addImage(addressIconBase64, 'PNG', 10, contactY - 5, iconSize, iconSize);
    }
    // Handle multi-line address
    addressLines.forEach((line, index) => {
      doc.text(line, 20, contactY + index * 7);
    });
  
    // Add report title below the header section
    doc.setFontSize(18);
    const reportTitleY = contactY + addressLines.length * 4 + 10;
    doc.text(reportTitle, pageWidth / 2, reportTitleY, { align: 'center' });


  
    // Add table
    
  
    const tableData = this.adminGroup.map(a => [
      a.id,
      a.group_name,
      a.createdDate,
      a.description,
    ]);
  
    // Add autoTable
    autoTable(doc, {
      startY: reportTitleY + 10, // Start position below the header and title,,
      head: [['id', 'group_name', 'createdDate', 'description']],
      body: tableData,
      headStyles: { fillColor: [22, 160, 133] }, // Optional: Customize header color
      theme: 'striped', // Optional: Add table theme
    });
  
    // Save the PDF
    doc.save('AdminGroups.pdf');
  }

}
