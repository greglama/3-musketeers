'use strict';

const convert = require('..');
const Big = require('big.js');

describe('convert', () => {

  test('should default to returning a Number', () => {
    expect(convert(2, 'BTC', 'BTC')).toEqual(Number(2))
  });

  test('should return a Number', () => {
    expect(convert(2, 'BTC', 'BTC', 'Number')).toEqual(Number(2));
  });

  test('should return a Big number', () => {
    expect(convert(2, 'BTC', 'BTC', 'Big')).toEqual(Big(2));
  });

  test('should return a String', () => {
    expect(convert(2, 'mBTC', 'BTC', 'String')).toEqual(String(0.002));
  });

  test('should convert an integer', () => {
    expect(convert(123456789012345, 'Satoshi', 'BTC', 'Number')).toBeCloseTo(1234567.89012345);
  });

  test('should convert a number', () => {
    expect(convert(1234567.89012345, 'BTC', 'Satoshi', 'Number')).toBe(123456789012345);
  });

  test('should convert a string', () => {
    expect(convert('2', 'BTC', 'BTC', 'Number')).toBe(2);
  });

  test('should convert a Big number', () => {
    expect(convert(new Big(2), 'BTC', 'BTC', 'Number')).toEqual(Number(2));
  });

  test('should convert a NaN to a Number', () => {
    expect(convert(NaN, 'BTC', 'BTC', 'Number')).toEqual(NaN);
    expect(convert(NaN, 'BTC', 'mBTC', 'Number')).toEqual(NaN);
  });

  test('should convert a NaN to a String', () => {
    expect(convert(NaN, 'BTC', 'BTC', 'String')).toEqual("NaN");
    expect(convert(NaN, 'BTC', 'mBTC', 'String')).toEqual("NaN");
  });

  test('should not convert a NaN to a Big and throw a Big Error', () => {
    expect(() => convert(NaN, 'BTC', 'BTC', 'Big')).toThrow();
  });

  test('should handle rounding errors', () => {
    expect(convert(4.6, 'Satoshi', 'BTC', 'Number')).toEqual(4.6e-8);
    expect(convert(0.000000046, 'BTC', 'Satoshi', 'Number')).toBeCloseTo(4.6);
  });

  test('should throw when untest is undefined', () => {
    expect(() => convert(new Big(2), 'x', 'BTC', 'Number')).toThrow();
    expect(() => convert(new Big(2), 'BTC', 'x', 'Number')).toThrow();
    expect(() => convert(NaN, 'x', 'BTC', 'Number')).toThrow();
    expect(() => convert(NaN, 'BTC', 'x', 'Number')).toThrow();
  });

  test('should throw when representaion is undefined', () => {
    expect(() => convert(2, 'BTC', 'mBTC', 'x')).toThrow();
    expect(() => convert(NaN, 'BTC', 'mBTC', 'x')).toThrow();
  });

  test('should allow untest aliases', () => {
    expect(convert(4.6, 'Satoshi', 'sat')).toEqual(4.6);
    expect(() => convert(4.6, 'μBTC', 'btest', 'x')).toThrow();
  });
});

describe('addUnit', () => {

  test('should add a new unit', () =>{
    convert.addUnit("piBTC", 3.1415926535);
    expect(convert.units()).toContain("piBTC");
  });

  test('should not allow to add an existing Unit', () => {
    expect(() => {convert.addUnit('mBTC', 0.1)}).toThrow();
  });
});

describe('removeUnit', () => {

  test('should remove a Unit',() =>{
    convert.removeUnit("piBTC");
    expect(convert.units()).not.toContain("piBTC");
  });

  test('should not allow to remove an existing Unit', () => {
    expect(() => {convert.removeUnit('mBTC')}).toThrow();
  });
});

  /*---------------------pieter's code-----------------------
  it('should not allow adding existing Units', () => {
    expect(() => {convert.addUnit('Satoshi', 0.1)}).toThrow()});
    
  it('should not allow removing existing Units', () => {
    expect(() => {convert.removeUnit('Satoshi')}).toThrow()});
------------------------------------------------------------------------*/