import LinkedList from './LinkedList';

describe('LinkedList', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList(); // Create a new LinkedList instance before each test
  });

  // Test appending nodes
  test('Append nodes to the list', () => {
    list.append('A');
    list.append('B');
    list.append('C');

    expect(list.size).toBe(3);
    expect(list.head.key).toBe('A');
    expect(list.tail.key).toBe('C');
    expect(list.toString()).toBe('( A ) => ( B ) => ( C )');
  });

  // Test prepending nodes
  test('Prepend nodes to the list', () => {
    list.prepend('B');
    list.prepend('A');

    expect(list.size).toBe(2);
    expect(list.head.key).toBe('A');
    expect(list.tail.key).toBe('B');
    expect(list.toString()).toBe('( A ) => ( B )');
  });

  // Test popping nodes
  test('Remove the last node (pop)', () => {
    list.append('A');
    list.append('B');
    list.append('C');

    list.pop();

    expect(list.size).toBe(2);
    expect(list.tail.key).toBe('B');
    expect(list.toString()).toBe('( A ) => ( B )');
  });

  // Test finding a value
  test('Find the index of a node with a given value', () => {
    list.append('A');
    list.append('B');
    list.append('C');

    expect(list.find('B')).toBe(1);
    expect(list.find('C')).toBe(2);
    expect(list.find('D')).toBeNull(); // Non-existent value
  });

  // Test contains method
  test('Return true if the list contains a value', () => {
    list.append('A');
    list.append('B');
    list.append('C');

    expect(list.contains('B')).toBe(true);
    expect(list.contains('D')).toBe(false);
  });

  // Test inserting at a specific index
  test('Insert a node at a specific index', () => {
    list.append('A');
    list.append('C');
    list.insertAt(1, 'B');

    expect(list.size).toBe(3);
    expect(list.at(1).key).toBe('B');
    expect(list.toString()).toBe('( A ) => ( B ) => ( C )');
  });

  // Test removing at a specific index
  test('Remove a node at a specific index', () => {
    list.append('A');
    list.append('B');
    list.append('C');
    list.removeAt(1);

    expect(list.size).toBe(2);
    expect(list.at(1).key).toBe('C');
    expect(list.toString()).toBe('( A ) => ( C )');
  });

  // Test edge case: removing from an empty list
  test('Handle removing from an empty list', () => {
    list.pop();
    list.removeAt(0);

    expect(list.size).toBe(0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.toString()).toBe('');
  });
});
