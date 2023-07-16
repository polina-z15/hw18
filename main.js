class User {
  constructor(firstName, lastName, birthYear) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get age() {
    const currentYear = new Date().getFullYear();
    return currentYear - this._birthYear;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}

class Student extends User {
  constructor(firstName, lastName, birthYear) {
    super(firstName, lastName, birthYear);
    this._grades = new Array(30).fill(null);
    this._attendance = new Array(30).fill(null);
  }

  present() {
    const index = this._attendance.indexOf(null);
    if (index !== -1) {
      this._attendance[index] = true;
    }
  }

  absent() {
    const index = this._attendance.indexOf(null);
    if (index !== -1) {
      this._attendance[index] = false;
    }
  }

  setMark(mark) {
    const index = this._grades.indexOf(null);
    if (index !== -1) {
      this._grades[index] = mark;
    }
  }

  get mediumMark() {
    const filteredGrades = this._grades.filter((grade) => grade !== null);
    if (filteredGrades.length === 0) {
      return null;
    }
    const sum = filteredGrades.reduce((acc, grade) => acc + grade, 0);
    return sum / filteredGrades.length;
  }

  get mediumVisit() {
    const filteredAttendance = this._attendance.filter(
      (attendance) => attendance !== null
    );
    if (filteredAttendance.length === 0) {
      return null;
    }
    const presentCount = filteredAttendance.filter(
      (attendance) => attendance
    ).length;
    return presentCount / filteredAttendance.length;
  }

  get summary() {
    const mediumMark = this.mediumMark;
    const mediumVisit = this.mediumVisit;

    if (mediumMark > 9 && mediumVisit > 0.9) {
      return `Середня оцінка: ${mediumMark.toFixed(
        2
      )}. Середнє відвідування: ${mediumVisit.toFixed(
        2
      )}. Молодець! Так тримати!`;
    } else if (mediumMark > 9 || mediumVisit > 0.9) {
      return `Середня оцінка: ${mediumMark.toFixed(
        2
      )}. Середнє відвідування: ${mediumVisit.toFixed(
        2
      )}. Норм. Але можна постаратись і краще.`;
    } else {
      return `Середня оцінка: ${mediumMark.toFixed(
        2
      )}. Середнє відвідування: ${mediumVisit.toFixed(
        2
      )}. Погано! Так ти нічому не навчишся.`;
    }
  }
}

class Teacher extends User {
  constructor(firstName, lastName, birthYear) {
    super(firstName, lastName, birthYear);
    this._groups = [];
  }

  get groups() {
    return this._groups;
  }

  addGroup(group) {
    this._groups.push(group);
  }

  changeStatus(group) {
    const foundGroup = this._groups.find((g) => g.name === group.name);
    if (foundGroup) {
      foundGroup.active = !foundGroup.active;
    }
  }

  get activeGroups() {
    return this._groups.filter((group) => group.active);
  }
}

const student = new Student("Amelia", "Davis", 1998);
student.setMark(11);
student.setMark(12);
student.present();
student.present();
student.absent();

console.log(student.mediumMark);
console.log(student.mediumVisit);
console.log(student.summary);

const teacher = new Teacher("Jessica", "Jackson", 2003);
teacher.addGroup({ name: "Math", active: true });
teacher.addGroup({ name: "English", active: false });
teacher.changeStatus({ name: "Math", active: true });

console.log(teacher.groups);
console.log(teacher.activeGroups);
