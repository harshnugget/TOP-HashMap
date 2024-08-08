import HashMap from './HashMap.js';

describe('HashMap', () => {
  let myMap;

  beforeEach(() => {
    // Initialize a new HashMap instance before each test
    myMap = new HashMap();

    // Add some initial key-value pairs to the map
    myMap.set('apple', 'red');
    myMap.set('banana', 'yellow');
    myMap.set('carrot', 'orange');
    myMap.set('dog', 'brown');
    myMap.set('elephant', 'gray');
    myMap.set('frog', 'green');
    myMap.set('grape', 'purple');
    myMap.set('hat', 'black');
    myMap.set('ice cream', 'white');
    myMap.set('jacket', 'blue');
    myMap.set('kite', 'pink');
    myMap.set('lion', 'golden');
  });

  describe('Hash Function', () => {
    test('Hash code is within bucket length range', () => {
      const hashCode = myMap.hash('Hello World');

      expect(typeof hashCode).toBe('number');
      expect(hashCode).toBeGreaterThanOrEqual(0);
      expect(hashCode).toBeLessThan(myMap.buckets.length);
    });
  });

  describe('Basic Operations', () => {
    test('Set and retrieve a key-value pair', () => {
      myMap.set('Hello', 'Hello World!');
      expect(myMap.get('Hello')).toBe('Hello World!');

      // Test overwriting the value
      myMap.set('Hello', 'Hello Everyone!');
      expect(myMap.get('Hello')).toBe('Hello Everyone!');
    });

    test('Check if a key exists', () => {
      myMap.set('A');
      expect(myMap.has('A')).toBe(true);
      expect(myMap.has('B')).toBe(false);
    });

    test('Remove a key', () => {
      expect(myMap.remove('apple')).toBe(true);
      expect(myMap.has('apple')).toBe(false);
    });

    test('Clear all entries', () => {
      myMap.clear();
      expect(myMap.length()).toEqual(0);
    });

    test('Check number of keys', () => {
      myMap.clear();
      expect(myMap.length()).toEqual(0);

      myMap.set('A', null);
      myMap.set('B', null);
      expect(myMap.length()).toEqual(2);
    });
  });

  describe('Bucket/Linked List Operations', () => {
    beforeEach(() => {
      myMap.clear();
      myMap.set('A', 'Value for A');
      myMap.set('B', 'Value for B');
      myMap.set('C', 'Value for C');
    });

    test('Get array of all keys', () => {
      expect(myMap.keys()).toEqual(['A', 'B', 'C']);
    });

    test('Get array of all values', () => {
      myMap.set('D', 'Value for D');
      expect(myMap.values()).toEqual(['Value for A', 'Value for B', 'Value for C', 'Value for D']);
    });

    test('Get array of all key/value pairs', () => {
      myMap.set('D', 'Value for D');
      expect(myMap.entries()).toEqual([
        { key: 'A', value: 'Value for A' },
        { key: 'B', value: 'Value for B' },
        { key: 'C', value: 'Value for C' },
        { key: 'D', value: 'Value for D' },
      ]);
    });
  });

  describe('Resizing', () => {
    test('Expand buckets', () => {
      const currentBucketLength = myMap.buckets.length;
      myMap.expand();
      expect(myMap.buckets.length).toEqual(currentBucketLength * 2);
    });

    test('Exceed load factor and resize', () => {
      const initialBucketLength = myMap.buckets.length;

      // Insert enough elements to exceed the load factor
      for (let i = 0; i < initialBucketLength * myMap.loadFactor; i++) {
        myMap.set(`${i}`, null);
      }

      // Verify the bucket length has increased
      expect(myMap.buckets.length).toBeGreaterThan(initialBucketLength);
    });
  });
});
