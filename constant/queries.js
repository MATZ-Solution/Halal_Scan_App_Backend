exports.selectQuery = (table, ...field) => {
    if (field.length === 1) {
      return `SELECT * FROM ${table} WHERE ${field[0]} = ?`;
    } 
    else if (field.length > 1) {
      return `SELECT * FROM ${table} WHERE ${field[0]} = ? and ${field[1]} = ?`;
    } else {
      return `SELECT * FROM ${table}`;
    }
  };


  exports.insertSignUpQuery = "INSERT INTO register(name,email,password,address,currentdate) VALUES (?,?,?,?,?)";

  exports.insertMessgeQuery = "INSERT INTO messages (fromId, toId, message,role) VALUES (?, ?, ?,?)";