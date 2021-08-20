import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gesture'
})
export class GesturePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'beg':
      return 'Mendigar';
      break;
      case 'big_v':
      return '';
      break;
      case 'double_finger_up':
      return 'Dos dedos arriba';
      break;
      case 'fist':
      return 'Puño';
      break;
      case 'hand_open':
      return 'Mano abierta';
      break;
      case 'heart_a':
      return 'Corazón';
      break;
      case 'heart_b':
      return 'Corazón';
      break;
      case 'heart_c':
      return 'Corazón';
      break;
      case 'heart_d':
      return 'Corazón';
      break;
      case 'index_finger_up':
      return 'Dedo indice arriba';
      break;
      case 'namaste':
      return 'Agradecido';
      break;
      case 'ok':
      return 'Ok';
      break;
      case 'palm_up':
      return 'Palma levantada';
      break;
      case 'phonecall':
      return 'Llámame';
      break;
      case 'rock':
      return 'Roca';
      break;
      case 'thanks':
      return 'Gracias';
      break;
      case 'thumb_down':
      return 'Pulgar abajo';
      break;
      case 'thumb_up':
      return 'Pulgar arriba';
      break;
      case 'unknown':
      return 'Desconocido';
      break;
      case 'victory':
      return 'Victoria';
      break;
    }
  }

}
