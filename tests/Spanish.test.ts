import { IsabellaI, PhilipII } from '../Leaders';
import Spanish from '../Spanish';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Leader from '@civ-clone/core-civilization/Leader';
import attributes from '../attributes';
import cityNames from '../cityNames';
import { existsSync, readFileSync } from 'fs';
import { execFileSync } from 'child_process';
import { expect } from 'chai';
import { join } from 'path';
import { typeNameOf } from '@civ-clone/core-data-object/DataObject';

describe('Spanish', (): void => {
  it('should extend Civilization directly', (): void => {
    expect(Object.getPrototypeOf(Spanish)).to.equal(Civilization);
  });

  it('should be saved by its own name', (): void => {
    expect(typeNameOf(Spanish)).to.equal('Spanish');
  });

  it('has its leaders', (): void => {
    (
      [
        [IsabellaI, 'Isabella I'],
        [PhilipII, 'Philip II'],
      ] as [typeof Leader, string][]
    ).forEach(([LeaderType, name]): void => {
      expect(Object.getPrototypeOf(LeaderType)).to.equal(Leader);
      expect(LeaderType.civilization()).to.equal(Spanish);
      expect(new LeaderType().name()).to.equal(name);
    });
  });

  it('has its people, nation and colours', (): void => {
    expect(attributes.people).to.equal('Spanish');
    expect(attributes.nation).to.equal('Spain');
    expect(attributes.colors).to.eql(['#AA151B', '#F1BF00']);
    attributes.colors.forEach((colour: string): void => {
      expect(colour).to.match(/^#[0-9A-F]{6}$/);
    });
  });

  it('has city names, all different, with its capital first', (): void => {
    expect(cityNames.length).to.be.at.least(20);
    expect(new Set(cityNames).size).to.equal(cityNames.length);
    expect(cityNames[0]).to.equal('Madrid');
  });

  it('should be a library that registers nothing', (): void => {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8')
    );

    ['main', 'module', 'exports', 'bin'].forEach((field: string): void => {
      expect(packageJson).not.to.have.property(field);
    });
    expect(existsSync(join(process.cwd(), 'index.ts'))).to.be.false;
    expect(existsSync(join(process.cwd(), 'index.js'))).to.be.false;

    // Every module the package ships, compiled, as a plugin loader would load it, in a fresh process: the test runner
    //  may load the TypeScript source instead, and a registry that skips what it holds can't show a second
    //  registration.
    const counts = execFileSync(
      process.execPath,
      [
        '-e',
        [
          "const rules = require('@civ-clone/core-rule/RuleRegistry').instance;",
          "const civilizations = require('@civ-clone/core-civilization/CivilizationRegistry').instance;",
          "const leaders = require('@civ-clone/core-civilization/LeaderRegistry').instance;",
          "const attributes = require('@civ-clone/core-civilization/AttributeRegistry').instance;",
          "const cityNames = require('@civ-clone/core-civilization/CityNameRegistry').instance;",
          "const traits = require('@civ-clone/core-civilization/TraitRegistry').instance;",
          "require('./Spanish.js');",
          "require('./Leaders.js');",
          "require('./Leaders/IsabellaI.js');",
          "require('./Leaders/PhilipII.js');",
          "require('./attributes.js');",
          "require('./cityNames.js');",
          'console.log(JSON.stringify([rules.entries().length, civilizations.entries().length, leaders.entries().length, attributes.entries().length, cityNames.entries().length, traits.entries().length]));',
        ].join(' '),
      ],
      { cwd: process.cwd(), encoding: 'utf8' }
    );

    expect(JSON.parse(counts)).to.deep.equal([0, 0, 0, 0, 0, 0]);
  });

  it('should ship its TypeScript beside the compiled modules', (): void => {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8')
    );

    expect(packageJson.files).to.deep.equal([
      'Spanish.js',
      'Spanish.d.ts',
      'Spanish.js.map',
      'Spanish.ts',
      'Leaders.js',
      'Leaders.d.ts',
      'Leaders.js.map',
      'Leaders.ts',
      'Leaders/IsabellaI.js',
      'Leaders/IsabellaI.d.ts',
      'Leaders/IsabellaI.js.map',
      'Leaders/IsabellaI.ts',
      'Leaders/PhilipII.js',
      'Leaders/PhilipII.d.ts',
      'Leaders/PhilipII.js.map',
      'Leaders/PhilipII.ts',
      'attributes.js',
      'attributes.d.ts',
      'attributes.js.map',
      'attributes.ts',
      'cityNames.js',
      'cityNames.d.ts',
      'cityNames.js.map',
      'cityNames.ts',
    ]);
    (packageJson.files as string[]).forEach((file: string): void => {
      expect(existsSync(join(process.cwd(), file)), file).to.be.true;
    });
  });
});
