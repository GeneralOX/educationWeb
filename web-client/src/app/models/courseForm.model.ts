import { FormGroup } from "@angular/forms";

export default class courseFormModel {
    public id: string | undefined;
    public courseForm: FormGroup | undefined;

    constructor(id: any, courseFrom: any) {
        this.id = id;
        this.courseForm = courseFrom;
    }
}