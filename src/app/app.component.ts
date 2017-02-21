import {Component} from "@angular/core";
declare let Materialize: Materialize.Materialize;

export class File {
    name: string;
    path: string;
    size: number;
    type: string;
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    files: File[] = [];

    ngAfterViewInit() {
        Materialize.updateTextFields();
    }

    preventDefault() {
        return false;
    }

    onDropFiles(e: DragEvent) {
        console.log(e);

        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let f = e.dataTransfer.files[i];
            console.log(f);
            this.files.push({
                name: f.name,
                path: f.path,
                size: f.size,
                type: f.type
            });
        }
        this.files.sort((f1, f2) => f1.name.localeCompare(f2.name));

        console.log(this.files);

        return false;
    }

    clearFiles() {
        this.files = [];
    }
}