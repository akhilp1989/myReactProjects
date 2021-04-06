const functions=require('./functions')

test('Add 2 and 2 to be 4', () => {
    expect(functions.add(2, 2)).toBe(4)
});

test('Add 2 and 2 Not to be 4', () => {
    expect(functions.add(2, 2)).not.toBe(5)
});

test('Should create USer', () => {
    expect(functions.createUser()).toStrictEqual    ({firstName:'A',lastName:'B'})
});