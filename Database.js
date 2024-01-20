// Database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
          [],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      null,
      null
    );
  });
};

const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM items',
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      null,
      null
    );
  });
};

const addItem = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO items (name) VALUES (?)',
          [name],
          (_, { insertId }) => {
            resolve(insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      null,
      null
    );
  });
};

const updateItem = (id, newName) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'UPDATE items SET name = ? WHERE id = ?',
          [newName, id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Item not found'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      null,
      null
    );
  });
};

const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM items WHERE id = ?',
          [id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Item not found'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      null,
      null
    );
  });
};

export { initDatabase, getAllItems, addItem, updateItem, deleteItem };
