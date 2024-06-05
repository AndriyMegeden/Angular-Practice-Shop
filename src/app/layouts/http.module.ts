import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

@NgModule({
  exports: [HttpClientModule],
  imports: [HttpClientModule],
  
})
export class SharedModule {}
