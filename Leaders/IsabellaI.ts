import Leader from '@civ-clone/core-civilization/Leader';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Spanish from '../Spanish';

export class IsabellaI extends Leader {
  static civilization(): typeof Civilization {
    return Spanish;
  }

  name(): string {
    return 'Isabella I';
  }
}

export default IsabellaI;
