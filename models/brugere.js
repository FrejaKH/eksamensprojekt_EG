
const pool = require("./db.js");

module.exports = {
   // update a brugere with on/off help.
   async updatehjaelp(req, res) {
    let boolean;
    try {
      if(req.body.harduhusket_aktiv){
        boolean = 0;
  
      }else{
        boolean = 1;
      }
      const brugere = req.user.kundenummer;
      let sql = `update brugere SET hjaelp= ? WHERE kundenummer = ?`;
      let bool = [boolean,brugere,];
      await pool.query(sql, bool);
      return boolean;
    } catch (e) {
      console.error(e.message);
    }
  },
}