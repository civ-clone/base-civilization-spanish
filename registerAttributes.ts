import Spanish from './Spanish';
import Attribute from '@civ-clone/core-civilization/Attribute';
import { instance as attributeRegistryInstance } from '@civ-clone/core-civilization/AttributeRegistry';

Object.entries({
  people: 'Spanish',
  nation: 'Spain',
  colors: ['#fff', '#ccc', '#000'],
}).forEach(([name, value]: [string, any]): void =>
  attributeRegistryInstance.register(new Attribute(Spanish, name, value))
);
