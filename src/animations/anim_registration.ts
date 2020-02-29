import { trigger, state, style, animate, transition } from '@angular/animations';

export function flyInOut(){
  return trigger('flyInOut', [
    state('*', style({ opacity: 1, transform: 'translateX(0)'})),
    transition(':enter', [
        style({ transform: 'translateX(-3rem)', opacity: 0 }),
        animate('0.5s ease-in')
    ])
  ]);
}

export function fadeIn(){
  return trigger('fadeIn', [
    state('*', style({ opacity: 1 })),
    transition(':enter', [
        style({ opacity: 0 }),
        animate('0.25s ease-in')
    ])
  ]);
}

export function fadeOut(){
  return trigger('fadeOut', [
    /*state('*', style({ opacity: 1 })),
    transition(':leave', [
      animate('0.5s ease-in-out', style({ opacity: 0, left: '30px' }))
    ])*/
    state('leave', style({ opacity: 0, left: '30px' })),
    transition('* => leave', animate('0.25s ease-in-out'))
  ]);
}
