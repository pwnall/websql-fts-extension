noop = () => {};
logError = (error) => {
  document.querySelector('#status').textContent = "FTS error: " + error.message;
};

const database = openDatabase(
    'Fts3CrashTest', '1.0', 'Database for FTS3 crash test', 1024 * 1024);

database.transaction(transaction => {
  transaction.executeSql(
      'DROP TABLE IF EXISTS main;', [], noop, logError);
  transaction.executeSql(
      'CREATE VIRTUAL TABLE main USING FTS3(fts3table);', [], () => {
        document.querySelector('#status').textContent = 'FTS available';
      }, logError);
});
