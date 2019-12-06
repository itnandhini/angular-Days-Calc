import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  testArray = [];
  stopEvent = true;
  userForm: FormGroup;
  dayForm: FormGroup;
  fields: any;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.fields = {
      isRequired: true,
      type: {
        options: [
          {
            label: "Option 1",
            value: "1"
          },
          {
            label: "Option 2",
            value: "2"
          }
        ]
      }
    };
    this.dayForm = this.fb.group({
      type: this.fb.group({
        days: this.fb.array([])
      })
    });
    this.dayPatch();
    this.userForm = this.fb.group({
      type: this.fb.group({
        options: this.fb.array([])
      })
    });
    this.patch();
  }
  dayPatch() {
    const control = <FormArray>this.dayForm.get("type.days");
    console.log(control);
  }
  patch() {
    const control = <FormArray>this.userForm.get("type.options");
    this.fields.type.options.forEach(x => {
      control.push(this.patchValues(x.label, x.value));
    });
  }

  patchValues(label, value) {
    return this.fb.group({
      label: [label],
      value: [value]
    });
  }

  users: Array<any> = [
    {
      id: 1,
      ffid: 0,
      name: "Sunday",
      active: false
    },
    {
      id: 2,
      name: "Monday",
      active: false
    },
    {
      id: 3,
      name: "Tuesday",
      active: false
    },
    {
      id: 4,
      name: "Wednesday",
      active: false
    },
    {
      id: 5,
      name: "Thusday",
      active: false
    },
    {
      id: 6,
      name: "Friday",
      active: false
    },
    {
      id: 7,
      name: "Saturday",
      active: false
    }
  ];
  clickMe(value) {
    console.log(value);
    this.testArray = [];
    switch (value) {
      case "All":
        console.log("All");
        this.testArray = [1, 2, 3, 4, 5, 6, 7];
        for (var i = 0; i < this.testArray.length; i++) {
          this.users.forEach(x => {
            if (x.id === this.testArray[i]) {
              this.users[i].active = true;
              console.log(this.users[i].active);
            } else {
              console.log("not workinf");
            }
          });
        }
        // this.testArray = [];
        this.stopEvent = true;
        break;
      case "Five":
        this.testArray = [2, 3, 4, 5, 6];

        this.users.forEach(x => {
          for (var i = 0; i < this.testArray.length; i++) {
            if (x.id === this.testArray[i]) {
              this.users[i].active = true;
              console.log(this.users[i].active);
            } else {
              console.log("not workinf");
            }
          }
        });
        console.log("five");
        this.stopEvent = true;
        break;
      case "Two":
        this.testArray = [1, 7];

        console.log("two");
        this.stopEvent = true;
        break;
      case "Any":
        console.log("any");
        this.stopEvent = !this.stopEvent;
        break;
    }
  }

  click(user, id) {
    if (this.testArray.indexOf(user.name) !== -1) {
      var index = this.testArray.indexOf(user.name);
      this.testArray.splice(index, 1);
      alert(this.testArray);
    } else {
      this.testArray.push(user.name);
      alert(this.testArray);
    }
    user.active = !user.active;
    // your code here....
  }
}
