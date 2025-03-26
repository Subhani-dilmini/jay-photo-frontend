import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-package',
  imports: [RouterModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.scss'
})
export class AddPackageComponent {

  addItemField(): void {
    const container = document.getElementById("items-container") as HTMLElement;
    
    // Create a div wrapper for new item
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("d-flex", "mb-2", "align-items-center");

    // Create input field
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("form-control", "me-2");
    input.placeholder = "Enter item";

    // Create "+" button
    const addButton = document.createElement("button");
    addButton.innerHTML = "+";
    addButton.classList.add("btn", "btn-success", "btn-sm");
    
    // Explicitly define the event handler
    addButton.addEventListener("click", this.addItemField);

    // Append elements to div
    itemDiv.appendChild(input);
    itemDiv.appendChild(addButton);

    // Append div to container
    container.appendChild(itemDiv);
}

}
