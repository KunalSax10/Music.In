import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MatsnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  open(message: string, action: string) {
      if (action === 'error') {
          this.snackbar.open(message, '', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['black-snackbar'] 
          });
      } else {
          this.snackbar.open(message, '', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['green-snackbar'] 
          });
      }
  }
}




