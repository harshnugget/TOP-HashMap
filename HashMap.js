import LinkedList from './LinkedList.js';

class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.loadFactor = 0.75;
  }

  // Take a key and produce a hash code with it
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  createBucket(key, value) {
    const bucket = new LinkedList();

    // Sets the node/entries value to be an object containing the specified key and value
    bucket.append(key, value);

    return bucket;
  }

  // Scan the bucket until it finds an entry with the given key
  scanForEntry(bucket, key) {
    if (bucket === null) return null;

    return this.traverseBucket(bucket, (node) => {
      if (node.key === key) {
        return node;
      }
    });
  }

  expand() {
    // Save key/value pairs in a temporary array
    const entries = this.entries();
    const bucketsAmount = this.buckets.length;

    // Clear and expand buckets
    this.buckets = new Array(bucketsAmount * 2).fill(null);

    entries.forEach((entry) => {
      this.set(entry.key, entry.value);
    });
  }

  // Take a key/value pair and add to a bucket
  set(key, value) {
    if (!key) {
      throw Error(`No key provided! Key: ${key}`);
    }

    // If load factor is reached, expand amount of buckets
    if (this.length() >= this.buckets.length * this.loadFactor) {
      this.expand();
    }

    const hashCode = this.hash(key);

    // If bucket is empty, create a linked list with key/value pair
    if (this.buckets[hashCode] === null) {
      this.buckets[hashCode] = this.createBucket(key, value);
      return;
    }

    // Check if entry exists
    const entry = this.scanForEntry(this.buckets[hashCode], key);

    // If the entry already exists, update/overwrite the value
    if (entry) {
      entry.value = value;
      return;
    }

    // If entry does not exist, add it to the linked list
    this.buckets[hashCode].append(key, value);
  }

  // Retrieve value of key
  get(key) {
    if (!key) {
      throw Error(`No key provided! Key: ${key}`);
    }

    const hashCode = this.hash(key);

    // Scan the bucket/linked list for the key
    const entry = this.scanForEntry(this.buckets[hashCode], key);

    // If the key exists, update the value
    if (entry) {
      return entry.value;
    }

    // If an entry is not found, return null.
    return null;
  }

  // Check if key exists
  has(key) {
    const keyFound = this.buckets.some((bucket) => {
      if (bucket) {
        return bucket.contains(key);
      }
    });

    // Returns true or false
    return keyFound;
  }

  // Remove key from bucket
  remove(key) {
    let index;

    //  If the given key is in the hash map, it should remove the entry with that key and return true.
    const keyRemoved = this.buckets.some((bucket) => {
      if (bucket) {
        index = bucket.find(key);
      }

      if (index || index === 0) {
        return bucket.removeAt(index);
      }
    });

    // Returns true or false
    return keyRemoved;
  }

  // Return the number of stored keys in the hash map
  length() {
    let length = 0;

    // Traverse each bucket (linked list), increasing length by 1 for every key
    this.buckets.forEach((bucket) => {
      this.traverseBucket(bucket, () => length++);
    });

    return length;
  }

  // Remove all entries in hash map
  clear() {
    this.buckets.forEach((entry, index) => {
      if (entry) {
        this.buckets[index] = null;
      }
    });
  }

  // Return an array of all keys in hash map
  keys() {
    const array = [];

    this.buckets.forEach((bucket) => {
      this.traverseBucket(bucket, (node) => {
        array.push(node.key);
      });
    });

    return array;
  }

  // Return an array of all values in hash map
  values() {
    const array = [];

    this.buckets.forEach((bucket) => {
      this.traverseBucket(bucket, (node) => {
        array.push(node.value);
      });
    });

    return array;
  }

  // Return an array that contains each key/value pair
  entries() {
    const array = [];

    this.buckets.forEach((bucket) => {
      this.traverseBucket(bucket, (node) => {
        const { key, value } = node;
        array.push({ key, value });
      });
    });

    return array;
  }

  // Method for traversing a bucket's linked list
  traverseBucket(bucket, callback) {
    if (bucket === null || !callback) return false;

    // Use the traverse method on each bucket (linked list)
    return bucket.traverse(callback);
  }
}

export default HashMap;
