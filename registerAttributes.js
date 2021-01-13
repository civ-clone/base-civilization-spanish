"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Spanish_1 = require("./Spanish");
const Attribute_1 = require("@civ-clone/core-civilization/Attribute");
const AttributeRegistry_1 = require("@civ-clone/core-civilization/AttributeRegistry");
Object.entries({
    people: 'Spanish',
    nation: 'Spain',
    colors: ['#fff', '#ccc', '#000'],
}).forEach(([name, value]) => AttributeRegistry_1.instance.register(new Attribute_1.default(Spanish_1.default, name, value)));
//# sourceMappingURL=registerAttributes.js.map