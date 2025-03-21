import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IchildDepartment, IparentDepartment } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  parentDeptList: IparentDepartment[] = [];
  childDeptList: IchildDepartment[]= [];
  deptId: number=0;

  EmployeeObj: Employee = new Employee();
  EmployeeList: Employee[]=[];

  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);

  isSidePanel = signal<boolean>(false);
  employeeForm: any;

  ngOnInit(): void {
    this.getParentDeptList();
    this.showEmployeeList();
  }
  openSidePanel(employee?: Employee) {
    this.isSidePanel.set(true);
    if(!employee){
      this.employeeForm.reset({
        employeeId: 0, 
        employeeName: '', 
        contactNo: '', 
        emailId: '', 
        password: '', 
        deptId: 0, 
        role: 'Employee', 
        gender: '', 
      });
    }else {
        // For editing an existing employee we have to  patch the form with aleady provided data
        this.employeeForm.patchValue(employee);
      }
    }

  closeSidePanel() {
    this.isSidePanel.set(false);
    this.employeeForm.reset({ employeeId: 0 });
  }

  editEmployee(Obj: any){
    this.EmployeeObj = Obj;
  }

  getParentDeptList(){
    this.masterService.getParentDept().subscribe((res: IApiResponse) => {
      this.parentDeptList = res.data;
    })
  }

  onDeptChange(){
    this.masterService.getChildDeptById(this.deptId).subscribe((res: IApiResponse) => {
      this.childDeptList = res.data;
    })
  }

  onSubmit(){
    this.employeeService.createNewEmployee(this.EmployeeObj).subscribe((res: Employee) => {
      this.closeSidePanel();
        alert("Employee Created Successfully");
        this.showEmployeeList();
    },error => {
      alert("Something went wrong");
    })
  }
  
  showEmployeeList(){
    this.employeeService.getAllEmployees().subscribe((res: Employee[]) => {
      this.EmployeeList=res;
      console.log(this.EmployeeList);
    })
  }

  deleteEmployee(id: number){
    if(!confirm("Are you sure you want to delete this employee?")){
      return;
    }
    this.employeeService.deleteEmployeeById(id).subscribe((res: Employee) => {
      alert("Employee Deleted Successfully");
      this.showEmployeeList();
    });
  }

  onEdit(){
    this.employeeService.updateEmployee(this.EmployeeObj).subscribe((res: Employee) => {
      alert("Employee Updated Successfully");
      this.closeSidePanel();
      this.showEmployeeList();
  },error => {
    alert("Something went wrong, Try again");
  })
  }
}
