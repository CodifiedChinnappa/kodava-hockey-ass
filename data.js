const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

export const venueOptions = [
  createOption("GROUND1"),
  createOption("GROUND2"),
  createOption("GROUND3"),
  createOption("GROUND4"),
];

export const roundOptions = [
  createOption("DAY1"),
  createOption("DAY1"),
  createOption("DAY1"),
  createOption("PREQUARTER"),
];

export const poolOptions = [
  createOption("A"),
  createOption("B"),
  createOption("C"),
  createOption("D"),
];

export const familyOptions = [
  createOption("6602c0e1a7aa3daf6fecfa00"),
  createOption("6603a0fc49c9763e3b06f083"),
  createOption("6603a10b49c9763e3b06f084"),
];
