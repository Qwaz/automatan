import {NgModule} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";

@NgModule({
    imports:      [ BrowserModule, MaterialModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }