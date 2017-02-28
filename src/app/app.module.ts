import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {LabeledInputComponent} from "./labeled-input.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        LabeledInputComponent,
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }