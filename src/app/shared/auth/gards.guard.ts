import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const gardsGuard: CanActivateFn = (route, state) => {
  let _Routrer = inject(Router)
  if(localStorage.getItem('eToken') != null){
    return true;
  }
  else {
    _Routrer.navigate(['/login']);
    return false;
  }
  
};
