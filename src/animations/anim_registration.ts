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
        animate('0.5s ease-in')
    ])
  ]);
}

export function fadeOut(){
  return trigger('fadeOut', [
    state('*', style({ opacity: 0 })),
    transition(':enter', [
        style({ opacity: 1 }),
        animate('0.5s ease-in')
    ])
  ]);
}
