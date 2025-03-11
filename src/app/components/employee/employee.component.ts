import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from '../../model/Employee';

@Component({
  selector: 'app-employee',
  standalone: true, // ✅ Standalone component
  imports: [ReactiveFormsModule], // ✅ Import this!
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'] // ✅ Fix typo (styleUrl -> styleUrls)
})
export class EmployeeComponent {
  
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) { 
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  reset() {
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empid), // ✅ Match key name
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      city: new FormControl(this.employeeObj.city, [Validators.required]),
      address: new FormControl(this.employeeObj.address, [Validators.required]),
      contactNo: new FormControl(this.employeeObj.contactNo, [Validators.required]),
      emailId: new FormControl(this.employeeObj.emailId, [Validators.required, Validators.email]),
      pinCode: new FormControl(this.employeeObj.pinCode, [Validators.required, Validators.minLength(6)]),
      state: new FormControl(this.employeeObj.state, [Validators.required]) 
    });
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.reset();
  }

  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate() {
    const record = this.employeeList.find(m => m.empid === this.employeeForm.controls['empid'].value); // ✅ Fix case mismatch
    if (record !== undefined) {
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.reset();
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      const index = this.employeeList.findIndex(m => m.empid === id);
      this.employeeList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }
}
